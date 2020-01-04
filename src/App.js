import React from 'react';
import Canvas from './components/Canvas';
//import AddPointForm from "./components/AddPointForm";
//import AddCurveForm from "./components/AddCurveForm";
import { Provider } from "react-redux";
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>react App</h1>
        <Canvas></Canvas>
        {/*
        <AddPointForm></AddPointForm>
        <AddCurveForm></AddCurveForm>
        */} 
      </div>
    </Provider>
  );
}

export default App;
