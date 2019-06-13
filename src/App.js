import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import './App.css';

const socket = socketIOClient('http://localhost:8080');

class ImgSocket extends Component {

  constructor (props) {
    super(props)
    this.canvasRef = React.createRef();
  }

  shouldComponentUpdate (props) {
    var image = new Image();
    image.src = props.imgsrc
    const ctx = this.canvasRef.current.getContext('2d');

    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    }
    console.log("drawing")
    console.log(props.imgsrc)

    return true
  }

  render () {
    return (
      <div>
        <canvas ref={this.canvasRef} width={640} height={480}/>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      response: "hello, demo",
      response1: "don't change this"
    };

    socket.on('user_data', (data) => {
      this.setState({img: data})
    });
  };

  render () {
    return (
      <div className="App">
        <ImgSocket imgsrc={this.state.img}></ImgSocket>
      </div>
    )
  }

}

export default App;
