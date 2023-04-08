import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

interface Props {
    children?: JSX.Element;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    // Función para agregar una nuev tarea

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'Pending',
        };

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
    };

    // Función para actualizar el estado de una tarea

    const updatedEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Updated-Entry', payload: entry });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,

                // Methods
                addNewEntry,
                updatedEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
