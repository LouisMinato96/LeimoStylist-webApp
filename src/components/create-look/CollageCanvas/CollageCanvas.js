import React, { useEffect, createRef } from 'react';

// import classes from './CollageCanvas.module.scss';

const CollageCanvas = (props) => {

  const canvasRef = createRef();

  const drawImageOnCanvas = (posX, posY) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      props.canImg.details.imageDOM,
      0,
      0,
      1080,
      1080,
      posX,
      posY,
      (100 * props.canImg.dimentions['_s']),
      (100 * props.canImg.dimentions['_s'])
    );
  }

  const drawImageOnCanvasWithBorder = (posX, posY) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      props.canImg.details.imageDOM,
      0,
      0,
      1080,
      1080,
      posX,
      posY,
      (100 * props.canImg.dimentions['_s']),
      (100 * props.canImg.dimentions['_s'])
    );
    ctx.strokeStyle = '#FF5A5F';
    ctx.lineWidth = 4;
    ctx.strokeRect(
      posX,
      posY,
      (100 * props.canImg.dimentions['_s']),
      (100 * props.canImg.dimentions['_s'])
    );
  }

  const canZindex = props.selectedIndex === props.canindex ? 1000 : (props.canindex + 100);

  useEffect(() => {

    props.canImg.details.imageDOM.onload = () => {
      drawImageOnCanvas(props.canImg.dimentions['_x'], props.canImg.dimentions['_y']);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log( 'Selected Index Change', props.canindex );

    if (props.selectedIndex === props.canindex) {
      drawImageOnCanvasWithBorder(props.canImg.dimentions['_x'], props.canImg.dimentions['_y']);
    } else {
      drawImageOnCanvas(props.canImg.dimentions['_x'], props.canImg.dimentions['_y']);
    }
    // eslint-disable-next-line  
  }, [props.selectedIndex]);

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
    document.getElementById('szController').style.display = 'none';
  }

  const resetForMoveImage = (event) => {
    console.log('CanvasMouseUp', props.canindex);

    props.setPosition(LastPosX, LastPosY);

    canvasRef.current.removeEventListener('mousemove', captureMousePosition);
    document.getElementById('szController').style.display = 'flex';

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