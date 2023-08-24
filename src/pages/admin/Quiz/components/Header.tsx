import * as yup from 'yup'

import { AiFillSave, AiFillSetting } from 'react-icons/ai'
import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

import { BsPlusSquareFill } from 'react-icons/bs'
import { IQuizizzs } from '@/interfaces/quizizz.type'
import { VscDebugStart } from 'react-icons/vsc'
import { useForm } from 'react-hook-form'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

interface HeaderProps {
  children?: React.ReactNode
  className?: string
  quizizz?: IQuizizzs
}

const schema = yup.object({
  title: yup.string().required('Tiêu đề không được để trống')
})

const Header = ({ className, quizizz }: HeaderProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  const navigate = useNavigate()
  const { createQuizizzExam } = useQuizizzExamStore((state) => state)
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [title] = useState<string>('')
  const props = { openModal, setOpenModal }

  /* xuất bản chương trình */
  const handlePublish = (data: any) => {
    if (quizizz) {
      setOpenModal(undefined)
      console.log({ title: data.title, questions: [quizizz._id], user: [quizizz.user._id] })
      createQuizizzExam({ title: data.title, questions: [quizizz._id], user: [quizizz.user._id], code: '' })
      navigate('/admin/my-library')
    }
  }
  return (
    <>
      <div
        className={`h-14 w-full z-50 border-b fixed top-0 left-0 right-0 p-2 bg-white shadow flex justify-between items-center ${className}`}
      >
        <div className='p-2 w-[146px] flex justify-center items-center'>
          <Link to={`/`} className='inline-block'>
            <img
              src='https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png'
              alt='logo'
              width={146}
              height={40}
              className='object-cover w-2/3'
            />
          </Link>
        </div>
        <div className='relative flex items-center flex-1'>
          <div className='absolute top-1/2 -translate-y-1/2 -left-6 h-8 w-[2px] z-50 bg-[#B6B6B6]'></div>
          <div className='flex-1'>
            <button
              className='rounded px-2 py-1 font-medium outline-none border-none hover:bg-[#F2F2F2]'
              onClick={() => props.setOpenModal('dismissible')}
            >
              {title === '' ? 'Bài quiz không có tiêu đề' : title}
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <button className='border-primary p-2 border rounded'>
              <AiFillSetting />
            </button>
            <button className='border-primary p-2 border rounded'>
              <VscDebugStart />
            </button>
            <button
              onClick={() => props.setOpenModal('dismissible')}
              className='bg-primary flex items-center justify-center gap-2 p-2 text-white rounded'
            >
              <AiFillSave />
              <span className='text-sm font-semibold'>Xuất bản</span>
            </button>
          </div>
        </div>
      </div>
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Body>
          <form className='grid w-full grid-cols-2 gap-5' onSubmit={handleSubmit(handlePublish)}>
            <div>
              <div className='mb-8'>
                <div className='mb-2 block'>
                  <Label htmlFor='' value='Tiêu đề' />
                </div>
                <TextInput placeholder='Tiêu đề bài biết' {...register('title')} type='text' />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
              </div>
              <div className=''>
                <div className='w-full'>
                  <div className='mb-2 block'>
                    <Label htmlFor='' value='Hiện thị' />
                  </div>
                  <Dropdown
                    label='Công khai hiện thị với mọi người'
                    target='w-full'
                    className=''
                    style={{ width: '100%' }}
                  >
                    <Dropdown.Item value='1' className='w-full'>
                      Công khai, hiện thị với mọi người
                    </Dropdown.Item>
                    <Dropdown.Item value='1' className='w-full'>
                      Riêng tư, chỉ mình tôi
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='h-[284px] w-[284px] text-[#818181] bg-[#F9F9F9] flex justify-center items-center rounded-lg border-solid'>
                <BsPlusSquareFill size={36} />
              </div>
            </div>
            <div></div>
            <Button style={{ width: 'fit-content', marginLeft: 'auto' }} type='submit'>
              Xuất bản
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Header
