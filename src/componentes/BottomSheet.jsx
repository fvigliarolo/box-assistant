import React, { useState } from 'react';
import { Ejercicio } from './Ejercicio';
import { EjerciciosContext } from '../context/ejerciciosContext';

export function BottomSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [ejercicios, setEjercicios] = React.useContext(EjerciciosContext);
    const toggleBottomSheet = () => {
        setIsOpen(!isOpen);
    };

    const [selectedCard, setSelectedCard] = useState(null);
    const handleSelectedCard = (selectedElement) => {
        setSelectedCard(selectedElement);
    }

    const handleEjercicioDelete = (index) => {
        setEjercicios(prevEjercicios => {
            const newEjercicios = [...prevEjercicios];
            newEjercicios.splice(index, 1);
            return newEjercicios;
        });
    }

    const handleEjercicioEdit = (index) => {
        setEjercicios(prevEjercicios =>{
            const newEjercicios = [...prevEjercicios];
            newEjercicios[index].edit = true;
            handleEjercicioDelete(index);
            setIsOpen(false);
            return newEjercicios;
        })
        
    }

    return (
        <div>
            <button className="bottom-sheet-button" onClick={toggleBottomSheet}>Ver ejercicios</button>
            <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
                <button className="bottom-sheet-cerrar-button" onClick={toggleBottomSheet}>Cerrar</button>
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
                            isSelected={selectedCard === index}
                            onSelectedCard={() => handleSelectedCard(index)}
                            onDelete={() => handleEjercicioDelete(index)}
                            onEdit={() => handleEjercicioEdit(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


