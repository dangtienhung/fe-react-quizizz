import { FaUserCircle, FaUserEdit } from 'react-icons/fa'

import { IUser } from '@/interfaces/user.type'
import { IoIosArrowForward } from 'react-icons/io'
import LayoutDefault from '../../../layouts/LayoutDefault'
import SettingContainer from './components/SettingContainer'
import { userStore } from '@/store/userStore'

const info = [
  { title: 'Hình đại diện', content: 'parry pirate' },
  { title: 'Hình đại diện', content: 'parry pirate' }
]

const Setting = () => {
  const { user } = userStore((state) => state)
  return (
    <LayoutDefault>
      <div className='md:p-0 flex-1 p-2'>
        <h1 className='my-3 text-2xl font-medium text-center'>Cài đặt</h1>
        <SettingContainer title='Hồ sơ' info={info} icon={<FaUserEdit color='#EFA929' />} />
        <div className='rounded-xl w-full max-w-xl p-4 mx-auto mb-5 bg-white shadow'>
          <div className='flex items-center gap-2 mb-2'>
            <span>
              <FaUserCircle color='#D5546D' />
            </span>
            <span className='text-[#AAC7E7]'>Cài đặt tài khoản</span>
          </div>
          <div className=''>
            <div className='flex items-center justify-between mb-3 select-none'>
              <div className='flex-1 cursor-pointer'>
                <h3 className='text-lg font-medium'>Cập nhật mật khẩu</h3>
              </div>
              <span>
                <IoIosArrowForward />
              </span>
            </div>
            <div className='flex items-center justify-between mb-3 select-none'>
              <div className='flex-1 cursor-pointer'>
                <h3 className='text-lg font-medium'>Xóa tài khoản</h3>
              </div>
              <span>
                <IoIosArrowForward />
              </span>
            </div>
            <div
              className='flex items-center justify-between mb-3 select-none'
              onClick={() => {
                if (user) {
                  userStore.setState({ user: {} as IUser })
                  localStorage.removeItem('user')
                }
              }}
            >
              <div className='flex-1 cursor-pointer'>
                <h3 className='text-lg font-medium'>Đăng xuất</h3>
              </div>
              <span>
                <IoIosArrowForward />
              </span>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  )
}

export default Setting
