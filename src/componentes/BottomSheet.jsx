import React, { useState } from 'react';
import { Ejercicio } from './Ejercicio';
import { EjerciciosContext } from '../context/ejerciciosContext';
import { supabase } from '../client';

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

    const handleEjercicioDelete = async (index) => {
        const ejercicioToDelete = ejercicios[index];
        
        try {
            const result = await supabase.from('Ejercicios').delete().match({ id: ejercicioToDelete.id });
            if (result.error === null) {
                setEjercicios(prevEjercicios => {
                    const newEjercicios = [...prevEjercicios];
                    newEjercicios.splice(index, 1);
                    return newEjercicios;
                });
            } else {
                console.error('Error al eliminar el ejercicio:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEjercicioEdit = (index) => {
        setEjercicios(prevEjercicios =>{
            const newEjercicios = [...prevEjercicios];
            newEjercicios[index].edit = true;
            return newEjercicios;
        })
        setIsOpen(false);
        
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


