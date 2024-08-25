import React, { useState } from 'react';
import { Ejercicio } from './Ejercicio';
import { EjerciciosContext } from '../context/ejerciciosContext';

export function BottomSheet({ listaEjercicios }) {
    const [isOpen, setIsOpen] = useState(false);
    const [ejercicios, setEjercicios] = React.useContext(EjerciciosContext);
    const toggleBottomSheet = () => {
        setIsOpen(!isOpen);
    };

    const [selectedCard, setSelectedCard] = useState(null);
    const handleSelectedCard = (selectedElement) => {
        setSelectedCard(selectedElement);
    }

    const onDelete = (index) => {
        setEjercicios(prevEjercicios => {
            console.log(prevEjercicios)
            const newEjercicios = [...prevEjercicios];
            newEjercicios.splice(index, 1);
            return newEjercicios;
        });
    }


    return (
        <div>
            <button className="bottom-sheet-button" onClick={toggleBottomSheet}>Ver ejercicios</button>
            <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
                <button className="bottom-sheet-cerrar-button" onClick={toggleBottomSheet}>Cerrar</button>
                {listaEjercicios.length === 0 ? <p>Todavia no hay ejercicios creados</p> : null}
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
                            isSelected={selectedCard === index}
                            onSelectedCard={() => handleSelectedCard(index)}
                            onDelete={() => onDelete(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


