import Header from '../pages/admin/components/Header';
import Sidebar from '../pages/admin/MyLibrary/components/Sidebar';

interface LayoutAdminProps {
	children: React.ReactNode;
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 bg-[#F2F2F2]">
				<Header />
				{children}
			</div>
		</div>
	);
};

export default LayoutAdmin;
