import { NextPage } from 'next';
import { Layouts } from '@/components/layouts';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { EntryList, NewEntry } from '@/components/ui';

const HomePage: NextPage = () => {
    return (
        <Layouts title='Home - OpenJira'>
            <Grid container spacing={2}>
                {/* Cuando se tiene un grid item por defecto tomará el tamaño del
                hijo */}

                {/* Listado de tareas pendiente */}

                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: 'calc(100vh - 100px)',
                        }}
                    >
                        <CardHeader title='Pendiente' />

                        {/* Agregar Entradas */}
                        <NewEntry />
                        {/* Listado de Entrada */}
                        <EntryList status='Pending' />
                    </Card>
                </Grid>

                {/* Listado de tareas en progeso */}

                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: 'calc(100vh - 100px)',
                        }}
                    >
                        <CardHeader title='En Progreso' />
                        <EntryList status='In-Progress' />
                    </Card>
                </Grid>

                {/* Listado de tareas completadas */}

                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            height: 'calc(100vh - 100px)',
                        }}
                    >
                        <CardHeader title='Completadas' />
                        <EntryList status='Finished' />
                    </Card>
                </Grid>
            </Grid>
        </Layouts>
    );
};

export default HomePage;
