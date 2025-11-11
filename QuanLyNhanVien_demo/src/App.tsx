import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>
					<Layout>
						<AppRoutes />
					</Layout>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
