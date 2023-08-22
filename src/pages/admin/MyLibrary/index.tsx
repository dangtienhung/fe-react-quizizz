import LayoutOutLibrary from '../layouts/LayoutOutLibrary'
import ListQuizizz from './components/ListQuizizz'
import SidebarMyLibrary from './components/SidebarMyLibrary'

const MyLibrary = () => {
  return (
    <LayoutOutLibrary>
      <div className='p-8'>
        <div className=''>
          <h2 className='text-xl font-bold text-[#424242] mb-5'>Thư viện của tôi</h2>
        </div>
        <div className='flex gap-4'>
          <SidebarMyLibrary />
          <ListQuizizz />
        </div>
      </div>
    </LayoutOutLibrary>
  )
}

export default MyLibrary
