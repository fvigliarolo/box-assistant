import { createContext } from "react";
import { useState, useEffect } from "react";

export const EjerciciosContext = createContext([]);

export const EjerciciosProvider = ({ children }) => {
    const [ejercicios, setEjercicios] = useState([]);

    //Datos de prueba
    useEffect(() => {
        const datosDePrueba = [
            {
                nombre: "ejemplo1",
                rounds: '12',
                combinaciones: ['jab', 'cross', 'gancho']
            },
            {
                nombre: "ejemplo2",
                rounds: '8',
                combinaciones: ['jab', 'cross', 'uppercut']
            },
            // puedes agregar más datos de prueba aquí
        ];
    
        setEjercicios(datosDePrueba);
    }, []);

    return (
        <EjerciciosContext.Provider value={[ejercicios, setEjercicios]}>
            {children}
        </EjerciciosContext.Provider>
    )
}