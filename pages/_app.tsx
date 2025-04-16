// pages/_app.tsx
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@shared/app/theme';

import { loadCartFromLocalStorage } from '@shared/features/cart';
import { useEffect } from 'react';
import { EffectorNext } from '@effector/next';
import { useUserStore } from '@shared/features/user/model/store';

function MyApp({ Component, pageProps }: AppProps) {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    loadCartFromLocalStorage();
    fetchUser();
  }, []);

  return (
    <EffectorNext values={pageProps.values}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </EffectorNext>
  );
}

export default MyApp;
