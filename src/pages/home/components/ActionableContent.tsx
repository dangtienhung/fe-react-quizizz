import * as yup from 'yup'

import { Link, useNavigate } from 'react-router-dom'

import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { Variant } from '..'
import { useForm } from 'react-hook-form'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useState } from 'react'
import { userStore } from '../../../store/userStore'
import { yupResolver } from '@hookform/resolvers/yup'

interface ActionableContentProps {
  handleOpenModal: (placement: Variant) => void
}

const schema = yup.object({
  code: yup.string().required()
})

const ActionableContent = ({ handleOpenModal }: ActionableContentProps) => {
  const navigate = useNavigate()
  const { user } = userStore((state) => state)
  const { getOneQuizExamByCode, isLoading } = useQuizizzExamStore((state) => state)
  const [error, setError] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: { code: string }) => {
    const result = await getOneQuizExamByCode(data.code)
    if (result === undefined || result === null) {
      setError(true)
      return
    }
    navigate(`/join/pre-game/running/${result._id}/start`)
  }
  return (
    <div className='lg:p-7 p-4'>
      <div className='gap-7 flex items-center justify-between'>
        <div className='w-full lg:w-[70%] bg-white rounded-2xl shadow-md md:py-[68px] md:px-[20px] md:h-[215px] flex justify-center items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex relative md:flex-row flex-col items-center justify-center gap-2 rounded-2xl bg-[#f4f4f5] border-2 ${
              errors.code ? 'border-[#EC0B43]' : 'border-[#ccc]'
            } md:p-4 p-1 w-[532px]`}
            autoComplete='off'
          >
            <input
              type='text'
              {...register('code')}
              className='rounded-xl flex-1 w-full px-4 py-3 text-xl font-medium bg-white border-none outline-none'
              style={{
                boxShadow: 'inset 2px 2px 2px #cccccc, inset -2px -2px 2px #f4f4f4'
              }}
              onClick={() => setError(false)}
              placeholder='Nhập mã tham gia'
            />
            <button
              className='md:w-fit bg-primary h-[52px] rounded-xl flex items-center justify-center !flex-shrink-0 hover:bg-primary text-white lg:w-[100px]'
              style={{ boxShadow: '#6c4298 0 4px 0 0' }}
            >
              {!isLoading ? (
                'Tham gia'
              ) : (
                <div className='h-5 w-5 rounded-full border-2 border-white border-t-2 border-t-primary animate-spin'></div>
              )}
            </button>
            {(errors.code || error) && (
              <div
                className='absolute text-sm bg-[#EC0B43] top-full left-1/2 -translate-x-1/2 mt-3 text-white px-4 py-1 rounded'
                role='alert'
              >
                {error ? 'Mã trò chơi không hợp lệ' : 'Vui lòng nhập mã trò chơi hợp lệ'}
              </div>
            )}
          </form>
        </div>
        <div className='hidden lg:w-[30%] p-4 bg-white rounded-2xl flex-col shadow-md h-[215px] lg:flex justify-center items-center'>
          {Object.keys(user).length === 0 ? (
            <>
              <div className='mb-5'>
                <img
                  src={'https://images.careerbuilder.vn/content/images/cung-bach-duong-CareerBuilder-4.jpg'}
                  alt='Picture of the author'
                  className='h-[80px] w-[80px] rounded-full object-cover'
                  height={80}
                  width={80}
                />
              </div>
              <div className=''>
                <p className='text-center'>
                  <span
                    className='text-primary font-bold underline cursor-pointer'
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
              <div className=''>
                <div className='mb-5 text-center'>
                  <img
                    src={user.avatar}
                    alt='Picture of the author'
                    className='h-[80px] w-[80px] rounded-full object-cover mx-auto'
                    height={80}
                    width={80}
                  />
                </div>
                <div className=''>
                  <h2 className='text-xl font-bold text-center truncate'>{user.name}</h2>
                  <div className='flex items-center justify-around gap-3 mt-2'>
                    <Link to={`/join/settings`} className='inline-block text-xs text-[#EFA959]'>
                      Chỉnh sửa hồ sơ
                    </Link>
                    <div className='h-1 w-1 rounded-full bg-[#EFA959]'></div>
                    <Link to={`/join/actives`} className='inline-block text-xs text-[#EFA959]'>
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
  )
}

export default ActionableContent
