import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


export const startCamera = async (faceLandmarkerRef, videoRef,setEmotion) => {
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

    console.log(scores)

    // Happy
    if (
        scores.mouthSmileLeft > 0.5 &&
        scores.mouthSmileRight > 0.5
    ) {
        setEmotion("😀 Happy");
    }

    // Surprise
    else if (
        scores.jawOpen > 0.3 &&
        scores.browInnerUp > 0.35
    ) {
        setEmotion("😮 Surprised");
    }

    // Angry
    else if (
        scores.browDownLeft > 0.1 &&
        scores.browDownRight > 0.1
    ) {
        setEmotion("😠 Angry");
    }

    // Sad
    else if (
        scores.browDownLeft > 0.25 &&
        scores.browDownRight > 0.25
    ) {
        setEmotion("😔 Sad");
    }

    // Fear
    else if (
        scores.eyeWideLeft > 0.5 &&
        scores.eyeWideRight > 0.5 &&
        scores.jawOpen > 0.4
    ) {
        setEmotion("😨 Fear");
    }

    // Left Wink
    else if (
        scores.eyeBlinkLeft > 0.8 &&
        scores.eyeBlinkRight < 0.3
    ) {
        setEmotion("😉 Left Wink");
    }

    // Right Wink
    else if (
        scores.eyeBlinkRight > 0.8 &&
        scores.eyeBlinkLeft < 0.3
    ) {
        setEmotion("😉 Right Wink");
    }

    else {
        setEmotion("😐 Neutral");
    }
};