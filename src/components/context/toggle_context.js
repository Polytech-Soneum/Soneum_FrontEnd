import React, { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
    const [isOn, setIsOn] = useState(false);

    const toggleTranslation = () => {
        setIsOn(prevState => !prevState);
    };

    return (
        <ToggleContext.Provider value={{ isOn, toggleTranslation }}>
            {children}
        </ToggleContext.Provider>
    );
};
