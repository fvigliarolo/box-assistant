import { useState } from 'react';
import Stopwatch from '../assets/stopwatch-blanco.svg';
import Fire from '../assets/flame-blanco.svg';
import Gota from '../assets/gota-blanco.svg';
import Eliminar from '../assets/eliminar_button.svg';
import Editar from '../assets/edit_button.svg';

export function Ejercicio({ id, nombre, rounds, trabajo = 0, descanso = 0, combinaciones = [], aclaraciones = '', isSelected, onSelectedCard, onEdit, onDelete }) { 

    const [verInfo, setVerInfo] = useState(false);
    const handleVerInfo = () => setVerInfo(!verInfo);
    const verInfoClass = verInfo ? 'ver-info' : 'no-ver-info';
    
    
    return (
        <div className="componente-ejercicio" onClick={onSelectedCard}>
            <div className="card-ejercicio">
                <div className="nombre-ejercicio">
                    <h1>{nombre}</h1>
                </div>
                <div className="atributos-ejercicio">
                    {(combinaciones.length > 0 && combinaciones != "[]") && <p>{combinaciones.join(', ')}</p>}
                    <div className='atributos-ejercicio-footer'>
                        <p><img src={Stopwatch} /> {rounds}</p>
                        {(trabajo > 0 && descanso > 0) && (
                            <>
                                <p><img src={Fire} />{trabajo}</p>
                                <p><img src={Gota} />{descanso}</p>
                            </>
                        )}
                    </div>
                    {aclaraciones != '' && (<button className={verInfo ? 'ver-info-button-clicked' : 'ver-info-button'} onClick={handleVerInfo}></button>)}
                    {aclaraciones && <p className={verInfoClass}>{aclaraciones}</p>}
                </div>
            </div>
            {isSelected && (
            <div className="card-actions">
                <div className="eliminar-button" onClick={onDelete}> <img src={Eliminar} alt="" /></div>
                <div className="edit-button" onClick={onEdit}><img src={Editar} alt="" /></div>
            </div>
            )}
        </div>
    );
}
