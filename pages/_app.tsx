// pages/_app.tsx
import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'effector-react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@shared/shared/lib/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from '@shared/app/theme';
import { fork, serialize } from 'effector';
import { initializeEffectorScope } from '@shared/app/initEffector';

// Создаем Emotion кэш для SSR
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const scope = initializeEffectorScope(pageProps.initialEffectorState);
  return (
    <Provider value={scope}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  // Создаем область Effector для инициализации данных
  const scope = fork();

  // Сериализуем состояние области, а не саму область
  const initialEffectorState = serialize(scope);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      initialEffectorState,
    },
  };
};

export default MyApp;
