import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  useMediaQuery,
} from "@mui/material";

const TenantPrivacyPolicy = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const policyText = [
    {
      title: "1. What Information We Collect",
      content: [
        { label: "Personal Information:", text: "Name, phone number, email address, residential address, date of birth, and other profile data you voluntarily submit." },
        { label: "Rental Records:", text: "Legal documents such as rental agreements, identity proofs, bills, and any uploaded documents." },
        { label: "Technical Data:", text: "Information like your IP address, browser type, device information, and interaction history with our app." },
      ],
    },
    {
      title: "2. How We Use Your Data",
      content: [
        { text: "Manage your RentEase account and profile." },
        { text: "Verify tenant or property owner identity." },
        { text: "Facilitate rent tracking, legal document management, and secure communication." },
        { text: "Enhance the performance, security, and personalization of your experience." },
        { text: "Investigate fraudulent, unauthorized, or illegal activity." },
      ],
    },
    {
      title: "3. When & Why We Share Data",
      content: [
        { label: "With Property Owners:", text: "Only authorized owners can access tenant-related information linked to their properties." },
        { label: "With Trusted Partners:", text: "We collaborate with reliable service providers (e.g., hosting, analytics) who follow strict privacy protocols." },
        { label: "With Authorities:", text: "Information may be shared if legally required under applicable laws." },
      ],
    },
    {
      title: "4. How We Secure Your Information",
      content: [
        { text: "End-to-end encryption of sensitive data." },
        { text: "Role-based access controls to minimize data exposure." },
        { text: "Secure cloud infrastructure using industry-leading standards (e.g., HTTPS, token-based auth)." },
      ],
    },
    {
      title: "5. Your Rights & Choices",
      content: [
        { text: "Access and update your profile anytime." },
        { text: "Delete your account or request data removal by contacting our support team." },
        { text: "Opt out of non-essential communications or tracking tools." },
      ],
    },
    {
      title: "6. Use of Cookies",
      content: [
        { text: "RentEase uses cookies to ensure smooth functionality and performance." },
        { text: "Cookies help us remember user preferences and track app usage anonymously." },
        { text: "You can disable cookies through your browser settings, although some features may be impacted." },
      ],
    },
    {
      title: "7. External Links Disclaimer",
      content: [
        { text: "Our app may contain links to third-party websites or services. We are not responsible for their content, privacy policies, or practices." },
      ],
    },
    {
      title: "8. Policy Updates",
      content: [
        { text: "We may revise this Privacy Policy periodically. Significant changes will be communicated via in-app messages or email notifications." },
      ],
    },
    {
      title: "9. Contact Us",
      content: [
        { text: "For any questions, concerns, or feedback regarding this policy or your data:" },
        { text: "📧 Email: support@rentease.com" },
        { text: "📞 Call: +91-99999-99999" },
      ],
    },
    {
      title: "Effective Date",
      content: [
        { text: "July 12, 2025" },
      ],
    },
  ];

  return (
    <Box
      px={isMobile ? 2 : 4}
      py={4}
      maxWidth="900px"
      mx="auto"
      bgcolor="#f9fafb"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: "#222" }}
        >
          Privacy Policy
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          bgcolor="#ffffffff"
          p={3}
          borderRadius={2}
          sx={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#333",
          }}
        >
          {policyText.map((section, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              {section.content.map((item, idx) => (
                <Typography key={idx} sx={{ mb: 1 }}>
                  {item.label && <strong>{item.label} </strong>}
                  {item.text}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default TenantPrivacyPolicy;
