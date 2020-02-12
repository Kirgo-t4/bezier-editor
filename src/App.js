import React, { Component } from 'react';
import Canvas from './components/Canvas/Canvas';
import MenuBar from "./components/MenuBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store"

import saveButton from './assets/save.svg'
import Saver from "./components/Saver/Saver";
import ToolTip from "./components/ToolTip/ToolTip"
import json_strings from "./strings.json";

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      side: null
    }
  }

  detectSize = () => {
    if (!window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(min-height: 815px)").matches) {
      let sideSize = (document.body.clientHeight - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight) * 0.96
      this.setState({ side: sideSize + 'px' })
    } else {
      this.setState({ side: null })
    }
  }

  componentDidMount = () => {
    this.detectSize()
    window.addEventListener("orientationchange",this.detectSize)
    window.addEventListener("resize", this.detectSize)
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header text={json_strings.main_header}/>
          <aside className="left-panel">
            <ToolTip text={json_strings.tooltips.save}>
              <Saver>
                <div className="button left-panel__button">
                  <span>{json_strings.panel_buttons.save}</span><img src={saveButton} alt="save" />
                </div>
              </Saver>
            </ToolTip>
          </aside>
          <main className="main">
            <div className="container">
              <div className="inner-container">
                <MenuBar />
                <div className="canvas-wrapper" style={ this.state.side && { height: this.state.side, width: this.state.side }} >
                  <Canvas />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default App;
