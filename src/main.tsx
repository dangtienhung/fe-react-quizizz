import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ToastContainer />
	</QueryClientProvider>
);
