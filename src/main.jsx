import React  from 'react'
import ReactDOM  from 'react-dom/client'
import { TrainingForm } from './componentes/TrainingForm'
import { EjerciciosProvider } from './context/ejerciciosContext'
import { BottomSheet } from './componentes/BottomSheet'


const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <>
    <EjerciciosProvider>
      <TrainingForm />
      <BottomSheet />
    </EjerciciosProvider>
  </>
)
