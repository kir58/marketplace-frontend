import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'; // Хук для маршрутизации
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { Copyright } from '@shared/shared/ui/Copyright';
import { userApi } from '@shared/shared/api/user';

type SignInFormInputs = {
  username: string;
  password: string;
  remember: boolean;
};

export const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      await userApi.login({ username: data.username, password: data.password });
      router.push(`/profile`);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
            })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          <FormControlLabel
            control={<Checkbox color="primary" {...register('remember')} />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Box display="flex" justifyContent="space-between">
            <Typography component={Link} href="/" sx={{ textDecoration: 'none' }} color="primary">
              Forgot password?
            </Typography>
            <Typography
              component={Link}
              href="/sign-up"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don't have an account? Sign Up
            </Typography>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
