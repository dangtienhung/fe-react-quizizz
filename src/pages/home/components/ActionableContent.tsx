import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Variant } from '..';
import { userStore } from '../../../store/userStore';

interface ActionableContentProps {
	handleOpenModal: (placement: Variant) => void;
}

const ActionableContent = ({ handleOpenModal }: ActionableContentProps) => {
	const { user } = userStore((state) => state);
	return (
		<div className="lg:p-7 p-4">
			<div className="gap-7 flex items-center justify-between">
				<div className="w-full lg:w-[70%] bg-white rounded-2xl shadow-md md:py-[68px] md:px-[20px] md:h-[215px] flex justify-center items-center">
					<form className="flex md:flex-row flex-col items-center justify-center gap-2 rounded-2xl bg-[#f4f4f5] border-2 border-[#ccc] md:p-4 p-1 w-[532px]">
						<input
							type="text"
							className="rounded-xl flex-1 w-full px-4 py-3 text-xl font-medium bg-white border-none outline-none"
							style={{
								boxShadow:
									'inset 2px 2px 2px #cccccc, inset -2px -2px 2px #f4f4f4',
							}}
							placeholder="Nhập mã tham gia"
						/>
						<button className="md:w-fit bg-primary btn hover:bg-primary w-full text-white">
							Tham gia
						</button>
					</form>
				</div>
				<div className="hidden lg:w-[30%] p-4 bg-white rounded-2xl flex-col shadow-md h-[215px] lg:flex justify-center items-center">
					{Object.keys(user).length === 0 ? (
						<>
							<div className="mb-5">
								<img
									src={
										'https://images.careerbuilder.vn/content/images/cung-bach-duong-CareerBuilder-4.jpg'
									}
									alt="Picture of the author"
									className="h-[80px] w-[80px] rounded-full object-cover"
									height={80}
									width={80}
								/>
							</div>
							<div className="">
								<p className="text-center">
									<span
										className="text-primary font-bold underline cursor-pointer"
										onClick={() => handleOpenModal('REGISTER')}
									>
										Đăng ký
									</span>
									<span> Bây giờ để mở khóa hình đại diện của riêng bạn</span>
								</p>
							</div>
						</>
					) : (
						<>
							<div className="">
								<div className="mb-5 text-center">
									<img
										src={user.avatar}
										alt="Picture of the author"
										className="h-[80px] w-[80px] rounded-full object-cover mx-auto"
										height={80}
										width={80}
									/>
								</div>
								<div className="">
									<h2 className="text-xl font-bold text-center truncate">
										{user.name}
									</h2>
									<div className="flex items-center justify-around gap-3 mt-2">
										<Link
											to={`/join/settings`}
											className="inline-block text-xs text-[#EFA959]"
										>
											Chỉnh sửa hồ sơ
										</Link>
										<div className="h-1 w-1 rounded-full bg-[#EFA959]"></div>
										<Link
											to={`/join/actives`}
											className="inline-block text-xs text-[#EFA959]"
										>
											Xem hoạt động
										</Link>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ActionableContent;
