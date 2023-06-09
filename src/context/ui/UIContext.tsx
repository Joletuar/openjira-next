import { createContext } from 'react';

export interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    // Methods

    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (payload: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
