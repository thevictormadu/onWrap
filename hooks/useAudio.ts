"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseAudioOptions {
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

interface UseAudioReturn {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

/**
 * Custom hook for audio playback management
 * Encapsulates audio element creation, play/pause logic, and cleanup
 */
export function useAudio(
  src: string,
  options: UseAudioOptions = {}
): UseAudioReturn {
  const { volume = 0.6, loop = true, autoPlay = true } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;

    // Auto-play on mount if enabled
    if (autoPlay) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [src, volume, loop, autoPlay]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Silently handle audio play errors
      });
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, toggle, play, pause };
}
