import React, { useState, useCallback } from 'react';
import { TextField, Box, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const EmailInput = ({ onValidationChange }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkEmailExists = useCallback(async (email) => {
    try {
      const response = await axios.post(`${API_URL}/responses/check-email`, { email });
      return response.data.exists;
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value.toLowerCase(); // Force lowercase for consistency
    setEmail(value);
    
    if (error) {
      setError(null);
    }
    
    const isValidFormat = validateEmailFormat(value);
    onValidationChange(isValidFormat && value.length > 0);
  }, [error, onValidationChange]);

  const handleInputBlur = useCallback(async () => {
    if (!email) {
      setError('L\'email est requis');
      onValidationChange(false);
      return;
    }

    if (!validateEmailFormat(email)) {
      setError('Format d\'email invalide');
      onValidationChange(false);
      return;
    }

    setIsValidating(true);
    const exists = await checkEmailExists(email);
    setIsValidating(false);

    if (exists) {
      setError('Cet email a déjà été utilisé');
      onValidationChange(false);
      return;
    }

    setError(null);
    onValidationChange(true);
  }, [email, checkEmailExists, onValidationChange]);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        mb: { xs: 2, sm: 3, md: 4 },
        position: 'relative'
      }}
    >
      <TextField
        fullWidth
        required
        type="email"
        label="Email"
        value={email}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={!!error}
        helperText={error || ''}
        disabled={isValidating}
        inputProps={{
          inputMode: 'email',
          autoComplete: 'email',
          autoCapitalize: 'none',
          spellCheck: 'false',
          autoCorrect: 'off',
          style: {
            fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
            padding: isMobile ? '12px' : isTablet ? '14px' : '16px',
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
          }
        }}
        FormHelperTextProps={{
          style: {
            fontSize: isMobile ? '12px' : '14px',
            marginTop: '4px',
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: 1, sm: 1.5, md: 2 },
            transition: 'all 0.3s ease',
            backgroundColor: (theme) => 
              error ? theme.palette.error.light + '10' : 
              theme.palette.background.paper,
            '&:hover': {
              backgroundColor: (theme) => 
                error ? theme.palette.error.light + '20' : 
                theme.palette.action.hover,
            },
            '&.Mui-focused': {
              backgroundColor: (theme) => theme.palette.background.paper,
              '& fieldset': {
                borderWidth: '2px',
                borderColor: (theme) => 
                  error ? theme.palette.error.main : 
                  theme.palette.primary.main,
              }
            },
            '& fieldset': {
              borderColor: (theme) => 
                error ? theme.palette.error.main : 
                theme.palette.grey[400],
            }
          },
          '& .MuiFormHelperText-root': {
            margin: { xs: '4px 0 0', sm: '6px 0 0' },
            lineHeight: 1.4,
          }
        }}
      />
      {isValidating && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 12 },
            top: '50%',
            transform: 'translateY(-50%)',
            marginTop: error ? '-12px' : '0',
          }}
        />
      )}
    </Box>
  );
};

export default EmailInput; 