import Header from '../components/Header';
import ListQuizizz from './components/ListQuizizz';
import Sidebar from './components/Sidebar';
import SidebarMyLibrary from './components/SidebarMyLibrary';

const MyLibrary = () => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 bg-[#F2F2F2]">
				<Header />
				<div className="p-8">
					<div className="">
						<h2 className="text-xl font-bold text-[#424242] mb-5">
							Thư viện của tôi
						</h2>
					</div>
					<div className="flex gap-4">
						<SidebarMyLibrary />
						<ListQuizizz />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyLibrary;
