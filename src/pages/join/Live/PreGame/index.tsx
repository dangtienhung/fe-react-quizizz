import * as yup from 'yup'

import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AiFillSound } from 'react-icons/ai'
import Header from '../../components/Header'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import { VscDebugStart } from 'react-icons/vsc'
import { io } from 'socket.io-client'
import { names } from './utils/names'
import { useForm } from 'react-hook-form'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  name: yup.string().required()
})

const PreGameLive = () => {
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const socket = useSocket()
  const [isLoading, setIsLoading] = useState(false)
  const { user, updateNameInGame } = userStore((state) => state)
  const [nameRandom, setNameRandom] = useState(user.name)
  const handleRandomName = useCallback(async () => {
    const randomIndex = Math.floor(Math.random() * names.length)
    setNameRandom(names[randomIndex])
    await updateNameInGame(user._id, nameRandom)
  }, [])
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameRandom(e.target.value)
  }
  const onSubmit = async (data: { name: string }) => {
    /* thay đổi tên người dùng */
    socket.emit('updateName', { userId: user._id, name: nameRandom || data.name })
    /* thêm người dùng vào game */
    socket.emit('addPlayerToExam', { roomId: id, idPlayer: user._id })
    setIsLoading(true)
  }
  useEffect(() => {
    if (socket) {
      socket.on('updateName', (data: string) => {
        if (data) {
          socket.on('quizizzExam', (examQuiz: IQuizizzExam) => {
            if (examQuiz) {
              console.log('🚀 ~ file: index.tsx:62 ~ socket.on ~ examQuiz:', examQuiz)
              useQuizizzExamStore.setState({ quizizzExam: examQuiz })
              navigate(`/join/game/loppy/${examQuiz._id}`)
              setIsLoading(false)
            }
          })
        }
      })
    }
  }, [socket])
  return (
    <>
      <div className='min-h-screen bg-black'>
        <Header />
        <div className='flex justify-between gap-6 p-10 text-white bg-black'>
          <div className='w-[30%]'></div>
          <div className='w-[50%]'>
            <form className='p-6 bg-[#111111] rounded-xl' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <div className=''>
                <h2 className='mb-1 text-sm'>Your Quizizz name is ...</h2>
                <div className='flex bg-white mb-4 rounded-lg items-center h-12'>
                  <div className='flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full'>
                    <img src={`${user.avatar}`} alt='logo' className='w-8 h-8 rounded-full object-cover ml-2' />
                  </div>
                  <input
                    type='text'
                    {...register('name')}
                    className='flex-1 ml-2 border-none rounded-lg px-2 w-full p-2 focus:outline-none focus:!hadow-none outline-none bg-transparent text-secondary font-semibold'
                    style={{ boxShadow: 'none' }}
                    value={'' || nameRandom}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <button className='text-black h-8 w-8 cursor-pointer' onClick={() => handleRandomName()}>
                    <MdOutlinePublishedWithChanges size={20} />
                  </button>
                </div>
              </div>
              {errors.name && (
                <div className='text-sm mb-4 bg-[#EC0B43] mt-3 text-white px-4 py-1 rounded' role='alert'>
                  Không được bỏ trống
                </div>
              )}
              {/* <Link to={`/join/game/loppy/123`} className='inline-block w-full'> */}
              <button
                className='btn shadow-md w-full bg-[#00C985] hover:bg-[#00C985] font-bold outline-none border-none text-white'
                style={{ boxShadow: '#00a06a 0px 4px 0px 0px' }}
              >
                <VscDebugStart size={20} />
                <span>chơi game</span>
              </button>
              {/* </Link> */}
            </form>
            <h2 className='text-secondary mt-5'>Settings</h2>
            <div className='mt-5 p-6 rounded-lg bg-[#111111]'>
              <div className='flex items-center gap-2'>
                <span>
                  <AiFillSound />
                </span>
                <span className='capitalize'>sounds effects</span>
              </div>
            </div>
          </div>
          <div className='w-[20%]'></div>
        </div>
      </div>
      {isLoading && (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white flex items-center justify-center'>
          <div className=''>
            <img
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAM1BMVEUAAABGGkFDGUBFG0JGGkJEG0BAEUBFGkJFG0FGG0JEGkFFGkBFGkJFGkFFGUFGGkJGGkK/4vrcAAAAEHRSTlMA3yBggEAQ77+QcDDPn1CvUygWVAAAAd5JREFUWMPtl92WxBAMgCOJ32rH+z/tzsyeCsOgPWfv9rvFh1Qj4M8wh39ElZ4o9+DDNB3w3cjQRbNKH7iAUMHpTW/u4FIXRysCwzZ9RdFUoFUaovJGQk9gfJogYaOOYKunt3H3zLy7elMRvwnIFoN3wsJMj2YbrYCLLqH57khK7FtPwGWsu5ASQyugPN4b+ALuYvgUYJ5ew4Bgcxx0JUAlARohHV0tONcWZflTgwgkAErGzw2lQMn652y2FFRfcIMlwqfAKDnlS7hSIBFQsApaERQRIFiGK4GeL8AQkX6x4RMDxpaCfb6AQZbJrRYGpO/kv2C/LTjSm+OmIEcUbwrOROhhhB+k2H/+ecE3z4g7k+jolA7Ycg64I5DEqu8JJK+aWwK5Sh2MBAr6FIk8lIKIqF8c9CQwM86TJFYr0LAMyQ5EcOViKW+SO9nFy4wiuHC5HukXagQKr2xAdRJuvFJgHKVAXS9xPJQCnQ24OF6ZSoB6LQ55Ipu7nfEP068pxbwEQLZwrdRNARpBXWyTaR9CStoJegLZRVPuIzlbtBG0gu6Dw+3M7Pdom1dPK5ByfExbzEtQJVAD2mJeorKgsAxCI5gqXDAwFAibj+mDyHqQHDrnFw8+H99x94eBv+IHtOpba7MtAg8AAAAASUVORK5CYII='
              alt=''
              className='bg-transparent text-white animate-spin'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PreGameLive
