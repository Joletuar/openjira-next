import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '@/themes';

import { UIProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider maxSnack={3}>
            <EntriesProvider>
                <UIProvider>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UIProvider>
            </EntriesProvider>
        </SnackbarProvider>
    );
}
