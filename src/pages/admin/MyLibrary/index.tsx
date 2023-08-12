import { AiOutlineBars } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import Sidebar from './components/Sidebar';
import Header from '../components/Header';

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
						<div className="w-full max-w-xs">
							<div className="">
								<div className="flex items-center justify-start gap-3 p-1 mb-1 bg-white rounded">
									<BiSolidUser color="#8854c0" />
									<span>Được tạo bởi tôi</span>
								</div>
								<div className="flex items-center justify-start gap-3 p-1 mb-1 bg-white rounded">
									<BiSolidUser color="#8854c0" />
									<span>Được tạo bởi tôi</span>
								</div>
								<div className="flex items-center justify-start gap-3 p-1 mb-1 bg-white rounded">
									<BiSolidUser color="#8854c0" />
									<span>Được tạo bởi tôi</span>
								</div>
							</div>
						</div>
						<div className="flex-1 w-full">
							<div className="hidden w-full h-full">
								<img
									src="https://cf.quizizz.com/image/emptystate-letscreate.png"
									alt="empty-state"
									className="h-[240px] w-[240px] object-cover mx-auto"
									height={240}
									width={240}
								/>
								<p className="text-center text-[#222] text-sm font-semibold my-2">
									Tạo quiz hoặc bài học đầu tiên của bạn
								</p>
								<p className="my-2 text-sm text-center">
									Pull in questions from the Quizizz library or make your own.
									quick and easy
								</p>
								<div className="mt-8">
									<div className="py-1 text-center px-2 rounded-md bg-primary text-white font-bold w-[200px] mx-auto">
										Tạo 1 bài quizizz
									</div>
								</div>
							</div>
							<div className="w-full h-full">
								<div className="flex flex-col gap-3">
									<div className="flex items-start gap-3 p-2 bg-white rounded shadow cursor-pointer">
										<div className="bg-primary w-[104px] h-[104px] rounded overflow-hidden">
											<img
												src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200"
												alt="ahihi"
												className="object-cover w-full h-full"
												height={104}
												width={104}
											/>
										</div>
										<div className="flex-1">
											<h3 className="">Quiz</h3>
											<h2 className="font-bold truncate text-[#222]">
												Lorem ipsum dolor sit amet.
											</h2>
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-2">
													<AiOutlineBars />
													<span className="">30 câu hỏi</span>
												</div>
											</div>
											<div className="flex items-center justify-between mt-auto">
												<div className="flex items-center gap-3">
													<img
														src="https://genk.mediacdn.vn/2018/8/22/maxresdefault-3-1534914028092859095407.jpg"
														alt="logo"
														className="object-cover w-6 h-6 rounded-full"
														height={24}
														width={24}
													/>
													<span>Đặng Tiến Hưng</span>
												</div>
												<div className="flex items-center h-full">
													<div className="flex gap-1 items-center px-1 py-[1px] bg-primary text-white rounded">
														Chơi
														<IoMdArrowDropdown />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyLibrary;
