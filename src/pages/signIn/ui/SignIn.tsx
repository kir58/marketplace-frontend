import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { userApi } from '@shared/shared/api/user';
import { Layout } from '@shared/widgets/layout';
import { useEffect, useRef, useState } from 'react';
import { Alert } from '@mui/material';
import { AxiosError } from 'axios';

type SignInFormInputs = {
  username: string;
  password: string;
  remember: boolean;
};

export const SignIn = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({ defaultValues: { remember: true } });

  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLFormElement>(null);
  const onSubmit = async (data: SignInFormInputs) => {
    try {
      await userApi.login({
        username: data.username,
        password: data.password,
        remember: data.remember,
      });
      router.push(`/profile`);
    } catch (error) {
      setError((error as AxiosError).message ?? null);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, maxWidth: '500px' }}
        >
          <TextField
            inputRef={ref}
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
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} color="primary" />}
                label="Remember me"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          {error && (
            <Alert severity="error" sx={{ marginY: 1 }}>
              {error}
            </Alert>
          )}
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
    </Layout>
  );
};
