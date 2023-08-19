import * as yup from 'yup';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IRegister } from '../../interfaces/user.type';
import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import Menu from './components/Menu';
import SocialButton from './components/SocialButton';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { userStore } from '../../store/userStore';
import { yupResolver } from '@hookform/resolvers/yup';

type Variant = 'LOGIN' | 'REGISTER';

const schema = yup
	.object({
		name: yup.string().default(''),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(20).required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

interface HeaderProps {
	handleOpenModal: (placement: Variant) => void;
}

export default function Header({ handleOpenModal }: HeaderProps) {
	const {
		registerAuth,
		loginAuth,
		errors: errorList,
		user,
	} = userStore((state) => state);
	return (
		<>
			<div className="h-14 flex md:justify-start justify-between items-center w-full px-4 bg-white md:border-b-2 border-b border-b-[e4e4e4]">
				<Logo />
				<Menu />
				<div className="md:flex items-center hidden gap-4">
					{Object.keys(user).length === 0 ? (
						<>
							<button
								className="btn bg-gray-1 font-bold text-black"
								onClick={() => handleOpenModal('REGISTER')}
							>
								Đăng ký
							</button>
							<button
								className="btn bg-primary hover:bg-primary font-bold text-white"
								onClick={() => handleOpenModal('LOGIN')}
							>
								Đăng nhập
							</button>
						</>
					) : (
						<Link to={`/admin/my-library`} className="inline-block">
							<button className="btn bg-gray-1 font-bold text-black">
								<AiOutlinePlusCircle size={24} /> Tạo một bài quizizz
							</button>
						</Link>
					)}
				</div>
			</div>
		</>
	);
}
