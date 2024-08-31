import React, { useCallback, useEffect, useState } from 'react';
import { EjerciciosContext } from '../context/ejerciciosContext';
import { GolpeAutosuggest } from '../../public/GolpeAutoSuggest';
import Stopwatch from '../assets/stopwatch-blanco.svg';
import Fire from '../assets/flame-blanco.svg';
import Gota from '../assets/gota-blanco.svg';
import Remove from '../assets/remove_button.svg'
import { supabase } from '../client';

export function TrainingForm() {

  const formLimpio = {
    nombre: '',
    rounds: '',
    trabajo: '',
    descanso: '',
    aclaraciones: '',
    combinaciones: [],
    edit: false
  }
  
  const [formData, setFormData] = useState(formLimpio);
  const [ejercicios, setEjercicios] = React.useContext(EjerciciosContext);
  const [confirmButton, setConfirmButton] = useState(true);

 useEffect(() => {
  const ejercicioEdit = ejercicios.find((elemento) => elemento.edit === true)
  if (ejercicioEdit != undefined) {
    setConfirmButton(false);
    setFormData(ejercicioEdit);
  }
 }, [ejercicios])

  const [step, setStep] = useState(1);
  const nextStep = () => {
    if ((step == 1 && formData.nombre == '') || (step == 1 && formData.rounds == '')) {
      alert("Los ejercicios deben tener un nombre y un número de rounds");
      return;
    }
    setStep(step + 1)
  };
  const prevStep = () => setStep(step - 1);

  const [verInfo, setVerInfo] = useState(false);
  const handleVerInfo = () => setVerInfo(!verInfo);
  const verInfoClass = verInfo ? 'ver-info' : 'no-ver-info';
  const handleAddGolpe = (golpe) => {
    setFormData(prevFormData => {
      const newFormData = Object.assign({}, prevFormData);
      newFormData.combinaciones = [...prevFormData.combinaciones, golpe];
      return newFormData;
    });
  };
  
  const handleRemoveGolpe = (e) => {
    e.preventDefault();
    setFormData(prevFormData => ({
      ...prevFormData,
      combinaciones: prevFormData.combinaciones.slice(0, -1)
    }));
  }


  const handleChange = useCallback((e) => {
    if (e.target.type === 'select-multiple') {
      // Si es un campo select-multiple, obtenemos las opciones seleccionadas
      const selectedOptions = [];
      for (let i = 0; i < e.target.options.length; i++) {
        if (e.target.options[i].selected) {
          selectedOptions.push(e.target.options[i].value);
        }
      }
      setFormData(prevFormData => {
        const newFormData = Object.assign({}, prevFormData);
        newFormData[e.target.name] = selectedOptions;
        return newFormData;
      });
    } else {
      setFormData(prevFormData => {
        const newFormData = Object.assign({}, prevFormData);
        newFormData[e.target.name] = e.target.value;
        return newFormData;
      });
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(1);

    if (!confirmButton){
      setEjercicios(prevEjercicio => {
       const newEjercicios = [...prevEjercicio]
       const index = newEjercicios.findIndex((elemento) => elemento.edit === true)
       formData.edit = false
       newEjercicios[index] = formData
       return newEjercicios
      })
      setConfirmButton(true)
    }else{
      const nuevoEjercicio = formData;

      try{
        const reuslt = await supabase.from('Ejercicios').insert([nuevoEjercicio]);
        console.log(reuslt)
      }catch(error){
        console.log(error)
      }
      setEjercicios([...ejercicios, nuevoEjercicio]);
    }
    setFormData(formLimpio);
  };


  return (
    <div className="crear-ejercicios">
      {(formData.nombre != '' && formData.nombre ) && (<div className="card-ejercicio">
        <div className="nombre-ejercicio">
          {(formData.nombre != '' && formData.nombre ) && (<h1>{formData.nombre}</h1>)}
        </div>
        <div className="atributos-ejercicio">
          {(formData.combinaciones.length > 0 && formData.combinaciones != "[]") && <p>{formData.combinaciones.join(', ')}</p>}
          <div className='atributos-ejercicio-footer'>
            {(formData.rounds != '' && formData.rounds ) && (<p> <img src={Stopwatch} /> <span>{formData.rounds}</span></p>)} {/* Verificar que existe el campo y que es vacio*/}
            {(formData.trabajo != '' && formData.trabajo ) && (<p> <img src={Fire} /> <span> {formData.trabajo}</span></p>)}
            {(formData.descanso != '' && formData.descanso ) && (<p><img src={Gota} /> {formData.descanso}</p>)}
          </div>
          {(formData.aclaraciones != '' && formData.aclaraciones ) && (<button className={verInfo ? 'ver-info-button-clicked' : 'ver-info-button'} onClick={handleVerInfo}></button>)}
          {formData.aclaraciones && <p className={verInfoClass}>{formData.aclaraciones}</p>}
        </div>
      </div>)}
      <div className="form-crear-ejercicios">
        <form onSubmit={handleSubmit}>
          {step === 1 &&
            (
              <div className='step-1'>
                <div>
                  <label htmlFor="nombre" className="label-formulario">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div>
                  <label className="label-formulario" htmlFor="rounds">Rounds</label>
                  <input type="number" id="rounds" name="rounds" value={formData.rounds} onChange={handleChange} />
                </div>
                <div>
                  <label className="label-formulario" htmlFor="aclaraciones">Aclaraciones</label>
                  <textarea id="aclaraciones" name="aclaraciones" value={formData.aclaraciones} onChange={handleChange} />
                </div>
                <button className="next-button" type="button" onClick={nextStep}>Siguiente</button>
              </div>
            )}
          {step === 2 &&
            (
              <div className="step-2">
                <div className="input-group">
                  <label className="label-formulario" htmlFor="trabajo">Trabajo (segundos)</label>
                  <input type="number" id="trabajo" name="trabajo" value={formData.trabajo} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label className="label-formulario" htmlFor="descanso">Descanso (segundos)</label>
                  <input type="number" id="descanso" name="descanso" value={formData.descanso} onChange={handleChange} />
                </div>

                <div className="button-group">
                  <button className="prev-button" type="button" onClick={prevStep}>Anterior</button>
                  <button className="next-button" type="button" onClick={nextStep}>Siguiente</button>
                </div>
              </div>

            )}
          {step === 3 &&
            (
              <div className='step-3'>
                <div>
                  <label className="label-formulario">Combinaciones</label>
                  <div className='add-remove-golpes'>
                    <GolpeAutosuggest onAddGolpe={handleAddGolpe} />
                    {formData.combinaciones.length > 0 && (<button onClick={handleRemoveGolpe}><img src={Remove} alt="" /></button>)}
                  </div>
                </div>
                <div className="button-group">
                  <button className="prev-button" type="button" onClick={prevStep}>Anterior</button>
                  {confirmButton ? <button className="next-button" type="submit">Agregar ejercicio</button>
                   : <button className="edit-button" type="submit">Editar ejercicio</button>}
                </div>
              </div>
            )}
        </form>
      </div>
    </div>
  );
};

