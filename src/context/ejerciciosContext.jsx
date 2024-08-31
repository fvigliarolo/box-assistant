import { createContext, useState, useEffect } from "react";
import { supabase } from "../client";

export const EjerciciosContext = createContext([]);

export const EjerciciosProvider = ({ children }) => {
    const [ejercicios, setEjercicios] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const ejerciciosDB = await supabase.from('Ejercicios').select('*');
                console.log(ejerciciosDB.data);
                setEjercicios(ejerciciosDB.data);
            } catch (error) {
                console.log("error---------------" + error);
            } finally {
                setLoading(false);
            }
        };

        fetchEjercicios();
    }, []);


    // //Datos de prueba
    // useEffect(() => {
    //     const datosDePrueba = [
    //         {
    //             nombre: "ejemplo1",
    //             rounds: '12',
    //             combinaciones: ['jab', 'cross', 'gancho']
    //         },
    //         {
    //             nombre: "ejemplo2",
    //             rounds: '8',
    //             combinaciones: ['jab', 'cross', 'uppercut']
    //         },
    //         // puedes agregar más datos de prueba aquí
    //     ];
    
    //     setEjercicios(datosDePrueba);
    // }, []);


    if (loading) {
        return <div>Cargando...</div>; // Puedes renderizar un componente de carga aquí
    }

    return (
        <EjerciciosContext.Provider value={[ejercicios, setEjercicios]}>
            {children}
        </EjerciciosContext.Provider>
    )
}






