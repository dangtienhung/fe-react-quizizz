import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FaUsers } from 'react-icons/fa'
import Header from '@/pages/join/components/Header'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

const LoppyGame = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const socket = useSocket()
  const { user } = userStore((state) => state)
  const [ísKickOutGame, setIsKickOutGame] = useState<boolean>(false)
  const { quizizzExam } = useQuizizzExamStore((state) => state)
  useEffect(() => {
    if (!socket) return
    /* gửi id phòng quiz đang chơi lên server */
    socket.emit('joinRoom', { roomId: id, useId: user._id })
  }, [socket])
  /* nhận bài thi */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (examQuiz: IQuizizzExam) => {
      if (examQuiz) {
        useQuizizzExamStore.setState({ quizizzExam: examQuiz })
      }
    })
  }, [socket])
  /* nhận sự kiện admin kích người chơi ra khỏi phòng thi */
  useEffect(() => {
    if (!socket) return
    socket.on('outGame', (data: string) => {
      if (data === user._id) {
        setIsKickOutGame(true)
      }
    })
  }, [socket])
  return (
    <>
      <div
        style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
        className='select-none min-h-screen bg-center bg-cover bg-no-repeat w-full text-white -z-10'
      >
        <Header />
        <div className='border-b mb-8'>
          <div className='mx-auto max-w-xl flex items-center bg-[#00212e] justify-between p-5 rounded-xl'>
            <div className='flex items-center gap-3'>
              <img
                src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster23.png?w=90&h=90'
                alt='logon'
                className='h-10 w-10 rounded-full bg-cover'
              />
              <div className=''>
                <h2 className='font-bold text-2xl'>
                  {quizizzExam?.players?.find((player) => player._id === user._id)?.nameInGame}
                </h2>
                <span className='border bg-[#333333] rounded p-[1px] text-[10px] px-1'>you</span>
              </div>
            </div>
            <div className='text-center'>
              <p className='text-[#a3a8a8] font-bold text-base'>Join Game</p>
              <p className='text-2xl font-bold tracking-widest'>{quizizzExam.code}</p>
            </div>
          </div>
          <div className='mt-10 mb-6 mx-auto max-w-xl flex justify-between items-center'>
            <p className='text-base font-semibold'>Waiting for the host to start...</p>
            <div className='border bg-[#333] w-fit rounded-md border-white flex gap-2 items-center px-3 py-1'>
              <span>
                <FaUsers />
              </span>
              <span>{quizizzExam?.players?.length}</span>
            </div>
          </div>
        </div>
        <div className='py-10 w-full mx-auto max-w-5xl xl:max-w-7xl grid px-10 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {quizizzExam?.players?.map((player) => {
            return (
              <div key={player._id} className='border border-gray-200 p-4 rounded-xl flex items-center gap-3'>
                <img src={player.avatar} alt={player.name} className='h-10 w-10 rounded-full object-cover' />
                <h2 className='lowercase font-semibold'>{player.nameInGame}</h2>
              </div>
            )
          })}
        </div>
      </div>
      {ísKickOutGame && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-80 text-white'>
          <div className='text-center flex items-center justify-center flex-col gap-5'>
            <img src='https://cf.quizizz.com/game/img/ui/invalid_game.png' alt='' />
            <h2 className='text-lg font-semibold'>You were kicked out of game</h2>
            <p className='text-[#519900] cursor-pointer font-bold text-xl' onClick={() => navigate(`/`)}>
              Back To Home
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default LoppyGame
