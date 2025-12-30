import { Box, Fab, Zoom } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { FloatingNav } from "./ui/FloatingNav";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";

const MainPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 400px
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: (theme: Theme) => theme.palette.background.default,
        color: (theme: Theme) => theme.palette.text.primary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundBeams />
      <FloatingNav />

      {/* Home Section */}
      <section id="home" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Home />
      </section>

      {/* About Section */}
      <section id="about" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <About />
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Experience />
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Contact />
      </section>

      {/* Back to Top Button */}
      <Zoom in={showBackToTop}>
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 40 },
            right: { xs: 20, sm: 40 },
            backgroundColor: (theme: Theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme: Theme) => theme.palette.primary.dark,
            },
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default MainPage;
