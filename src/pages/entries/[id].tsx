import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { Layouts } from '@/components/layouts';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';

const Estados: EntryStatus[] = ['Pending', 'In-Progress', 'Finished'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched]
    );

    const { updatedEntry, deleteEntry } = useContext(EntriesContext);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    };

    const router = useRouter();

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updateEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        };

        updatedEntry(updateEntry, true);

        router.push('/');
    };

    const onDelete = (id: string) => {
        if (!confirm('Está seguro de eliminar')) return;

        deleteEntry(id, true);
        router.replace('/');
    };

    return (
        <Layouts title={inputValue.substring(0, 20) + '...'}>
            <>
                <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Card>
                            <CardHeader
                                title={`Entrada: ${inputValue.substring(
                                    0,
                                    40
                                )} ...`}
                                subheader={
                                    'Creada ' +
                                    dateFunctions.getFormatDistanceNow(
                                        entry.createdAt
                                    )
                                }
                            />

                            <CardContent>
                                <TextField
                                    sx={{ marginTop: 2, marginBottom: 2 }}
                                    fullWidth
                                    placeholder='Nueva Entrada'
                                    autoFocus
                                    multiline
                                    label='Nueva Entrada'
                                    value={inputValue}
                                    onChange={onChangeInput}
                                    helperText={
                                        isNotValid && 'Ingrese un valor'
                                    }
                                    onBlur={() => setTouched(true)}
                                    error={isNotValid}
                                />

                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={status}
                                        onChange={onStatusChange}
                                    >
                                        {Estados.map((estado) => (
                                            <FormControlLabel
                                                value={estado}
                                                control={<Radio />}
                                                label={estado}
                                                key={estado}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>

                                <CardActions>
                                    <Button
                                        variant='contained'
                                        startIcon={<SaveOutlinedIcon />}
                                        fullWidth
                                        onClick={onSave}
                                        disabled={inputValue.length <= 0}
                                    >
                                        Guardar
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <IconButton
                    onClick={() => onDelete(entry._id)}
                    color='error'
                    sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                    }}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </>
        </Layouts>
    );
};

export default EntryPage;

// Obtener las propiedades del servidor, solo corre de la lado del servidor
// Solo se utliza getServerSideProps cuando tu necesitas pre-renderizar
// una pagina en el momento que el usuario hace la petirción

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Obtenemos el parametro de la url
    // console.log(ctx.query);
    // console.log(ctx.params);

    const { id } = ctx.params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // Estás props son enviadas al componente en este punto

    return {
        props: {
            entry,
        },
    };
};
