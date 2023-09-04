import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/app/store"
import App from "./App"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/lib/integration/react"

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
