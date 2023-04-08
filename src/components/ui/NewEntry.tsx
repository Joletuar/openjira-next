import { ChangeEvent, useContext, useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const { addNewEntry } = useContext(EntriesContext);
    const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    };

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {isAddingEntry ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nueva Entrada'
                        autoFocus
                        multiline
                        label='Nueva Entrada'
                        helperText={
                            touched &&
                            inputValue.length <= 0 &&
                            'Ingrese un valor'
                        }
                        error={touched && inputValue.length <= 0}
                        value={inputValue}
                        onChange={onChangeInput}
                        onBlur={() => setTouched(true)}
                    />

                    <Box
                        display='flex'
                        justifyContent='space-between'
                        sx={{ marginBottom: 2 }}
                    >
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => setIsAddingEntry(false)}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddCircleOutlinedIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={() => setIsAddingEntry(true)}
                >
                    Agregar Tarea
                </Button>
            )}
        </Box>
    );
};
