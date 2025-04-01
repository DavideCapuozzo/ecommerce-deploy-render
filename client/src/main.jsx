import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store'
import Login from './pages/auth/Login'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App></App>
      <Toaster></Toaster>
    </Provider>
  </BrowserRouter>
)


{/* 

------------------------------------------ SPIEGAZIONE
NON SI SA PERCHE NON FUNZIONA


Ci sono alcuni problemi potenziali che potrebbero impedire la visualizzazione di "Hello World!". Esaminiamo passo per passo il codice fornito e individuiamo possibili errori:

1. Problema con il Router
Hai configurato un router utilizzando createBrowserRouter e RouterProvider, ma nel componente App non hai collegato correttamente l'elemento principale. Se stai usando RouterProvider, il router dovrebbe gestire il rendering, ma hai avvolto il router in un BrowserRouter che non è necessario in questa configurazione.

Soluzione:
Rimuovi il BrowserRouter e utilizza direttamente RouterProvider con il router creato:

javascript
Copia codice
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
------------------------------------


------------------- CODICE ORIGINALE
<BrowserRouter>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
    
</BrowserRouter> 

*/}
