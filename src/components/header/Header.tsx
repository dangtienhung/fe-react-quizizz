import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Logo from '../logo/Logo'
import Menu from './components/Menu'
import { userStore } from '../../store/userStore'

type Variant = 'LOGIN' | 'REGISTER'

interface HeaderProps {
  handleOpenModal?: (placement: Variant) => void
}

export default function Header({ handleOpenModal }: HeaderProps) {
  const { user } = userStore((state) => state)
  return (
    <>
      <div className='h-14 flex md:justify-start justify-between items-center w-full px-4 bg-white md:border-b-2 border-b border-b-[e4e4e4]'>
        <Logo />
        <Menu />
        <div className='md:flex items-center hidden gap-4'>
          {Object.keys(user).length === 0 ? (
            <>
              <button
                className='btn bg-gray-1 font-bold text-black'
                onClick={() => {
                  handleOpenModal && handleOpenModal('REGISTER')
                }}
              >
                Đăng ký
              </button>
              <button
                className='btn bg-primary hover:bg-primary font-bold text-white'
                onClick={() => {
                  handleOpenModal && handleOpenModal('LOGIN')
                }}
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <Link to={`/admin/my-library`} className='inline-block'>
              <button className='btn bg-gray-1 font-bold text-black'>
                <AiOutlinePlusCircle size={24} /> Tạo một bài quizizz
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
