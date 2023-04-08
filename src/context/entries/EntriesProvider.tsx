import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description:
                'Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now(),
            status: 'In-Progress',
        },
        {
            _id: uuidv4(),
            description:
                'En Progreso: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now() - 1000000,
            status: 'Pending',
        },
        {
            _id: uuidv4(),
            description:
                'Terminada: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now() - 11000,
            status: 'Finished',
        },
    ],
};

interface Props {
    children?: JSX.Element;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'Pending',
        };

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
    };

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
