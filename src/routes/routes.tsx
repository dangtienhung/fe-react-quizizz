import { Navigate, createBrowserRouter } from 'react-router-dom';

import CreateQuestion from '../pages/admin/Quiz/CreateQuestion';
import HomePage from '../pages/home';
import MyLibrary from '../pages/admin/MyLibrary';
import PreQuiz from '../pages/join/Quiz';
import QuizEdit from '../pages/admin/Quiz/Edit';
import QuizLists from '../pages/admin/Quiz/Lists/Lists';
import QuizizzGame from '../pages/join/Game';
import Setting from '../pages/join/Setting/Setting';
import Toppic from '../pages/join/Topic';

export const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
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
			{
				path: 'quiz',
				children: [
					{ path: 'lists', element: <QuizLists /> },
					{ path: 'edit/:id', element: <QuizEdit /> },
					{ path: 'questions/create', element: <CreateQuestion /> },
				],
			},
		],
	},
]);
