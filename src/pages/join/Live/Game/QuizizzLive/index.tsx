import { BsCheck2All, BsLink45Deg, BsThreeDotsVertical } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FaUsers } from 'react-icons/fa'
import { FiCopy } from 'react-icons/fi'
import Header from '../components/Header'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

const QuizizzLive = () => {
  const { id: roomId } = useParams()
  const navigate = useNavigate()
  const { user, userIdKickGame } = userStore((state) => state)
  const { quizizzExam } = useQuizizzExamStore((state) => state)
  const socket = useSocket()
  const [copySuccess, setCopySuccess] = useState(false)
  useEffect(() => {
    if (!socket) return
    /* gửi id phòng quiz đang chơi lên server */
    socket.emit('joinRoom', { roomId: roomId, useId: user._id })
  }, [socket])
  const [isKickOutGame, setIsKickOutGame] = useState<boolean>(false)
  const handleKickGame = (id?: string) => {
    userStore.setState({ userIdKickGame: id })
    setIsKickOutGame(!isKickOutGame)
  }
  const handleKickOutGame = (id: string) => {
    if (id) {
      socket.emit('kickOutGame', { roomId: roomId, idPlayer: id })
      setIsKickOutGame(false)
    }
  }
  const handleCopyClick = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2500)
  }
  /* nhận bài thi */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (data: IQuizizzExam) => {
      if (data) {
        useQuizizzExamStore.setState({ quizizzExam: data })
      }
    })
  }, [socket])
  return (
    <div
      style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
      className='select-none min-h-screen bg-center bg-cover bg-no-repeat w-full text-white -z-10'
    >
      <Header />
      <div className='min-h-screen flex items-center justify-center'>
        <div className='py-4 text-center w-full text-white max-w-lg mt-7 shadow bg-gradient-to-b from-[#414141] to-[#050505] rounded-xl'>
          <h2 className='mb-4'>Để làm quiz này</h2>
          <div className='text-center h-full'>
            <div className='mb-3'>
              <p className='text-sm mb-2 font-semibold'>1. Sử dụng bất kỳ thiết nào để mở</p>
              <div className='bg-white px-2 py-1 flex items-center rounded-lg w-full max-w-xs mx-auto'>
                <span className='flex-1 text-black font-bold text-xl'>
                  join my{' '}
                  <span className='hover:underline' onClick={() => navigate(`/`)}>
                    quiz.com
                  </span>
                </span>
                <span className='text-black cursor-pointer h-[50px] w-[50px] bg-[#E6E6E6] rounded-lg flex items-center justify-center'>
                  <FiCopy />
                </span>
              </div>
            </div>
            <div className='mb-3'>
              <p className='text-sm mb-2 font-semibold'>2. Nhập mã trò chơi</p>
              <div className='bg-white px-2 py-1 flex items-center rounded-lg w-full max-w-xs mx-auto'>
                <span className='flex-1 text-black font-bold tracking-widest text-2xl'>{quizizzExam.code}</span>
                <div className={`${copySuccess ? 'tooltip tooltip-right' : ''}`} data-tip='Đã sao chép mã trò chơi'>
                  <span
                    onClick={() => handleCopyClick(quizizzExam.code)}
                    className='text-black cursor-pointer h-[50px] w-[50px] bg-[#E6E6E6] rounded-lg flex items-center justify-center'
                  >
                    {copySuccess ? <BsCheck2All /> : <FiCopy />}
                  </span>
                </div>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute h-[1px] w-1/4 left-[33%] -translate-x-1/2 bg-white top-[55%] -translate-y-1/2'></div>
              <div className='absolute h-[1px] w-1/4 left-[67%] -translate-x-1/2 bg-white top-[55%] -translate-y-1/2'></div>
              <div className=''>or</div>
            </div>

            <div className='border rounded-lg bg-[#2D2338] text-white p-3 flex gap-3 items-center max-w-[264px] mt-2 mx-auto w-full'>
              <img src='https://cf.quizizz.com/image/QRCODE.png' alt='qr' className='h-8 w-8 rounded object-cover' />
              <h2 className=''>Tham gia qua mã QR</h2>
            </div>

            <p className='my-3'>hoặc chia sẻ thông qua ...</p>

            <div className='grid grid-cols-4 gap-2 justify-center items-center w-full max-w-xs mx-auto'>
              <div className='w-11 h-11 rounded-full bg-[#393939] cursor-pointer flex items-center justify-center'>
                <BsLink45Deg />
              </div>
              <div className='w-11 h-11 rounded-full bg-[#393939] cursor-pointer flex items-center justify-center'>
                <img
                  src='https://edu.google.com/images/classroom/classroom-icon/hero_logo.png'
                  alt='classroom'
                  className='h-[18px] w-[18px] object-contain'
                />
              </div>
              <div className='w-11 h-11 rounded-full bg-[#393939] cursor-pointer flex items-center justify-center'>
                <img
                  src='https://cf.quizizz.com/img/icons/msteams_logo.png'
                  alt='teams'
                  className='h-[18px] w-[18px] object-contain'
                />
              </div>
              <div className='w-11 h-11 rounded-full bg-[#393939] cursor-pointer flex items-center justify-center'>
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative'>
        <div className='bg-[#024F76] bg-opacity-30 h-10 w-full absolute top-0 left-0'></div>
        <div className='absolute -top-5 left-5 border bg-[#090909] font-bold flex gap-2 justify-center items-center rounded-lg py-2 px-4 text-2xl'>
          <span>
            <FaUsers />
          </span>
          <span className='text-lg'>{quizizzExam?.players?.length}</span>
        </div>
        <div className='absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary font-bold cursor-pointer h-[60px] flex justify-center items-center rounded-lg w-[240px] text-2xl'>
          Bắt đầu
        </div>
      </div>

      <div className='min-h-[50vh] h-full flex items-center justify-center'>
        {/* <p className=''>Chờ người tham gia tham gia...</p> */}
        <div className='py-10 w-full mx-auto max-w-5xl xl:max-w-7xl grid px-10 grid-cols-5 gap-10 mt-10'>
          {quizizzExam &&
            quizizzExam?.players?.length > 0 &&
            quizizzExam?.players?.map((player) => {
              return (
                <div
                  key={player._id}
                  className='group/item border border-gray-200 p-4 rounded-xl flex items-center gap-3 relative'
                >
                  <img src={`${player.avatar}`} alt='logo' className='h-10 w-10 rounded-full object-cover' />
                  <h2 className='lowercase font-semibold'>{player.nameInGame}</h2>
                  <div
                    onClick={() => handleKickGame(player._id)}
                    className='hidden absolute top-0 rounded-xl bg-[#EC0B43] w-fit text-white group-hover/item:flex justify-center items-center left-0 h-full cursor-pointer'
                  >
                    <p className='text-center'>Nhấn vào đây để xóa người chơi</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {isKickOutGame && (
        <div className='duration-500 transition-all fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-center justify-center'>
          <div className='w-full max-w-lg'>
            <p className='text-[40px] text-center font-medium'>Bạn có chắc chắn muốn xóa người chơi này?</p>
            <div className='flex justify-between items-center mt-4'>
              <p
                onClick={() => handleKickOutGame(userIdKickGame)}
                className='text-[36px] text-[#FF2E47] font-semibold cursor-pointer w-fit'
              >
                Có
              </p>
              <p
                onClick={() => handleKickGame()}
                className='text-[36px] text-[#45CB85] font-semibold cursor-pointer w-fit'
              >
                Không
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizizzLive
