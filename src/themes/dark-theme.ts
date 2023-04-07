import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },

    // Aqui podemos editar los estilos de componentes

    components: {
        MuiAppBar: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: {
                    backgroundColor: '#51001f',
                },
            },
        },
    },
});
