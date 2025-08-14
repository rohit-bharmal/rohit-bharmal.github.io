import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Box, Stack, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const transition = {
  duration: 0.4,
  ease: "easeInOut",
};

const footerVariants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const socialLinks = [
  {
    icon: <GitHub />,
    href: "https://github.com/rohit-bharmal",
    label: "GitHub",
  },
  {
    icon: <LinkedIn />,
    href: "https://www.linkedin.com/in/rohitbharmal/",
    label: "LinkedIn",
  },
  {
    icon: <Email />,
    href: "mailto:rohitbharmal123@gmail.com",
    label: "Email",
  },
];

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        pb: 6,
        pt: isMobile ? "56px" : 0, // Height of mobile header
        mt: 0,
        "& > *:first-of-type": {
          // Add padding to the first child element (usually the Container)
          pt: isMobile ? 1 : 2,
        },
      }}
    >
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={transition}
      >
        {children}
      </motion.div>

      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={footerVariants}
        >
          <Box
            sx={{
              backgroundColor: (theme: Theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(17, 34, 64, 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: 8,
              px: 3,
              py: 1.5,
              boxShadow: (theme: Theme) =>
                theme.palette.mode === "light"
                  ? "0 8px 32px rgba(0, 0, 0, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {socialLinks.map((link) => (
                <Tooltip key={link.label} title={link.label}>
                  <IconButton
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {link.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default PageWrapper;
