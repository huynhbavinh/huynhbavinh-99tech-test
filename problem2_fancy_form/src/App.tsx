import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormComponent from './components/Form.component';
import DisplayResult from './components/DisplayResult.component';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          component={'h1'}
          textTransform={'capitalize'}
          textAlign={'center'}
        >
          Currency Swap
        </Box>
        <Box sx={{
          display: 'flex',

        }}>
          <Box sx={{flexGrow: '1'}}>
            <FormComponent />
          </Box>
          <Box sx={{flexGrow: '3'}}>
            <DisplayResult />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
