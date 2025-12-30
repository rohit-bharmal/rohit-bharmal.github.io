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
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { GitHub, LinkedIn, Email, Send, LocationOn } from "@mui/icons-material";

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
  const theme = useTheme();
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
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            color: theme.palette.primary.main,
            fontWeight: 700,
          }}
        >
          Get In Touch
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            mb: 8,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          I'm always open to discussing new projects, creative ideas, or
          opportunities. Feel free to reach out!
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Let's Connect
            </Typography>

            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Email sx={{ color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Email
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    rohitbharmal123@gmail.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocationOn sx={{ color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Location
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Pune
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <IconButton
                href="https://github.com/rohit-bharmal"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
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
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="mailto:rohitbharmal123@gmail.com"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Email />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
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
                  />
                  <Button
                    type="submit"
                    variant="contained"
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
