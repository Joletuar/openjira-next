import { DragEvent, FC, useContext, useMemo } from 'react';

import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

import { List, Paper } from '@mui/material';
import { EntryStatus } from '@/interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, updatedEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    // Filtramos las entradas por el estado que recibimos
    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),

        [entries]
    );

    // Funcion que se ejecuta en el momento que un elemento arrastrado ingresa al componente
    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        // Obtenemos el id que la entrada que se arrastró dentro del componente
        const id = e.dataTransfer.getData('text');

        // Recuperamos esa entrada
        const entry = entries.find((ent) => ent._id === id)!;

        // Actualizamos el estado de la entrada con el estado de la lista/componente en el que ingreso
        entry.status = status;

        // Actualizamos el estado de entrada
        updatedEntry(entry);

        // Especificamos que el drag terminó
        endDragging();
    };

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        // TODO: aqui haremos drop

        <div
            // Captura info sobre el evento
            onDrop={onDropEntry}
            // Permite que se pueda dejar caer algun elemento
            onDragOver={allowDrop}
            // Aplicamos los estilos
            className={isDragging ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    paddingX: 1,
                }}
            >
                {/* TODO: cambiará dependiendo si esto está haciendo drag o no */}
                <List
                    sx={{
                        opacity: isDragging ? 0.4 : 1,
                        transition: 'all .35s',
                    }}
                >
                    {entriesByStatus.map((entrada) => (
                        <EntryCard entrada={entrada} key={entrada._id} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
