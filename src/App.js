import React from 'react';
import Canvas from './components/Canvas';
import MenuBar from "./components/MenuBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store"

import "@fortawesome/fontawesome-free/css/fontawesome.min.css"
import "@fortawesome/fontawesome-free/css/regular.min.css"
import "@fortawesome/fontawesome-free/css/solid.min.css"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header text="Редактор кривых линий."/>
        <main className="main">
          <div className="container">
            <div className="inner-container">
              <MenuBar />
              <Canvas />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
