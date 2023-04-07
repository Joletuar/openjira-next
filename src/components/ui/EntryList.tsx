import { FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryStatus } from '@/interfaces';
import { EntryCard } from './';
import { EntriesContext } from '@/context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),

        [entries]
    );

    return (
        // TODO: aqui haremos drop

        <div>
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    paddingX: 1,
                }}
            >
                {/* TODO: cambiará dependiendo si esto está haciendo drag o no */}
                <List sx={{ opacity: 1 }}>
                    {entriesByStatus.map((entrada) => (
                        <EntryCard entrada={entrada} key={entrada._id} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
