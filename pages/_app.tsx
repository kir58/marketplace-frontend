// pages/_app.tsx
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@shared/app/theme';
import { withEffectorNext } from '@shared/app/providers/withEffector';
import { loadCartFromLocalStorage } from '@shared/features/cart';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withEffectorNext(MyApp);
