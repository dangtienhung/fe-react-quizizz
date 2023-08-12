import { Navigate, createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/home';
import MyLibrary from '../pages/admin/MyLibrary';
import PreQuiz from '../pages/join/Quiz';
import QuizizzGame from '../pages/join/Game';
import Setting from '../pages/join/Setting/Setting';
import Toppic from '../pages/join/Topic';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/join',
		children: [
			{ path: 'topic/:id', element: <Toppic /> },
			{ path: 'quiz/:id', element: <PreQuiz /> },
			{ path: 'game/:id', element: <QuizizzGame /> },
			{ path: 'settings', element: <Setting /> },
		],
	},
	{
		path: '/admin',
		children: [
			{ index: true, element: <Navigate to="my-library" /> },
			{ path: 'my-library', element: <MyLibrary /> },
		],
	},
]);
