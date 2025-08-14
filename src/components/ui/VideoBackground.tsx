import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackGradient?: boolean;
  overlay?: boolean;
  children?: React.ReactNode;
}

const VideoBackground = ({
  videoSrc = "/assets/1943483-uhd_3840_2160_25fps.mp4",
  fallbackGradient = true,
  overlay = true,
  children,
}: VideoBackgroundProps) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        setVideoError(true);
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -2,
      }}
    >
      {/* Video Background */}
      {!videoError && (
        <Box
          component="video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            opacity: videoLoaded
              ? theme.palette.mode === "light"
                ? 0.08
                : 0.15
              : 0,
            transition: "opacity 3s ease-in-out",
            filter:
              theme.palette.mode === "light"
                ? "brightness(1.3) contrast(1.2) saturate(0.7) blur(0.5px)"
                : "brightness(0.6) contrast(1.4) saturate(1.3) blur(0.3px)",
            mixBlendMode:
              theme.palette.mode === "light" ? "multiply" : "screen",
          }}
        />
      )}

      {/* Fallback Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            theme.palette.mode === "light"
              ? `
              radial-gradient(circle at 25% 25%, rgba(30, 64, 175, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(124, 58, 237, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 75%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
              linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)
            `
              : `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 50% 75%, rgba(244, 114, 182, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)
            `,
          opacity: videoError || !videoLoaded ? 1 : fallbackGradient ? 0.3 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      />

      {/* Dynamic Overlay */}
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              theme.palette.mode === "light"
                ? `
                radial-gradient(circle at 35% 35%, rgba(30, 64, 175, 0.02) 0%, transparent 60%),
                radial-gradient(circle at 65% 65%, rgba(124, 58, 237, 0.02) 0%, transparent 60%),
                linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(248, 250, 252, 0.2) 100%)
              `
                : `
                radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
                radial-gradient(circle at 65% 65%, rgba(168, 85, 247, 0.04) 0%, transparent 60%),
                linear-gradient(180deg, rgba(2, 6, 23, 0.9) 0%, rgba(15, 23, 42, 0.3) 100%)
              `,
          }}
        />
      )}

      {/* Noise Texture Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.02,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {children}
    </Box>
  );
};

export default VideoBackground;
