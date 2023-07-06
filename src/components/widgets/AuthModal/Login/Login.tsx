import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import styles from '../AuthModal.styles.module.scss'
import { toastError, toastSuccess } from '../Helpers/Toasts'

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

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      const BASE_URL = 'http://localhost:4001/auth'
      const response = await axios.post(BASE_URL + '/login', {
        username: data.username,
        password: data.password,
      })
      const userData = response.data
      window.localStorage.setItem('token', userData.token)
      toastSuccess('Login successful')
      handleClose()
    } catch (error: any) {
      toastError(error.message)
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
