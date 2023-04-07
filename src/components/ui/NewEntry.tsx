import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export const NewEntry = () => {
    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            <Button
                startIcon={<AddCircleOutlinedIcon />}
                fullWidth
                variant='outlined'
            >
                Agregar Tarea
            </Button>

            <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                helperText='Ingrese un valor'
            />

            <Box display='flex' justifyContent='space-between'>
                <Button
                    variant='outlined'
                    color='secondary'
                    endIcon={<SaveOutlinedIcon />}
                >
                    Guardar
                </Button>
                <Button variant='outlined' color='error'>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};
