import { AiFillSave, AiFillSetting } from 'react-icons/ai';

import { BsPlusSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { VscDebugStart } from 'react-icons/vsc';
import { useState } from 'react';

interface HeaderProps {
	children?: React.ReactNode;
	className?: string;
}

const Header = ({ className }: HeaderProps) => {
	const [openModal, setOpenModal] = useState<string | undefined>();
	const props = { openModal, setOpenModal };
	return (
		<>
			<div
				className={`h-14 w-full z-50 border-b fixed top-0 left-0 right-0 p-2 bg-white shadow flex justify-between items-center ${className}`}
			>
				<div className="p-2 w-[146px] flex justify-center items-center">
					<Link to={`/`} className="inline-block">
						<img
							src="https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png"
							alt="logo"
							width={146}
							height={40}
							className="object-cover w-2/3"
						/>
					</Link>
				</div>
				<div className="relative flex items-center flex-1">
					<div className="absolute top-1/2 -translate-y-1/2 -left-6 h-8 w-[2px] z-50 bg-[#B6B6B6]"></div>
					<div className="flex-1">
						<button className="rounded px-2 py-1 font-medium outline-none border-none hover:bg-[#F2F2F2]">
							Bài quiz không có tiêu đề
						</button>
					</div>
					<div className="flex items-center gap-2">
						<button className="border-primary p-2 border rounded">
							<AiFillSetting />
						</button>
						<button className="border-primary p-2 border rounded">
							<VscDebugStart />
						</button>
						<button
							onClick={() => props.setOpenModal('dismissible')}
							className="bg-primary flex items-center justify-center gap-2 p-2 text-white rounded"
						>
							<AiFillSave />
							<span className="text-sm font-semibold">Xuất bản</span>
						</button>
					</div>
				</div>
			</div>
			<Modal
				dismissible
				show={props.openModal === 'dismissible'}
				onClose={() => props.setOpenModal(undefined)}
			>
				<Modal.Body>
					<div className="grid w-full grid-cols-2 gap-5">
						<div className="">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
							nemo voluptatum, accusamus quisquam minus praesentium illum
							exercitationem recusandae perferendis fugiat laborum iste nostrum
							eius aspernatur ut obcaecati? Commodi, quas aliquid.
						</div>
						<div className="flex items-center justify-center">
							<div className="h-[284px] w-[284px] text-[#818181] bg-[#F9F9F9] flex justify-center items-center rounded-lg border-solid">
								<BsPlusSquareFill size={36} />
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Header;
