import React, { useEffect, useState, createRef } from 'react';

import classes from './stylist-editor-box.module.scss';
import Aux from './../../../HOC/Auxilary/Auxilary';
import CollageCanvas from './../CollageCanvas/CollageCanvas';
import canvasoutlineImage from './../../../assets/images/create_looks_outline.png';
import lipsticImage from './../../../assets/images/beauty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


const StylistEditorBox = (props) => {

    const CollageCanvasRef = createRef();
    const [canvasDimension, canvasDimentionSetState] = useState({ width: 0, height: 0 });

    useEffect(() => {
        canvasDimentionSetState(
            {
                width: CollageCanvasRef.current.clientWidth,
                height: CollageCanvasRef.current.clientHeight
            }
        );
        // eslint-disable-next-line
    }, []);

    const CanvasImages = props.itemsOnCanvas.map(
        (item, idx) => {

            const itemDetail = item.details;

            const layerClasses = [classes.layer];
            if (props.selectedCanvasIndex === idx) {
                layerClasses.push(classes.selectedLayer);
            }

            return (
                <CollageCanvas
                    key={`${itemDetail['_id']}`}
                    canindex={idx}
                    canImg={item}
                    setPosition={(posX, posY) => { props.setCanvasImagePosition(idx, posX, posY); }}
                    canWidth={canvasDimension.width}
                    canHeight={canvasDimension.height}
                    selectedIndex={props.selectedCanvasIndex}
                />
            );
        }
    );

    const itemOnCanvas = props.itemsOnCanvas.map(
        (item, idx) => {
            return (
                <div className={classes['category-item']}
                    key={`${item.details['_id']}__${idx}`}
                    onClick={() => { props.selectedCanvasIndexSetState(idx); }}
                >
                    <img src={item.details.image} alt='' />
                    <div className={ classes['remove-item'] } 
                        onClick={ () => { props.removeSelectedCanvasItem(idx) } }
                    >
                        <FontAwesomeIcon icon={faMinus} color="#ffffff" />
                    </div>
                </div>
            );
        }
    );

    let szController = null;
    if ( props.itemsOnCanvas.length > props.selectedCanvasIndex && props.selectedCanvasIndex >= 0 ) {
        const activeItem = props.itemsOnCanvas[ props.selectedCanvasIndex ];
        szController = (
            <div className={classes['size-rotation-controller']} >
                <div className={classes['size-controller-btn']} >
                    <label >Scale:</label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={activeItem.dimentions['_s']}
                        onChange={(event) => { props.setCanvasImageScale(props.selectedCanvasIndex, event.target.value) }}
                    />
                </div>
                <div className={classes['rotation-controller-btn']} >
                    <label >Rotation:</label>
                    <input
                        type="range"
                        min="0"
                        max="355"
                        value={activeItem.dimentions['_r']}
                        onChange={(event) => { props.setCanvasImageRotation(props.selectedCanvasIndex, event.target.value) }}
                    />
                </div>
            </div>
        );
    }

    return (
        <Aux>
            <div className={classes['body-editor-ctn']} >

                <div className={`${classes['body-editor-category']} ${classes['category-hair']}`} >
                    <div className={classes['body-editor-title']} >
                        <span>Hairstyle</span>
                    </div>
                    <div className={classes['body-editor-item-ctn']} >
                        <div className={classes['body-editor-item']} >
                            <img src={lipsticImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className={`${classes['body-editor-category']} ${classes['category-lipstic']}`} >
                    <div className={classes['body-editor-title']} >
                        <span>Lipstick</span>
                    </div>
                    <div className={classes['body-editor-item-ctn']} >
                        <div className={classes['body-editor-item']} >
                            <img src={lipsticImage} alt="" />
                        </div>
                    </div>
                </div>

            </div>
            <div className={classes['canvas-editor-ctn']} >
                <div className={classes['canvas-ctn']}
                    style={{ backgroundImage: `url(${canvasoutlineImage})` }}
                    ref={CollageCanvasRef}
                >
                    { CanvasImages }
                    { szController }

                    <div className={classes['save-look']} 
                        onClick={props.saveLook}
                    >
                        <span>SAVE LOOK</span>
                    </div>

                </div>
            </div>
            <div className={classes['layer-editor-ctn']} >
                {itemOnCanvas}
            </div>
        </Aux>
    );
}

export default StylistEditorBox;