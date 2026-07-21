import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


export const startCamera = async (faceLandmarkerRef, videoRef, setEmotion) => {
    try {
        const vision =
            await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
            );

        faceLandmarkerRef.current =
            await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    runningMode: "VIDEO",
                    outputFaceBlendshapes: true,
                    numFaces: 1,
                }
            );

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
            });

        videoRef.current.srcObject = stream;

        await videoRef.current.play();
    } catch (error) {
        console.error(error);
        setEmotion("❌ Camera Access Denied");
    }
};

export const detectExpression = (faceLandmarkerRef, videoRef, setEmotion) => {
    if (
        !faceLandmarkerRef.current ||
        !videoRef.current
    ) {
        return;
    }

    const result =
        faceLandmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
        );

    const blendshapes =
        result.faceBlendshapes?.[0]?.categories;

    if (!blendshapes) {
        setEmotion("❌ No Face Detected");
        return;
    }

    const scores = {};

    blendshapes.forEach((item) => {
        scores[item.categoryName] = item.score;
    });

    let currentMood;

    // Happy
    if (
        scores.mouthSmileLeft > 0.45 &&
        scores.mouthSmileRight > 0.5
    ) {
        currentMood = "happy";
    }

    // Surprise
    else if (
        scores.jawOpen > 0.3 &&
        scores.browInnerUp > 0.3
    ) {
        currentMood = "surprised";
    }
    // Sad
    else if (
        scores.browDownLeft > 0.1 &&
        scores.browDownRight > 0.1 &&
        scores.eyeBlinkLeft > 0.3 &&
        scores.eyeBlinkRight > 0.3 
    ) {
        currentMood = "sad";
    } else {
        currentMood = "neutral";
    }

    setEmotion(currentMood);
    return currentMood;
};
