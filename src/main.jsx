import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Switch } from 'wouter'
import { TrainingForm } from './componentes/TrainingForm'
import { EjerciciosProvider } from './context/ejerciciosContext'
import { BottomSheet } from './componentes/BottomSheet'
import { VerEjercicios } from './componentes/VerEjercicios'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <EjerciciosProvider>
      <Switch>
        <Route path="/admin">
          <TrainingForm />
          <BottomSheet />
        </Route>
        <Route path="/">
          <VerEjercicios />
        </Route>
        <Route> {/* Cualquier otra ruta */}
          <VerEjercicios />
        </Route>
      </Switch>
    </EjerciciosProvider>
  </>
)
