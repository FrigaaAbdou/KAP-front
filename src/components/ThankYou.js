import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
    borderRadius: theme.spacing(4),
  },
}));

const ThankYouIcon = styled(CheckCircleOutline)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '4rem',
    marginBottom: theme.spacing(2.5),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
    marginBottom: theme.spacing(3),
  },
}));

function ThankYou() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <StyledPaper elevation={3}>
          <ThankYouIcon />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem'
              }
            }}
          >
            Merci pour votre participation !
          </Typography>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="h2" 
            gutterBottom 
            sx={{ 
              color: 'text.secondary',
              fontSize: {
                xs: '1.1rem',
                sm: '1.25rem',
                md: '1.5rem'
              }
            }}
          >
            شكراً على مشاركتكم!
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mt: { xs: 2, sm: 2.5, md: 3 },
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
                md: '1.1rem'
              }
            }}
          >
            Vos réponses ont été enregistrées avec succès. Votre contribution est précieuse pour notre étude sur le don de sang.
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mt: { xs: 1, sm: 1.5, md: 2 },
              direction: 'rtl',
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
                md: '1.1rem'
              }
            }}
          >
            تم تسجيل إجاباتكم بنجاح. مساهمتكم قيمة لدراستنا حول التبرع بالدم.
          </Typography>
        </StyledPaper>
      </Box>
    </Container>
  );
}

export default ThankYou; 