import React from 'react';
import { Ejercicio } from './Ejercicio';
import { EjerciciosContext } from '../context/ejerciciosContext';

export function VerEjercicios() {
    const [ejercicios, setEjercicios] = React.useContext(EjerciciosContext);
    return (
        <div>
            {ejercicios.length === 0 ? <p>Todavia no hay ejercicios creados</p> : null}
            <div className="lista-ejercicios">
                {ejercicios.map((ejercicio, index) => (
                    <Ejercicio
                        key={index}
                        nombre={ejercicio.nombre}
                        rounds={ejercicio.rounds}
                        trabajo={ejercicio.trabajo}
                        descanso={ejercicio.descanso}
                        combinaciones={ejercicio.combinaciones}
                        aclaraciones={ejercicio.aclaraciones}
                    />
                ))}
            </div>
        </div>
    )
}


