import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className = "",
  cursorClassName = "",
  typeSpeed = 100,
  deleteSpeed = 50,
  delaySpeed = 2000,
}) => {
  const theme = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), delaySpeed);
          return;
        }
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      } else {
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
        setCurrentText(currentText.slice(0, -1));
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words, typeSpeed, deleteSpeed, delaySpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Typography
      variant="h3"
      component="div"
      className={className}
      sx={{
        color: theme.palette.text.secondary,
        fontWeight: 600,
        minHeight: "1.2em",
      }}
    >
      <Box
        component="span"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {currentText}
      </Box>
      <Box
        component="span"
        className={cursorClassName}
        sx={{
          opacity: showCursor ? 1 : 0,
          color: theme.palette.primary.main,
          fontWeight: "normal",
          animation: "none",
          ml: 0.5,
        }}
      >
        |
      </Box>
    </Typography>
  );
};
