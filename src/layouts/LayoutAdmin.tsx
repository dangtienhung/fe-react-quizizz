import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from '../pages/admin/components/Header'
import Sidebar from '../pages/admin/MyLibrary/components/Sidebar'

interface LayoutAdminProps {
  children?: React.ReactNode
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  const [searchParams] = useSearchParams()
  const [, setCreateByMe] = useState<boolean>(false)
  useEffect(() => {
    const type = searchParams.get('createByMe')
    if (type) {
      setCreateByMe(true)
    }
  }, [searchParams])
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 bg-[#F2F2F2]'>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutAdmin
