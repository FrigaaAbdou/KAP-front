import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function EmailTest() {
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('inherit');

  const checkEmail = async (e) => {
    e.preventDefault(); // Prevent form submission
    const emailInput = document.querySelector('input[type="email"]');
    const email = emailInput?.value?.trim();

    if (!email) {
      setMessage('Veuillez entrer un email');
      setMessageColor('error.main');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/responses/check-email`, { email });
      if (response.data.exists) {
        setMessage('Cet email existe déjà dans la base de données');
        setMessageColor('error.main');
      } else {
        setMessage('Cet email est disponible');
        setMessageColor('success.main');
      }
    } catch (err) {
      setMessage('Erreur lors de la vérification');
      setMessageColor('error.main');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ 
        p: 4, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h5" gutterBottom>
          Test de Vérification Email
        </Typography>
        
        <form onSubmit={checkEmail}>
          <Box sx={{ mt: 3 }}>
            <input
              type="email"
              placeholder="Entrez un email se terminant par @example.com"
              pattern=".+@example\.com$"
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '16px'
              }}
              title="L'email doit se terminer par @example.com"
            />
            
            <Button 
              type="submit"
              variant="contained" 
              fullWidth
            >
              Vérifier l'email
            </Button>

            {message && (
              <Typography 
                sx={{ 
                  mt: 2, 
                  color: messageColor,
                  textAlign: 'center'
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default EmailTest; 