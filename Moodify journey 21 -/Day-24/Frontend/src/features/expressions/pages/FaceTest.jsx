import { useEffect, useRef, useState } from "react";
import "../style/facetest.scss";
import { detectExpression, startCamera } from "../utils/utils";

export default function FaceTest() {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);

    const [emotion, setEmotion] = useState("🙂 Ready To Detect");

    function detectHandler() {
        detectExpression(faceLandmarkerRef, videoRef , setEmotion)
    }

    useEffect(() => {
        startCamera(faceLandmarkerRef, videoRef ,setEmotion);

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
        <main>
            <div className="camera-container">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    width={500}
                />
            </div>

            <h2>{emotion}</h2>

            <button
                className="detect-btn"
                onClick={detectHandler}
            >
                Detect Expression
            </button>
        </main>
    );
}