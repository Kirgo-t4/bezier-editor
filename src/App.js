import React from 'react';
import Canvas from './components/Canvas';
import MenuBar from "./components/MenuBar";
import Header from "./components/Header"
import { Provider } from "react-redux";
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header text="Редактор кривых линий."/>
        <main className="container">
          <div className="inner-container">
            <MenuBar />
            <Canvas />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
