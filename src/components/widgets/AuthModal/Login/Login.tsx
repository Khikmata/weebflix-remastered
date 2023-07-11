import { zodResolver } from '@hookform/resolvers/zod'
import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import axios from 'axios'
import { useAppDispatch } from 'hooks/redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodType, z } from 'zod'
import styles from '../AuthModal.styles.module.scss'
import { BACKEND_BASE_URL } from '@components/shared/Constants/Constants'

type LoginFormData = { username: string; password: string }

const LoginSchema: ZodType<LoginFormData> = z.object({
  username: z.string().min(3).max(18),
  password: z.string().min(5).max(20),
})

interface LoginProps {
  handleClose: () => void
}

export const Login = ({ handleClose }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })
  const dispatch = useAppDispatch()
  const handleFormSubmit = async (data: LoginFormData) => {
    const id = toast.loading('pending...', {
      position: 'bottom-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    try {
      await axios
        .post(BACKEND_BASE_URL + 'auth/login', {
          username: data.username,
          password: data.password,
        })
        .then((res) => {
          const userData = res.data
          window.localStorage.setItem('token', userData.token)
          dispatch(authModalAction.authUser(userData.token))
          toast.update(id, {
            render: 'You are now logged in',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          })
          handleClose()
        })
        .catch((err) => {
          toast.update(id, {
            render: `${err.response.data.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 4000,
          })
        })
    } catch (err: any) {
      toast.update(id, {
        render: `Connection error`,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles['auth-form']}
    >
      <label>Никнейм</label>
      <input
        className={styles['form-input']}
        type="text"
        {...register('username')}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <label>Пароль</label>
      <input
        className={styles['form-input']}
        type="password"
        {...register('password')}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input className={styles['form-button']} type="submit" />
    </form>
  )
}
