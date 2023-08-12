import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ToastContainer />
		</QueryClientProvider>
	</React.StrictMode>
);
