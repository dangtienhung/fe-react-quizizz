import {
	Navigate,
	Outlet,
	createBrowserRouter,
	useNavigate,
} from 'react-router-dom';

import CreateByMe from '@/pages/admin/Quiz/CreateByMe';
import CreateQuestion from '@/pages/admin/Quiz/CreateQuestion';
import HomePage from '@/pages/home';
import MyLibrary from '@/pages/admin/MyLibrary';
import PreQuiz from '@/pages/join/Quiz';
import QuizEdit from '@/pages/admin/Quiz/Edit';
import QuizLists from '@/pages/admin/Quiz/Lists/Lists';
import QuizizzGame from '@/pages/join/Game';
import Setting from '@/pages/join/Setting/Setting';
import Toppic from '@/pages/join/Topic';
import { useEffect } from 'react';
import { userStore } from '@/store/userStore';

const PrivateRoute = ({ isAuth }: any) => {
	const { user } = userStore((state) => state);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user._id) {
			navigate('/');
		}
	}, [isAuth]);

	return user._id ? <Outlet /> : <Navigate to="/" />;
};

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
		element: <PrivateRoute />,
		children: [
			{ index: true, element: <Navigate to="my-library" /> },
			{ path: 'my-library', element: <MyLibrary /> },
			{
				path: 'quiz',
				children: [
					{ path: 'lists/:id', element: <QuizLists /> },
					{ path: 'edit/:id', element: <QuizEdit /> },
					{ path: 'questions/create/:id', element: <CreateQuestion /> },
					{ path: ':id', element: <CreateByMe /> },
				],
			},
		],
	},
]);
