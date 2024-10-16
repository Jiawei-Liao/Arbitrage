import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh"textAlign="center">
          <Typography variant="h1" color="error" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to Home
          </Button>
        </Box>
      );
    };