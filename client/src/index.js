import React, {createContext} from 'react';
import App from './App';
import UserStore from './store/UserStore';
import { createRoot } from "react-dom/client";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <Context.Provider value={{
    user: new UserStore(),
  }}>
  <App />,
  </Context.Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

