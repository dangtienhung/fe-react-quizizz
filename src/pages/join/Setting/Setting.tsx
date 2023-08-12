import LayoutDefault from '../../../layouts/LayoutDefault';
import SettingContainer from './components/SettingContainer';
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';

import { IoIosArrowForward } from 'react-icons/io';
const info = [
	{ title: 'Hình đại diện', content: 'parry pirate' },
	{ title: 'Hình đại diện', content: 'parry pirate' },
];

const account = [
	{ title: 'Cập nhật mật khẩu' },
	{ title: 'Xóa tài khoản' },
	{ title: 'Đăng xuất' },
];

const Setting = () => {
	return (
		<LayoutDefault>
			<div className="md:p-0 flex-1 p-2">
				<h1 className="my-3 text-2xl font-medium text-center">Cài đặt</h1>
				<SettingContainer
					title="Hồ sơ"
					info={info}
					icon={<FaUserEdit color="#EFA929" />}
				/>
				{/* <SettingContainer
					title="Cài đặt tài khoản"
					info={account}
					icon={<FaUserCircle color="#D5546D" />}
				/> */}
				<div className="rounded-xl w-full max-w-xl p-4 mx-auto mb-5 bg-white shadow">
					<div className="flex items-center gap-2 mb-2">
						<span>
							<FaUserCircle color="#D5546D" />
						</span>
						<span className="text-[#AAC7E7]">Cài đặt tài khoản</span>
					</div>
					<div className="">
						<div className="flex items-center justify-between mb-3 select-none">
							<div className="flex-1 cursor-pointer">
								<h3 className="text-lg font-medium">Cập nhật mật khẩu</h3>
							</div>
							<span>
								<IoIosArrowForward />
							</span>
						</div>
						<div className="flex items-center justify-between mb-3 select-none">
							<div className="flex-1 cursor-pointer">
								<h3 className="text-lg font-medium">Xóa tài khoản</h3>
							</div>
							<span>
								<IoIosArrowForward />
							</span>
						</div>
						<div className="flex items-center justify-between mb-3 select-none">
							<div className="flex-1 cursor-pointer">
								<h3 className="text-lg font-medium">Đăng xuất</h3>
							</div>
							<span>
								<IoIosArrowForward />
							</span>
						</div>
					</div>
				</div>
			</div>
		</LayoutDefault>
	);
};

export default Setting;