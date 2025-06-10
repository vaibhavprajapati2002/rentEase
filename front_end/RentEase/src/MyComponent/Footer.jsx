import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f5f5f5', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © 2048 Villa Agency Co., Ltd. All rights reserved.
          <br />
          Design:{' '}
          <MuiLink
            href="https://templatemo.com"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            underline="hover"
          >
            TemplateMo
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
