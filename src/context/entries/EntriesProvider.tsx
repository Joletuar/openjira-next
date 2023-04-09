import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();

    // Función para agregar una nuev tarea

    const addNewEntry = async (description: string) => {
        // Hacemos la request hacia el endpoint para insertar una nueva entry

        const { data } = await entriesApi.post<Entry>('/entries', {
            description,
        });

        dispatch({ type: '[Entry] - Add-Entry', payload: data });
    };

    // Función para actualizar el estado de una tarea

    const updatedEntry = async (
        { _id, description, status }: Entry,
        showSnackbar: boolean = false
    ) => {
        // Usamos un try-catch, porque si la respuesta es 400 o 500 axios lanza una excepción

        try {
            // Petición hacia el endpoint de actualización

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description: description,
                status: status,
            });

            dispatch({ type: '[Entry] - Updated-Entry', payload: data });

            // TODO: mostrar snackbar

            if (showSnackbar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
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

    // Función encargada de eliminar una entry en la bd

    const deleteEntry = async (_id: string, showSnackbar: boolean = false) => {
        // Realizamos la operación de eliminar

        try {
            const entryDeleted = await entriesApi.delete<Entry>(
                `/entries/${_id}`
            );

            dispatch({ type: '[Entry] - Delete-Entry', payload: _id });

            if (showSnackbar) {
                enqueueSnackbar('Entrada Eliminada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        }
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
                deleteEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
