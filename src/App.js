import React ,{ useEffect, useRef, useState}from 'react';
import './App.css';
import H3title from "./header";
import {fabric} from 'fabric';
import bat from './images/Baseball_bat.png';
import WarpImage from './fabric-warp-image';

const canvasStyle={
  position:"absolute",
  width:"600px",
  height:"600px",
  aspectRatio:"600/600",
  //background:"white"
}

const App = () => {
  const canvasRef = useRef(null)
  //const contextRef = useRef(null)
  const [canvas, setCanvas] = useState('');
  fabric.Object.prototype.cornerColor = 'Chartreuse';
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.borderColor = 'Chartreuse';
  fabric.Object.prototype.transparentCorners=false;
  // const [imgURL, setImgURL] = useState('');
  useEffect(() => {
    const s= document.createElement("script");
    s.src=""
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    setCanvas(initCanvas());
  }, []);
  
  function OpenPhoto1() {
    document.getElementById("openphoto1").style.display = "none";
    document.getElementById("openphoto2").style.display = "inline";
  }
  const initCanvas = () => (
    new fabric.Canvas('Fcanvas', {
      height: 600,
      width: 600,
    })
  )
  const addRect = canvi => {
    const rect = new fabric.Rect({
      height: 140,
      width: 50,
      fill: 'pink'
    });
    canvi.add(rect);
    canvi.renderAll();
  }
  const addtest = (e, canvi) => {
    e.preventDefault();
    var i = new Image();
    i.src = 'logo'
    const testbat = new WarpImage(i,{fixedPoints: 8})
    canvi.add(testbat)
    canvi.renderAll()
  }
  const addbat = (e, canvi) => {
    e.preventDefault();
    var i = new Image();
    i.src = 'logo'
    new fabric.Image.fromURL(bat, img => {
      img.scale(0.75);
      canvi.add(img);
      canvi.renderAll();
      //setImgURL('');
    });
  }
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
  return(
    <div className="App">
      <header className="App-header">
        <H3title/>
        <div style={{textAlign: 'center'}}>
          <button id="openphoto1" onClick={OpenPhoto1} >Open a photo</button>      
          <span id="openphoto2" style={{display: 'none'}}>Pick a photo: <input type="file" id="files" onChange={handleimg}/></span>
          <button onClick={e => addtest(e, canvas)}>Bonk</button>       
          <button onClick={clearCanvas}>Start over</button>        
          <button onClick={saveImg} >Save</button>      
        </div>
        <div style={{width:"600px",height:"600px",position:"relative"}}> 
          <canvas ref={canvasRef} style={canvasStyle}/>
          <canvas id="Fcanvas" style={canvasStyle}/>
        </div>
        
      
      
      </header>
    </div>
  );
}





export default App;
