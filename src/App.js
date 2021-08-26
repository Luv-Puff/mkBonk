import React ,{ useEffect, useRef, useState}from 'react';
import './App.css';
import H3title from "./header";
import {fabric} from 'fabric';
import bat from './images/Baseball_bat.png';
import WarpImage from './lib/fabric-warp-image';

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
  const batimg = new Image();
  batimg.src = bat;
  let scale = 1;
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

  const addBat = (e) => {
    e.preventDefault();
    const testbat = new WarpImage(batimg,{fixedPoints: 8})
    canvas.add(testbat)
    canvas.renderAll()
  }
  
  // Pick image
  const handleimg = (evt)=>{
    var files = evt.target.files;
    var file= files[0];

    const reader = new FileReader()
    reader.onload = (e) => {
      var image = new Image()
      image.src=e.target.result

      image.onload = () => {
        
        const scaleX = canvas.width / image.width
        const scaleY = canvas.height / image.height
        // 
        scale = Math.min(scaleX, scaleY, 1);
        console.log(`width : ${image.width} px`, `height: ${image.height} px`, `scale: ${scale}`);
        var fabricImage = new fabric.Image(image,{
          selectable: false,
          scaleX: scale,
          scaleY: scale
        } ) 
        canvas.add(fabricImage)
        canvas.renderAll();
      } 
    };
    reader.readAsDataURL(file);
  }

  function saveImg() {
    var img= canvas.toDataURL("image/png");
    var link = document.createElement('a');
        link.download = 'mkBonk.png';
        link.href = img;
        link.click();
  }
  function clearCanvas() {
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
          <button onClick={addBat}>Bonk</button>       
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
