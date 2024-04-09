import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Define custom theme
const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#1c1e29', // Set background color to black
        color: 'white', // Set text color to white
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
