import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { userApi } from '@shared/shared/api/user';
import { Layout } from '@shared/widgets/layout';

const schema = z
  .object({
    username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
    email: z.string().email('Введите корректный email'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    confirmPassword: z.string().min(8, 'Подтверждение пароля должно содержать минимум 8 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'], // Указывает поле для отображения ошибки
  });

type FormData = z.infer<typeof schema>;

export const SignUp = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await userApi.registration(data);
      router.push('/sign-in');
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ margin: 2, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {serverError && <Box sx={{ color: 'red', textAlign: 'center' }}>{serverError}</Box>}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <TextField
            label="Имя пользователя"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />

          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Пароль"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <TextField
            label="Подтвердите пароль"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
