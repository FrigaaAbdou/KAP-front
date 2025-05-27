import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Survey from './components/Survey';
import ThankYou from './components/ThankYou';


const theme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Survey />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
