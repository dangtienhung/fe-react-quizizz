import { BsArrowLeftShort, BsCheckSquare } from 'react-icons/bs';

import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="h-14 p-2 bg-[#381535] text-white">
			<div className="flex items-center justify-between h-full">
				<Link className="inline-block" to="/admin/quiz/edit/quizEditId">
					<div className="bg-[#60445D] cursor-pointer flex rounded py-2 px-3 justify-center items-center gap-1">
						<BsArrowLeftShort />
						<span className="text-sm">Quay lại</span>
					</div>
				</Link>
				<div>
					<details className="dropdown">
						<summary className="m-1 btn">open or close</summary>
						<ul className="p-2 shadow bg-white menu dropdown-content z-[1] rounded-box w-full">
							<li>
								<a className="text-primary font-semibold">
									<BsCheckSquare />
									<span>Đa lựa chọn</span>
								</a>
							</li>
							<li>
								<a className="text-primary font-semibold">
									<BsCheckSquare />
									<span>Đa lựa chọn</span>
								</a>
							</li>
						</ul>
					</details>
				</div>
			</div>
		</div>
	);
};

export default Header;
