import { BiSolidUser } from 'react-icons/bi';

const SidebarMyLibrary = () => {
	return (
		<div className="w-full max-w-xs">
			<div className="">
				<div className="cursor-pointer flex items-center justify-start gap-3 p-1 mb-1 bg-white rounded">
					<BiSolidUser color="#8854c0" />
					<span>Được tạo bởi tôi</span>
				</div>
			</div>
		</div>
	);
};

export default SidebarMyLibrary;
