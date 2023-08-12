import HomePage from '../pages/home';
import Setting from '../pages/join/Setting/Setting';
import Toppic from '../pages/join/Topic';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/join',
		children: [
			{
				path: 'topic/:id',
				element: <Toppic />,
			},
			{
				path: 'settings',
				element: <Setting />,
			},
		],
	},
]);
