import React ,{Component, useEffect, useRef, useState}from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import H3title from "./header";

const canvasStyle={
  position:"absolute",
  width:"600px",
  height:"600px",
  background:"white"
}
function OpenPhoto1() {
  document.getElementById("openphoto1").style.display = "none";
  document.getElementById("openphoto2").style.display = "inline";
}

function App() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing,setIsDrawing] = useState(false);
  useEffect(()=>{
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const context = canvas.getContext("2d")
    context.scale(1,1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    
  },[])
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  function drawImg(image,ctx) {
    ctx.drawImage(image, 0, 0, image.width, image.height);
  }
  const handleimg = (evt)=>{
    var files = evt.target.files;
    var file= files[0];
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const reader = new FileReader()
    reader.onload = function (e) {
      var image = new Image()
      image.onload = ()=>{
        drawImg(image,ctx)
      }
      image.src=this.result
    };
    reader.readAsDataURL(file);
  }

  function saveImg() {
    const canvas = canvasRef.current
    var img= canvas.toDataURL("image/png");
    var link = document.createElement('a');
        link.download = 'mkBonk.png';
        link.href = img;
        link.click();
  }
  function clearCanvas() {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  return (
    <div className="App">
        <header className="App-header">
          <H3title/>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div id="DemoContent">
          <div style={{width:"600px",height:"600px",position:"relative"}}>
              <div style={{position:'relative'}}>          
                {/* <canvas style={canvasStyle} id='webglcanvas' ></canvas> */}
                <canvas style={canvasStyle} id='2dcanvas' ref={canvasRef} onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={draw}></canvas>
              </div>
          </div>
        <div style={{textAlign: 'center',paddingTop:"2vh"}}>
        <button id="openphoto1" onClick={OpenPhoto1} >Open a photo</button>      
        <span id="openphoto2" style={{display: 'none'}}>Pick a photo: <input type="file" id="files" onChange={handleimg}/></span>
        <button>Undo</button>         
        <button onClick={clearCanvas}>Start over</button>        
        <button onClick={saveImg} >Save</button>      
      </div>
    </div>
    
    <div id="ErrorMessage" style={{display: 'none'}}>
      <div className="heading">Sorry!</div>
        This demonstation requires a browser with WebGL support.
      </div>
      <div id="log"></div>
    
     <div id="Details" style={{display: 'none'}}>                                        
        <label><input type="checkbox" name="showUniforms" id="showUniforms" />Show uniform points</label> 
        <div>
          <label><input type="radio" name="rendertype" id="renderLines" />Show triangle mesh</label>
          <label><input type="radio" name="rendertype" id="renderTriangles" defaultChecked />Show rendered photo</label>
        </div> 
    
    </div>
          
        </header>
      </div>
  );
}

export default App;
