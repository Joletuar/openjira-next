import { FC, DragEvent, useContext } from 'react';
import { Entry } from '@/interfaces';

import { UIContext } from '@/context/ui';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';

interface Props {
    entrada: Entry;
}

export const EntryCard: FC<Props> = ({ entrada }) => {
    const { startDragging, endDragging } = useContext(UIContext);

    // Funcion que se ejecuta en el momento que se comienza a arrastrar un elemento
    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        // Seteamos el id en las propiedades el evento para recuperarlo despue
        e.dataTransfer.setData('text', entrada._id);

        startDragging();
    };

    // Funcion que se ejecuta cuando se termina de arrastrar el elemento
    const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
        endDragging();
    };

    return (
        <Card
            sx={{
                marginBottom: 1,
            }}
            // Eventos de drag

            // Activamos drag
            draggable
            // Proceso que indica donde comienza
            onDragStart={onDragStart}
            // Proceso que indica donde termina
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        {entrada.description}
                    </Typography>
                </CardContent>

                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        paddingRight: 2,
                    }}
                >
                    <Typography variant='body2'>Hace 15 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
