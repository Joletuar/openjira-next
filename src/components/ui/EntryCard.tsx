import { FC } from 'react';
import { Entry } from '@/interfaces';

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
    return (
        <Card
            sx={{
                marginBottom: 1,
                // Eventos de drag
            }}
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
