import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { Dropdown, TextInput } from 'flowbite-react';

import { BsBell } from 'react-icons/bs';
import { VscLibrary } from 'react-icons/vsc';
import { useState } from 'react';

const menus = [
	{ id: 1, name: 'Thư viện của tôi', icon: <VscLibrary /> },
	{ id: 2, name: 'Cài đặt', icon: <AiOutlineSetting /> },
];

const Header = () => {
	const [isSelected] = useState<number>(0);
	return (
		<div className="h-14 flex items-center justify-between w-full gap-5 p-2 bg-white shadow">
			<div className="flex items-center justify-between w-full">
				<form className="w-full flex-1 bg-[#f2f2f2]">
					<TextInput
						type="text"
						icon={AiOutlineSearch}
						placeholder="Tìm kiếm trong thư việc của tôi"
						className="focus:!border focus:border-primary focus:ring-0"
						style={{
							width: '100%',
							border: 'none',
							boxShadow: 'none',
							background: '#f2f2f2',
						}}
					/>
				</form>
				<div className="relative">
					<div className="absolute top-1/2 left-0 h-6 w-[1px] bg-[#b6b6b6] z-50 -translate-y-1/2"></div>
					<Dropdown
						label="DropdownDropdownDropdown"
						style={{
							background: '#F2F2F2',
							color: '#424242',
							boxShadow: 'none',
							borderRadius: '0',
							border: 'none',
						}}
					>
						{menus.map((menu, index) => (
							<div
								key={menu.id}
								className={`p-2 font-medium cursor-pointer ${
									index === isSelected
										? 'bg-[#EDE6F6] text-primary'
										: 'bg-white text-secondary'
								}`}
							>
								{menu.name}
							</div>
						))}
					</Dropdown>
				</div>
			</div>
			<div className="flex items-center justify-between gap-4">
				<button className="w-24 text-[#a076cc] bg-[#ede6f5] h-10 flex justify-center items-center rounded font-bold">
					Nhập mã
				</button>
				<div className="h-10 w-10 flex justify-center items-center bg-[#f2f2f2] rounded-full">
					<BsBell size={20} color="#222222" />
				</div>
			</div>
		</div>
	);
};

export default Header;
