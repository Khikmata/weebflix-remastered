import { BACKEND_BASE_URL } from '@components/shared/Constants/Constants'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodType, z } from 'zod'
import styles from '../AuthModal.styles.module.scss'

type RegisterFormData = {
  username: string
  password: string
  confirmPassword: string
}

const toastSettings = {}

export const Register = () => {
  const RegisterSchema: ZodType<RegisterFormData> = z
    .object({
      username: z.string().min(3).max(18),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  })

  const handleFormSubmit = async (data: RegisterFormData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const toastRegister = toast.loading('pending...', {
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
        .post(
          BACKEND_BASE_URL + 'auth/register',
          {
            username: data.username,
            password: data.password,
          },
          config,
        )
        .then(() => {
          toast.update(toastRegister, {
            render: 'You are now registered, you can now login',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          })
        })
        .catch((err) => {
          toast.update(toastRegister, {
            render: `${err.response.data.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 4000,
          })
        })
    } catch (err: any) {
      toast.update(toastRegister, {
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
      <label>Повторите пароль</label>
      <input
        className={styles['form-input']}
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      <input className={styles['form-button']} type="submit" />
    </form>
  )
}
