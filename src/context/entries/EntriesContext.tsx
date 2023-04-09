import { createContext } from 'react';
import { Entry } from '@/interfaces';

export interface ContextProps {
    entries: Entry[];

    // Methods
    addNewEntry: (description: string) => void;
    updatedEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
