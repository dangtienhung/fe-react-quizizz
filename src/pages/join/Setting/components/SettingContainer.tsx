import React, { useState } from 'react'

import { IoIosArrowForward } from 'react-icons/io'
import { Modal } from 'flowbite-react'

interface SettingContainerProps {
  icon: React.ReactNode
  title: string
  info: { title: string; content?: string }[]
}

export default function SettingContainer({ title, info, icon }: SettingContainerProps) {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }
  return (
    <>
      <div className='rounded-xl w-full max-w-xl p-4 mx-auto mb-5 bg-white shadow'>
        <div className='flex items-center gap-2 mb-2'>
          <span>{icon}</span>
          <span className='text-[#AAC7E7]'>{title}</span>
        </div>
        <div className=''>
          {info.map((item, index) => (
            <div
              className='flex items-center justify-between mb-3 select-none'
              onClick={() => props.setOpenModal('dismissible')}
              key={index}
            >
              <div className='flex-1 cursor-pointer'>
                <h3 className='text-lg font-medium'>{item.title}</h3>
                {item.content && <span className='text-[#AAC7E7]'>{item.content}</span>}
              </div>
              <span>
                <IoIosArrowForward />
              </span>
              <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>{item.title}</Modal.Header>
                <Modal.Body>{item.content && <p>{item.content}</p>}</Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
