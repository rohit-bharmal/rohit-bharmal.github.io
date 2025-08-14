import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { GitHub, LinkedIn, Email, Send } from "@mui/icons-material";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: { xs: 2, md: 3 }, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: (theme: Theme) => theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
            }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
              color: (theme: Theme) => theme.palette.text.secondary,
            }}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out!
          </Typography>
        </motion.div>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <IconButton
            href="https://github.com/rohit-bharmal"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: (theme: Theme) => theme.palette.text.secondary,
              "&:hover": {
                color: (theme: Theme) => theme.palette.primary.main,
              },
            }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/rohitbharmal/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: (theme: Theme) => theme.palette.text.secondary,
              "&:hover": {
                color: (theme: Theme) => theme.palette.primary.main,
              },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="mailto:rohitbharmal123@gmail.com"
            sx={{
              color: (theme: Theme) => theme.palette.text.secondary,
              "&:hover": {
                color: (theme: Theme) => theme.palette.primary.main,
              },
            }}
          >
            <Email />
          </IconButton>
        </Stack>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: (theme: Theme) => theme.palette.background.paper,
              border: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.1)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {submitted && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
                onClose={() => setSubmitted(false)}
              >
                Message sent successfully! I'll get back to you soon.
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: (theme: Theme) =>
                          theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: (theme: Theme) =>
                          theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: (theme: Theme) =>
                          theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    py: 1.5,
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Contact;
