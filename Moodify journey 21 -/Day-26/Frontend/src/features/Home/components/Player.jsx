import { useEffect, useRef, useState } from "react";
import "../styles/player.scss";
import { useSong } from "../hooks/useSong";

const FALLBACK_SONG = {
    title: "Nothing playing",
    mood: "Choose a mood to find a track",
    posterUrl: "",
    url: "",
};

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

const Player = () => {
    const audioRef = useRef(null);
    const context = useSong();
    const song = context?.song || FALLBACK_SONG;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setHasError(false);
    }, [song?.url]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
        audio.muted = isMuted;
        audio.playbackRate = playbackSpeed;
    }, [volume, isMuted, playbackSpeed]);

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio || !song.url) return;

        if (audio.paused) { 
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
                setHasError(true);
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const seekBy = (seconds) => {
        const audio = audioRef.current;
        if (!audio || !Number.isFinite(audio.duration)) return;

        audio.currentTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            audio.duration
        );
    };

    const handleProgressChange = (event) => {
        const audio = audioRef.current;
        const nextTime = Number(event.target.value);
        if (!audio) return;

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value);
        setVolume(nextVolume);
        setIsMuted(nextVolume === 0);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <section className="player" aria-label="Music player">
            <audio
                ref={audioRef}
                src={song.url}
                preload="metadata"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
            />

            <div className="player__track">
                <div className="player__artwork" aria-hidden="true">
                    {song.posterUrl ? (
                        <img src={song.posterUrl} alt="" />
                    ) : (
                        <span>♫</span>
                    )}
                </div>

                <div className="player__details">
                    <p className="player__eyebrow">Now playing</p>
                    <h2>{song.title}</h2>
                    <p className="player__mood">{song.mood} mood mix</p>
                </div>

            </div>

            <div className="player__timeline">
                <span>{formatTime(currentTime)}</span>
                <input
                    className="player__range player__progress"
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={Math.min(currentTime, duration || 0)}
                    onChange={handleProgressChange}
                    disabled={!duration}
                    aria-label="Song progress"
                    style={{ "--range-progress": `${progress}%` }}
                />
                <span>{formatTime(duration)}</span>
            </div>

            <div className="player__controls">
                
                <button
                    className="player__skip-button"
                    type="button"
                    onClick={() => seekBy(-5)}
                    disabled={!duration}
                    aria-label="Go back 5 seconds"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7.3 4.1V8H3.4M4.3 11.7A8 8 0 1 0 7.1 5.9" />
                    </svg>
                    <span>5</span>
                </button>

                <button
                    className="player__play-button"
                    type="button"
                    onClick={togglePlayback}
                    disabled={!song.url}
                    aria-label={isPlaying ? "Pause song" : "Play song"}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14M16 5v14" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m8 5 11 7-11 7V5Z" />
                        </svg>
                    )}
                </button>

                <button
                    className="player__skip-button player__skip-button--forward"
                    type="button"
                    onClick={() => seekBy(5)}
                    disabled={!duration}
                    aria-label="Go forward 5 seconds"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M16.7 4.1V8h3.9m-.9 3.7A8 8 0 1 1 16.9 5.9" />
                    </svg>
                    <span>5</span>
                </button>

                <div className="player__volume">
                    <button
                        className="player__icon-button"
                        type="button"
                        onClick={() => setIsMuted((muted) => !muted)}
                        aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            {isMuted || volume === 0 ? (
                                <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 1.5 4 4m0-4-4 4" />
                            ) : (
                                <path d="M4 9v6h4l5 4V5L8 9H4m12.4.6a4 4 0 0 1 0 4.8m2.2-7a8 8 0 0 1 0 9.2" />
                            )}
                        </svg>
                    </button>
                    <input
                        className="player__range player__volume-range"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume"
                        style={{ "--range-progress": `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                </div>

                <label className="player__speed">
                    <span className="player__speed-label">Speed</span>
                    <select
                        value={playbackSpeed}
                        onChange={(event) => setPlaybackSpeed(Number(event.target.value))}
                        aria-label="Playback speed"
                    >
                        {PLAYBACK_SPEEDS.map((speed) => (
                            <option key={speed} value={speed}>
                                {speed}x
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {hasError && (
                <p className="player__error" role="status">
                    We couldn’t load this song. Please try another track.
                </p>
            )}
        </section>
    );
};

export default Player;
