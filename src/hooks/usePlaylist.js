import { useState, useCallback, useRef, useEffect } from "react";

import processFiles from "@utils/playlist/operations";
import { parseBlob } from "music-metadata-browser";

export const usePlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7); // 0..1
    const [isMuted, setIsMuted] = useState(false);
    const previousVolumeRef = useRef(1);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatOne, setRepeatOne] = useState(false);
    const [repeatAll, setRepeatAll] = useState(true);

    
    const audioRef = useRef(new Audio());

    const revokeTrackUrls = useCallback((track) => {
        try {
            if (track?.url) URL.revokeObjectURL(track.url);
        } catch (e) {
            void e; // ignore revoke errors
        }
        try {
            if (track?.coverUrl) URL.revokeObjectURL(track.coverUrl);
        } catch (e) {
            void e; // ignore revoke errors
        }
    }, []);

    // Load persisted preferences on first mount
    useEffect(() => {
        try {
            const lsVolume = localStorage.getItem("mp.volume");
            const lsMuted = localStorage.getItem("mp.isMuted");
            const lsShuffle = localStorage.getItem("mp.isShuffle");
            const lsRepeatOne = localStorage.getItem("mp.repeatOne");
            const lsRepeatAll = localStorage.getItem("mp.repeatAll");

            if (lsVolume !== null) {
                const v = Number(lsVolume);
                if (!Number.isNaN(v)) {
                    const clamped = Math.max(0, Math.min(1, v));
                    previousVolumeRef.current = clamped || 1;
                    // set volume without auto-unmuting if muted was stored
                    setVolume(clamped);
                }
            }
            if (lsMuted !== null) setIsMuted(lsMuted === "true");
            if (lsShuffle !== null) setIsShuffle(lsShuffle === "true");
            if (lsRepeatOne !== null) setRepeatOne(lsRepeatOne === "true");
            if (lsRepeatAll !== null) setRepeatAll(lsRepeatAll === "true");
        } catch (e) {
            void e;
        }
    }, []);

    // Persist preferences when they change
    useEffect(() => {
        try { localStorage.setItem("mp.volume", String(volume)); } catch (e) { void e; }
    }, [volume]);
    useEffect(() => {
        try { localStorage.setItem("mp.isMuted", String(isMuted)); } catch (e) { void e; }
    }, [isMuted]);
    useEffect(() => {
        try { localStorage.setItem("mp.isShuffle", String(isShuffle)); } catch (e) { void e; }
    }, [isShuffle]);
    useEffect(() => {
        try { localStorage.setItem("mp.repeatOne", String(repeatOne)); } catch (e) { void e; }
    }, [repeatOne]);
    useEffect(() => {
        try { localStorage.setItem("mp.repeatAll", String(repeatAll)); } catch (e) { void e; }
    }, [repeatAll]);

    const extractMetadata = useCallback(async (item) => {
        try {
            const metadata = await parseBlob(item.file);
            const common = metadata.common || {};
            const picture = Array.isArray(common.picture) && common.picture.length > 0 ? common.picture[0] : null;

            let coverUrl;
            if (picture?.data) {
                const blob = new Blob([picture.data], { type: picture.format || "image/jpeg" });
                coverUrl = URL.createObjectURL(blob);
            }

            return {
                ...item,
                title: common.title || item.name,
                artist: common.artist || (Array.isArray(common.artists) ? common.artists.join(", ") : undefined),
                album: common.album,
                year: common.year,
                genre: Array.isArray(common.genre) ? common.genre : common.genre ? [common.genre] : [],
                trackNo: common.track?.no,
                diskNo: common.disk?.no,
                coverUrl,
                bitrate: metadata.format?.bitrate,
                sampleRate: metadata.format?.sampleRate,
                codec: metadata.format?.codec,
                durationSec: metadata.format?.duration,
            };
        } catch (e) {
            void e;
            return {
                ...item,
                title: item.name,
            };
        }
    }, []);

    const importFiles = useCallback(async (files, { append = false } = {}) => {
        setIsLoading(true);
        try {
            const baseItems = await processFiles(files);
            const items = await Promise.all(baseItems.map(extractMetadata));
            if (append) {
                setPlaylist((prev) => [...prev, ...items]);
            } else {
                // Revoke previous URLs before replacing
                setPlaylist((prev) => {
                    prev.forEach(revokeTrackUrls);
                    return items;
                });
                setCurrentTrackIndex(null);
                setIsPlaying(false);
                setCurrentTime(0);
                setDuration(0);
                // Try to restore last index/time
                try {
                    const savedIndexRaw = localStorage.getItem("mp.lastIndex");
                    const savedTimeRaw = localStorage.getItem("mp.lastTime");
                    const savedIndex = savedIndexRaw !== null ? Number(savedIndexRaw) : null;
                    const savedTime = savedTimeRaw !== null ? Number(savedTimeRaw) : null;
                    if (
                        savedIndex !== null &&
                        Number.isInteger(savedIndex) &&
                        savedIndex >= 0 &&
                        savedIndex < items.length
                    ) {
                        const audio = audioRef.current;
                        // preload src for metadata and seeking; do not autoplay
                        audio.pause();
                        audio.src = items[savedIndex].url;
                        setCurrentTrackIndex(savedIndex);
                        if (savedTime !== null && !Number.isNaN(savedTime) && savedTime >= 0) {
                            const onLoaded = () => {
                                try {
                                    audio.currentTime = Math.min(savedTime, Number.isFinite(audio.duration) ? audio.duration : savedTime);
                                    setCurrentTime(audio.currentTime);
                                } catch (e) { void e; }
                                audio.removeEventListener("loadedmetadata", onLoaded);
                            };
                            audio.addEventListener("loadedmetadata", onLoaded);
                            // In case metadata is already loaded
                            if (!isNaN(audio.duration) && audio.duration > 0) {
                                onLoaded();
                            }
                        }
                    }
                } catch (e) { void e; }
            }
            return items;
        } finally {
            setIsLoading(false);
        }
    }, [extractMetadata, revokeTrackUrls]);

    const addFiles = useCallback(async (files) => importFiles(files, { append: true }), [importFiles]);

    const addTrack = useCallback((track) => {
        setPlaylist((prev) => [...prev, track]);
    }, []);

    const removeTrack = useCallback((trackId) => {
        setPlaylist((prev) => {
            const toRemove = prev.find(t => t.id === trackId);
            if (toRemove) revokeTrackUrls(toRemove);
            return prev.filter((track) => track.id !== trackId);
        });
    }, [revokeTrackUrls]);

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
        if (currentTrackIndex === null || playlist.length === 0) return;
        const audio = audioRef.current;
        if (isShuffle && playlist.length > 1) {
            let nextIndex = currentTrackIndex;
            while (nextIndex === currentTrackIndex) {
                nextIndex = Math.floor(Math.random() * playlist.length);
            }
            playTrack(nextIndex);
            return;
        }
        const atLast = currentTrackIndex === playlist.length - 1;
        if (atLast && !repeatAll) {
            // stop at end
            audio.pause();
            setIsPlaying(false);
            return;
        }
        const nextIndex = atLast ? 0 : currentTrackIndex + 1;
        playTrack(nextIndex);
    }, [currentTrackIndex, playlist, playTrack, isShuffle, repeatAll]);

    const prevTrack = useCallback(() => {
        if (currentTrackIndex !== null && playlist.length > 0) {
            const prevIndex =
                (currentTrackIndex - 1 + playlist.length) % playlist.length;
            playTrack(prevIndex);
        }
    }, [currentTrackIndex, playlist, playTrack]);

    // Manejar eventos del <audio> (ubicado después de nextTrack para evitar TDZ)
    useEffect(() => {
        const audio = audioRef.current;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onEnded = () => {
            if (repeatOne && currentTrackIndex !== null) {
                // Reproducir la misma pista desde el inicio
                audio.currentTime = 0;
                audio.play();
                setIsPlaying(true);
            } else {
                nextTrack();
            }
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
        };
    }, [nextTrack, repeatOne, currentTrackIndex]);

    // Persist last index & time
    useEffect(() => {
        try { if (currentTrackIndex !== null) localStorage.setItem("mp.lastIndex", String(currentTrackIndex)); } catch (e) { void e; }
    }, [currentTrackIndex]);
    useEffect(() => {
        try { localStorage.setItem("mp.lastTime", String(Math.floor(currentTime || 0))); } catch (e) { void e; }
    }, [currentTime]);

    // Apply volume/mute to the audio element
    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = isMuted ? 0 : Math.max(0, Math.min(1, volume));
    }, [volume, isMuted]);

    const setVolumeNormalized = useCallback((v) => {
        const clamped = Math.max(0, Math.min(1, Number(v)));
        setVolume(clamped);
        if (clamped > 0) {
            previousVolumeRef.current = clamped;
            setIsMuted(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (isMuted) {
            setIsMuted(false);
            if (volume === 0) {
                setVolume(previousVolumeRef.current || 1);
            }
        } else {
            if (volume > 0) previousVolumeRef.current = volume;
            setIsMuted(true);
        }
    }, [isMuted, volume]);

    const seekTo = useCallback((time) => {
        const audio = audioRef.current;
        audio.currentTime = time;
        setCurrentTime(time);
    }, []);

    const clearPlaylist = useCallback(() => {
        audioRef.current.pause();
        audioRef.current.src = "";
        setPlaylist((prev) => {
            prev.forEach(revokeTrackUrls);
            return [];
        });
        setCurrentTrackIndex(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [revokeTrackUrls]);

    const toggleShuffle = useCallback(() => setIsShuffle((s) => !s), []);
    const toggleRepeatOne = useCallback(() => setRepeatOne((r) => !r), []);
    const toggleRepeatAll = useCallback(() => setRepeatAll((r) => !r), []);

    const restartPlaylist = useCallback(() => {
        if (playlist.length === 0) return;
        // Siempre reiniciamos desde el índice 0
        playTrack(0);
    }, [playlist, playTrack]);

    return {
        playlist,
        currentTrack: currentTrackIndex !== null ? playlist[currentTrackIndex] : null,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatOne,
        repeatAll,
        addTrack,
        removeTrack,
        importFiles,
        addFiles,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        prevTrack,
        seekTo,
        clearPlaylist,
        setIsLoading,
        setVolume: setVolumeNormalized,
        toggleMute,
        toggleShuffle,
        toggleRepeatOne,
        toggleRepeatAll,
        restartPlaylist,
    };
};
