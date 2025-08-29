'use client';
import { useState, useRef, useCallback } from 'react';

export const useScreenCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCapture = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      setIsCapturing(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopCapture();
      });

      return mediaStream;
    } catch (error) {
      console.error('Screen capture failed:', error);
      throw new Error('Screen capture permission denied or not supported');
    }
  }, []);

  const stopCapture = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const captureScreenshot = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current || !isCapturing) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/png', 0.8);
  }, [isCapturing]);

  return {
    isCapturing,
    videoRef,
    canvasRef,
    startCapture,
    stopCapture,
    captureScreenshot
  };
};
