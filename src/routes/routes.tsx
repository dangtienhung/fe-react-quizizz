import { Navigate, Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'

import CreateByMe from '@/pages/admin/Quiz/CreateByMe'
import CreateQuestion from '@/pages/admin/Quiz/CreateQuestion'
import HomePage from '@/pages/home'
import LayoutAdmin from '@/layouts/LayoutAdmin'
import LiveMutiple from '@/pages/admin/Quiz/Game/LiveMutiple'
import LoppyGame from '@/pages/join/Live/Game/Loppy'
import MyLibrary from '@/pages/admin/MyLibrary'
import PreGameLive from '@/pages/join/Live/PreGame'
import PreQuiz from '@/pages/join/Quiz'
import Presentation from '@/pages/admin/Presentation'
import QuizEdit from '@/pages/admin/Quiz/Edit'
import QuizLists from '@/pages/admin/Quiz/Lists/Lists'
import QuizizzGame from '@/pages/join/Game'
import QuizizzLive from '@/pages/join/Live/Game/QuizizzLive'
import Setting from '@/pages/join/Setting/Setting'
import Toppic from '@/pages/join/Topic'
import { useEffect } from 'react'
import { userStore } from '@/store/userStore'

const PrivateRoute = ({ isAuth }: any) => {
  const { user } = userStore((state) => state)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user._id) {
      navigate('/')
    }
  }, [isAuth])

  return user._id ? <Outlet /> : <Navigate to='/' />
}

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/register', element: 'register' },
  {
    path: '/join',
    element: <PrivateRoute />,
    children: [
      { index: true, element: <Navigate to='/' /> },
      { path: 'topic/:id', element: <Toppic /> },
      { path: 'quiz/:id', element: <PreQuiz /> },
      { path: 'game/:id', element: <QuizizzGame /> },
      { path: 'settings', element: <Setting /> },
      { path: 'pre-game/running/:id/start', element: <PreGameLive /> },
      { path: 'game/loppy/:id', element: <LoppyGame /> }
    ]
  },
  {
    path: '/admin',
    element: <PrivateRoute />,
    children: [
      { index: true, element: <Navigate to='my-library' /> },
      { path: 'my-library', element: <LayoutAdmin />, children: [{ index: true, element: <MyLibrary /> }] },
      {
        path: 'quiz',
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <Navigate to='/admin/my-library' /> },
          { path: ':id', element: <CreateByMe /> }
        ]
      },
      {
        path: 'quiz',
        children: [
          { path: 'lists/:id', element: <QuizLists /> },
          { path: 'edit/:id', element: <QuizEdit /> },
          { path: 'questions/create/:id', element: <CreateQuestion /> },
          { path: 'game-live/:id', element: <QuizizzLive /> },
          { path: 'startV4/:id', element: <LiveMutiple /> }
        ]
      },
      {
        path: 'presentation',
        children: [
          { index: true, element: <Navigate to='/admin/my-library' /> },
          { path: ':id', element: <Presentation /> }
        ]
      }
    ]
  }
])
