import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
        sx={{ mt: 2 }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
