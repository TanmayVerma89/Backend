import { useEffect, useRef, useState } from "react";
import "../style/facetest.scss";
import { detectExpression, startCamera } from "../utils/utils";

const FaceTest = ({ getSong = () => { } }) => {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);

    const [emotion, setEmotion] = useState("🙂 Ready To Detect");
    const [isDetecting, setIsDetecting] = useState(false);

    async function detectHandler() {
        setIsDetecting(true);

        try {
            const currentMood = detectExpression(faceLandmarkerRef, videoRef, setEmotion);

            if (!currentMood) {
                return;
            }

            await getSong(currentMood);
        } catch (error) {
            console.error(error);
            setEmotion("❌ Could not find a song");
        } finally {
            setIsDetecting(false);
        }
    }

    useEffect(() => {
        startCamera(faceLandmarkerRef, videoRef, setEmotion);

        return () => {
            const stream =
                videoRef.current?.srcObject;

            if (stream) {
                stream
                    .getTracks()
                    .forEach((track) =>
                        track.stop()
                    );
            }

            faceLandmarkerRef.current?.close();
        };
    }, []);

    return (
        <section className="face-test">
            <div className="camera-container">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                />
            </div>

            <h2>{emotion}</h2>

            <button
                className="detect-btn"
                onClick={detectHandler}
                disabled={isDetecting}
            >
                {isDetecting ? "Finding a song..." : "Detect Expression"}
            </button>
        </section>
    );
}

export default FaceTest;
