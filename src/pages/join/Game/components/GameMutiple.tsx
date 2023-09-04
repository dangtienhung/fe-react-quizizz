import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AnswerResult } from '../interface/answerResult'
import CardGame from './CardGame'
import { EAnswerGame } from '@/interfaces/enum'
import Header from '../../components/Header'
import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import ProgressSibar from './ProgressSibar'
import { calculateScore } from '@/utils/calculateScore'
import { useGameSolo } from '@/store/gameStore'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

const GameMutipleLive = () => {
  const { id: roomId } = useParams()
  const navigate = useNavigate()
  let interval: NodeJS.Timeout
  const { user } = userStore((state) => state)
  const {
    questions: questionList,
    currentQuestion,
    setCurrentQuestion,
    answerResult,
    selectAnswer,
    quizActivityId,
    answers,
    score: scoreResult
  } = useGameSolo((state) => state)
  const socket = useSocket()
  const [timer, setTimer] = useState(30) // Thời gian ban đầu (s)
  const [scoreAnswer, setScoreAnswer] = useState<number>(0)
  const [finish, setFinish] = useState<boolean>(false)
  const [ísKickOutGame, setIsKickOutGame] = useState<boolean>(false)

  /* đếm ngược thời gian */
  useEffect(() => {
    interval = setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timer])
  /* join phòng chơi */
  useEffect(() => {
    if (!socket) return
    socket.emit('joinRoom', { roomId, useId: user._id })
  }, [socket])
  /* nhận bài quiziz */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (data: IQuizizzExam) => {
      if (data) {
        useGameSolo.setState({ questions: data?.questions[0]?.questions })
        if (questionList.length > 0) {
          useGameSolo.setState({ currentQuestion: 0 })
          setTimer(questionList[currentQuestion].timer)
        }
      }
    })
  }, [socket])
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzActivity', (data: IQuizizzExam) => {
      if (data) {
        useGameSolo.setState({ quizActivityId: data._id })
      }
    })
  }, [socket])
  /* sử lý sự kiện chọn đáp án */
  const handleAnswerOptionClick = ({ id, index }: { id: string; index: number }) => {
    // click thì sẽ hủy setTimeout timer đi
    const data = { id, index }
    const scores = calculateScore({ timeElapsed: timer, totalTime: questionList[currentQuestion].timer })
    useGameSolo.setState({ selectAnswer: data })
    socket.emit('answerSubmitted', {
      userId: user._id,
      quizizzExamQuestionId: questionList[currentQuestion]?._id,
      quizizzExamQuestionAnswerId: id,
      score: scores,
      currentQuestion: currentQuestion
    })
  }
  /* nhận câu trả lời đúng */
  useEffect(() => {
    if (!socket) return
    socket.on('answerResult', (data: AnswerResult) => {
      if (data && data.userId === user._id && selectAnswer !== null) {
        useGameSolo.setState({ answerResult: data })
        /* nếu mà trả lời đúng thì cộng điểm câu hỏi đấy vào */
        const scores = calculateScore({ timeElapsed: timer, totalTime: questionList[currentQuestion].timer })
        /* so sánh đáp án người dùng chọn và đáp án server trả về xem có giống nhau không và xử lý logic để thêm vào mảng array answers */
        const answerItem = {
          question: questionList[currentQuestion]._id,
          answerSelect: selectAnswer?.id,
          isCorrect: data.result ? true : false,
          score: data.result ? scores : 0,
          answerResult: data.answer._id
        }
        /* lưu vào danh sách câu trả lời */
        const arrayAnswers = new Set(answers)
        useGameSolo.setState(() => ({
          answers: [...arrayAnswers, answerItem]
        }))
        setTimer(0)
        /* chuyển câu hỏi tiếp theo */
        setTimeout(async () => {
          const nextQuestion = currentQuestion + 1
          if (nextQuestion < questionList.length) {
            setCurrentQuestion(nextQuestion)
            setTimer(questionList[nextQuestion].timer)
          }
          useGameSolo.setState({
            answerResult: null as any,
            selectAnswer: null as any
          })
          if (nextQuestion >= questionList.length) {
            setFinish(true)
            setCurrentQuestion(0)
            useGameSolo.setState({
              answerResult: null as any,
              selectAnswer: null as any
            })
            /* thêm vào db quizizz Activity */
            const body = {
              userId: user._id,
              quizizzExamId: roomId,
              answers: [],
              score: 0,
              answerTypeGame: EAnswerGame.MUTIPLE
            } as {
              userId: string
              quizizzExamId: string
              answers: any[]
              score: number
              answerTypeGame: EAnswerGame
            }
            for (let i = 0; i < answers.length; i++) {
              if (i % 2 === 0) {
                body.answers.push(answers[i])
              }
            }
            if (body.answers.length === questionList.length) {
              /* tính tổng điểm */
              body.score = body.answers.reduce((a, b) => a + b.score, 0)
              socket.emit('addQuizizzActivity', body)
              useGameSolo.setState({ answers: [] })
              useGameSolo.setState({ score: 0 })
            }
          }
        }, 2000)
      }
    })
    return () => {
      socket.off('answerResult')
    }
  }, [socket, selectAnswer, answers])
  useEffect(() => {
    if (!socket) return
    socket.on('outGame', (data: string) => {
      if (data === user._id) {
        setIsKickOutGame(true)
      }
    })
  }, [socket])
  /** nhận activity */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzActivity', (data: IQuizizzActivity) => {
      setTimeout(() => {
        useQuizizzActivityStore.setState({ quizizzActivitie: data })
        useQuizizzActivityStore.setState((state) => ({
          quizizzActivities: [...state.quizizzActivities, data]
        }))
        navigate(`/join/game/${roomId}?type=summary&finish=true`)
      }, 1000)
      socket.disconnect()
    })
  }, [socket])
  return (
    <>
      <div
        style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
        className='-z-10 w-full h-screen text-white bg-center bg-no-repeat bg-cover select-none flex flex-col'
      >
        <ProgressSibar timer={timer} />
        <Header />
        <div className='flex-1 p-2'>
          <div className='bg-transparent h-full rounded-2xl p-2'>
            <div className='h-1/2'>
              <div className='flex items-center justify-center w-full h-full rounded'>
                <h2 className='text-white font-medium text-[30px] text-center lg:mb-0 mb-5'>
                  {questionList[currentQuestion].title}
                </h2>
              </div>
            </div>
            <div
              className={`h-1/2 md:grid-cols-2 lg:grid-cols-${questionList[currentQuestion].questionAnswers.length} xl:grid-cols-${questionList[currentQuestion].questionAnswers.length} grid grid-cols-1 gap-4`}
            >
              {questionList[currentQuestion].questionAnswers.map((answer, index) => {
                if (answerResult === null) {
                  return (
                    <CardGame
                      key={answer._id}
                      card={answer}
                      index={index}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                    />
                  )
                }
                if (selectAnswer && selectAnswer !== null && (answerResult as AnswerResult) && answerResult !== null) {
                  return (
                    <CardGame
                      key={answer._id}
                      card={answer}
                      index={index}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                      answerResult={answerResult}
                      selectAnswer={selectAnswer}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {finish && (
        <div className='opacity-90 fixed top-0 bottom-0 left-0 right-0 z-10 transition-all duration-1000 bg-black select-none'>
          <div className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2'>
            <h2 className='text-4xl font-bold text-white'>Tất cả đã được làm xong</h2>
          </div>
        </div>
      )}
      {ísKickOutGame && (
        <div className='bg-opacity-80 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white bg-black'>
          <div className='flex flex-col items-center justify-center gap-5 text-center'>
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

export default GameMutipleLive
