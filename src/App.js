import React from 'react';
import Canvas from './components/Canvas';
import MenuBar from "./components/MenuBar";
import { Provider } from "react-redux";
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>react App</h1>
        <Canvas></Canvas>
        <MenuBar />
      </div>
    </Provider>
  );
}

export default App;
