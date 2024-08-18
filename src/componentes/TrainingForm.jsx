import React, { useState } from 'react';
import { Ejercicio } from './Ejercicio';
import { GolpeAutosuggest } from '../../public/GolpeAutoSuggest';
import Stopwatch from '../assets/stopwatch-blanco.svg';
import Fire from '../assets/flame-blanco.svg';
import Gota from '../assets/gota-blanco.svg';

export function TrainingForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    rounds: '',
    trabajo: '',
    descanso: '',
    aclaraciones: '',
    combinaciones: []
  });

  const [step, setStep] = useState(1);
  const nextStep = () => {
    if ((step == 1 && formData.nombre == '') || (step == 1 && formData.rounds == '')){
      alert("Los ejercicios deben tener un nombre y un número de rounds");
      return;
    }
    setStep(step + 1)
  };
  const prevStep = () => setStep(step - 1);
  const [ejercicios, setEjercicios] = useState([]);

  const handleAddGolpe = (golpe) => {
    setFormData(prevFormData => {
      const newFormData = Object.assign({}, prevFormData);
      newFormData.combinaciones = [...prevFormData.combinaciones, golpe];
      return newFormData;
    });
  };

  const handleChange = (e) => {
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
      // Para los otros tipos de campos, actualizamos el estado directamente
      setFormData(prevFormData => {
        const newFormData = Object.assign({}, prevFormData);
        newFormData[e.target.name] = e.target.value;
        return newFormData;
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(1);

    const nuevoEjercicio = (
      <Ejercicio
        key={ejercicios.length}
        nombre={formData.nombre}
        rounds={formData.rounds}
        trabajo={formData.trabajo}
        descanso={formData.descanso}
        aclaraciones={formData.aclaraciones}
        combinaciones={formData.combinaciones}
      />
    );

    setEjercicios([...ejercicios, nuevoEjercicio]);
    // const newEjercicios = ejercicios.slice();
    // newEjercicios.push(nuevoEjercicio);
    // setEjercicios(newEjercicios);

    // Opcional: Restablecer el formulario después de enviar
    setFormData({
      nombre: '',
      rounds: '',
      trabajo: '',
      descanso: '',
      aclaraciones: '',
      combinaciones: []
    });
  };

  return (
    <div className="crear-ejercicios">
      <div className="form-crear-ejercicios">
        <h1>Crear ejercicio</h1>
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
                  <GolpeAutosuggest onAddGolpe={handleAddGolpe} />
                </div>
                <div className="button-group">
                  <button className="prev-button" type="button" onClick={prevStep}>Anterior</button>
                  <button className="next-button" type="submit">Agregar ejercicio</button>
                </div>
              </div>
            )}
        </form>
      </div>
      <div className="lista-ejercicios">
        {ejercicios.length > 0 && (
          <h2>Ejercicios Creados:</h2>
        )}
        {ejercicios}
        {formData.nombre != '' && (<div className="componente-ejercicio">
          <div className="nombre-ejercicio">
            {formData.nombre != '' && (<h1>{formData.nombre}</h1>)}
          </div>
          <div className="atributos-ejercicio">
            {formData.combinaciones.length > 0 && <p>{formData.combinaciones.join(', ')}</p>}
            <div className='atributos-ejercicio-footer'>
              {formData.rounds != '' && (<p> <img src={Stopwatch} /> <span>{formData.rounds}</span></p>)}
              {formData.trabajo != '' && (<p> <img src={Fire} /> <span> {formData.trabajo}</span></p>)}
              {formData.descanso != '' && (<p><img src={Gota} /> {formData.descanso}</p>)}
            </div>
            {formData.aclaraciones != '' && (<p><strong>Aclaraciones:</strong> {formData.aclaraciones}</p>)}
          </div>
        </div>)}
      </div>
    </div>
  );
};

