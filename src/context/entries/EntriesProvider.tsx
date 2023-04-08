import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

// import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children?: JSX.Element;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    // Función para agregar una nuev tarea

    const addNewEntry = async (description: string) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'Pending',
        // };

        // Hacemos la request hacia el endpoint para insertar una nueva entry

        const { data } = await entriesApi.post<Entry>('/entries', {
            description,
        });

        dispatch({ type: '[Entry] - Add-Entry', payload: data });
    };

    // Función para actualizar el estado de una tarea

    const updatedEntry = async ({ _id, description, status }: Entry) => {
        // Usamos un try-catch, porque si la respuesta es 400 o 500 axios lanza una excepción

        try {
            // Petición hacia el endpoint de actualización

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description: description,
                status: status,
            });

            dispatch({ type: '[Entry] - Updated-Entry', payload: data });
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    // Función que permite cargar las entries que están almacenadas en la bd

    const refreshEntries = async () => {
        // Obtenemos todas las entries de la bd
        const resp = await entriesApi.get<Entry[]>('/entries');
        const { data: entriesList } = resp;

        // Realizamos la carga para el front
        dispatch({ type: '[Entry] - Load-Entries', payload: entriesList });
    };

    useEffect(() => {
        refreshEntries();
    }, []);

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
