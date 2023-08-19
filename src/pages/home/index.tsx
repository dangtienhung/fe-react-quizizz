import * as yup from 'yup'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'

import ActionableContent from './components/ActionableContent'
import FeatureQuizizz from '../../components/FeatureQuizizz/FeatureQuizizz'
import { IRegister } from '@/interfaces/user.type'
import LayoutDefault from '../../layouts/LayoutDefault'
import SocialButton from '@/components/header/components/SocialButton'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { userStore } from '@/store/userStore'
import { yupResolver } from '@hookform/resolvers/yup'

export type Variant = 'LOGIN' | 'REGISTER'

const schema = yup
  .object({
    name: yup.string().default(''),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required()
  })
  .required()
type FormData = yup.InferType<typeof schema>

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [modalPlacement, setModalPlacement] = useState<string>('center')
  const props = { openModal, setOpenModal, modalPlacement, setModalPlacement }
  const { registerAuth, loginAuth, errors: errorList } = userStore((state) => state)
  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])
  useEffect(() => {
    if (errorList) {
      toast.error(errorList)
    }
    if (openModal === undefined) {
      setVariant('LOGIN')
    }
  }, [errorList])
  const onSubmit = async (data: FormData) => {
    try {
      if (variant === 'REGISTER') {
        await registerAuth(data as IRegister)
        if (errorList !== undefined) {
          setVariant('LOGIN')
          toast.success('Đăng ký thành công')
        }
      } else {
        await loginAuth(data as IRegister)
        if (errorList !== undefined) {
          toast.success('Đăng nhập thành công')
          setOpenModal(undefined)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  /* handle open modal */
  const handleOpenModal = (placement: Variant) => {
    props.setOpenModal('dismissible')
    setVariant(placement)
  }
  return (
    <LayoutDefault handleOpenModal={handleOpenModal}>
      <ActionableContent handleOpenModal={handleOpenModal} />
      <FeatureQuizizz />
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Body className='overflow-hidden'>
          <div className='relative'>
            <div>
              <SocialButton
                className='bg-[#4285f4] text-white'
                title='Tiếp tục với Google'
                imgSrc='https://cf.quizizz.com/img/logos/google-logo-1.png'
              />
              <SocialButton
                className='bg-[white] text-secondary border'
                title='Tiếp tục với Microsoft'
                imgSrc='https://cf.quizizz.com/img/logos/ms-logo.png'
              />
            </div>
            <div className='mt-5'>
              <div className='relative'>
                <span
                  className='h-[2px] w-20 inline-block bg-secondary absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2'
                  style={{ left: '40%' }}
                ></span>
                <span className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2'>Or</span>
                <span
                  className='h-[2px] w-20 inline-block bg-secondary absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
                  style={{ left: '60%' }}
                ></span>
              </div>
              <form className='flex flex-col gap-4 mt-5' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (
                  <div>
                    <div className='block mb-2'>
                      <Label htmlFor='name' value='Name' />
                    </div>
                    <TextInput placeholder='hungdang' {...register('name')} className='w-full' />
                    {errors.name && <span className='text-xs text-red-500'>{errors.name.message}</span>}
                  </div>
                )}
                <div>
                  <div className='block mb-2'>
                    <Label htmlFor='email' value='Your email' />
                  </div>
                  <TextInput placeholder='hungdang@gmail.com' type='email' {...register('email')} className='w-full' />
                  {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}
                </div>
                <div>
                  <div className='block mb-2'>
                    <Label htmlFor='password' value='Your password' />
                  </div>
                  <TextInput
                    type='password'
                    placeholder='password'
                    className='w-full'
                    {...register('password')}
                    name='password'
                  />
                  {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}
                </div>
                <Button type='submit' className='bg-primary text-white text-base capitalize hover:!bg-primary'>
                  {/* <div className="animate-spin border-t-primary w-4 h-4 border-2 border-t-2 border-white rounded-full"></div> */}
                  {variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}
                </Button>
              </form>
              <div className='flex items-center justify-center gap-3 mt-5'>
                <h2 className='text-[#6d6d6d] text-sm'>Không có tài khoản?</h2>
                <button className={`text-primary bg-[#f2eef8] py-[4px] px-[12px] rounded`} onClick={toggleVariant}>
                  {variant === 'LOGIN' ? 'Đăng ký' : 'Đăng nhập'}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </LayoutDefault>
  )
}

export default HomePage
