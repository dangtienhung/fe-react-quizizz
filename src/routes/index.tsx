import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const RootRoutes = () => {
	return <RouterProvider router={router} />;
};

export default RootRoutes;
