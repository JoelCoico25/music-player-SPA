import { useState, useCallback, useRef, useEffect } from "react";

export const usePlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio());

    // Manejar eventos del <audio>
    useEffect(() => {
        const audio = audioRef.current;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onEnded = () => nextTrack();

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
        };


    }, [playlist]);

    const addTrack = useCallback((track) => {
        setPlaylist((prev) => [...prev, track]);
    }, []);

    const removeTrack = useCallback((trackId) => {
        setPlaylist((prev) => prev.filter((track) => track.id !== trackId));
    }, []);

    const playTrack = useCallback((index) => {
        if (playlist[index]) {
            const audio = audioRef.current;
            audio.src = playlist[index].url;
            audio.play();
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    }, [playlist]);

    const pauseTrack = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const resumeTrack = useCallback(() => {
        if (currentTrackIndex !== null) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentTrackIndex]);

    const nextTrack = useCallback(() => {
        if (currentTrackIndex !== null && playlist.length > 0) {
            const nextIndex = (currentTrackIndex + 1) % playlist.length;
            playTrack(nextIndex);
        }
    }, [currentTrackIndex, playlist, playTrack]);

    const prevTrack = useCallback(() => {
        if (currentTrackIndex !== null && playlist.length > 0) {
            const prevIndex =
                (currentTrackIndex - 1 + playlist.length) % playlist.length;
            playTrack(prevIndex);
        }
    }, [currentTrackIndex, playlist, playTrack]);

    const seekTo = useCallback((time) => {
        const audio = audioRef.current;
        audio.currentTime = time;
        setCurrentTime(time);
    }, []);

    const clearPlaylist = useCallback(() => {
        audioRef.current.pause();
        audioRef.current.src = "";
        setPlaylist([]);
        setCurrentTrackIndex(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, []);

    return {
        playlist,
        currentTrack: currentTrackIndex !== null ? playlist[currentTrackIndex] : null,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        addTrack,
        removeTrack,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        prevTrack,
        seekTo,
        clearPlaylist,
        setIsLoading,
    };
};
