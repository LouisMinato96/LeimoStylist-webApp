import React, { useEffect, createRef } from 'react';

// import classes from './CollageCanvas.module.scss';

const CollageCanvas = (props) => {

  const canvasRef = createRef();
  const IMAGE_WIDTH = 1080;

  const drawImageOnCanvas = (posX, posY) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageScale = ( props.canImg.dimentions['_s'] / 10 );

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.translate( posX, posY);
    ctx.rotate( (Math.PI / 180) * props.canImg.dimentions['_r']);
    ctx.drawImage(
      props.canImg.details.imageDOM,
      0,
      0,
      IMAGE_WIDTH,
      (IMAGE_WIDTH*4/3),
      (-50 * imageScale),
      ((-50*4/3) * imageScale),
      (100 * imageScale),
      ((100*4/3) * imageScale)
    );
    ctx.rotate( (-Math.PI / 180) * props.canImg.dimentions['_r']);
    ctx.translate( -posX, -posY);
  }

  const drawImageOnCanvasWithBorder = (posX, posY) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageScale = ( props.canImg.dimentions['_s'] / 10 );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate( posX, posY);
    ctx.rotate( (Math.PI / 180) * props.canImg.dimentions['_r']);
    ctx.drawImage(
      props.canImg.details.imageDOM,
      0,
      0,
      IMAGE_WIDTH,
      (IMAGE_WIDTH*4/3),
      (-50 * imageScale),
      ((-50*4/3) * imageScale),
      (100 * imageScale),
      ((100*4/3) * imageScale)
    );
    ctx.strokeStyle = '#FF5A5F';
    ctx.lineWidth = 4;
    ctx.strokeRect(
      (-50 * imageScale),
      ((-50*4/3) * imageScale),
      (100 * imageScale),
      ((100*4/3) * imageScale)
    );
    ctx.rotate( (-Math.PI / 180) * props.canImg.dimentions['_r']);
    ctx.translate( -posX, -posY);
  }

  const canZindex = props.selectedIndex === props.canindex ? 1000 : (props.canindex + 100);

  useEffect(() => {
    // console.log( 'Selected Index Change', props.canindex );

    if (props.selectedIndex === props.canindex) {
      drawImageOnCanvasWithBorder(props.canImg.dimentions['_x'], props.canImg.dimentions['_y']);
    } else {
      drawImageOnCanvas(props.canImg.dimentions['_x'], props.canImg.dimentions['_y']);
    }
    // eslint-disable-next-line  
  }, [props.selectedIndex, props.canImg]);

  let LastPosX = props.canImg.dimentions['_x'];
  let LastPosY = props.canImg.dimentions['_y'];

  const captureMousePosition = (event) => {
    const posX = event.offsetX; // - 25 ;
    const posY = event.offsetY; // - 175;
    LastPosX = posX;
    LastPosY = posY;
    // console.log( 'Capture', event );
    // console.log( 'Capture', posX , posY );
    drawImageOnCanvasWithBorder(posX, posY);
  }

  const setForMoveImage = (event) => {
    console.log('CanvasMouseDown', props.canindex);
    canvasRef.current.addEventListener('mousemove', captureMousePosition);
  }

  const resetForMoveImage = (event) => {
    console.log('CanvasMouseUp', props.canindex);
    props.setPosition(LastPosX, LastPosY);
    canvasRef.current.removeEventListener('mousemove', captureMousePosition);
  }

  return (
    <canvas
      style={{ position: 'absolute', top: '0px', left: '0px', zIndex: canZindex }}
      width={props.canWidth}
      height={props.canHeight}
      ref={canvasRef}
      onMouseDown={() => { setForMoveImage() }}
      onMouseUp={() => { resetForMoveImage() }}
      onMouseOut={() => { resetForMoveImage() }}
    >
    </canvas>
  );
}

export default CollageCanvas;