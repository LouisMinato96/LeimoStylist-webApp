import React, { useEffect, useState, createRef } from 'react';

import classes from './stylist-editor-box.module.scss';
import Aux from './../../../HOC/Auxilary/Auxilary';
import CollageCanvas from './../CollageCanvas/CollageCanvas';
import canvasoutlineImage from './../../../assets/images/create_looks_outline.png';
import lipsticImage from './../../../assets/images/beauty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faExpand } from '@fortawesome/free-solid-svg-icons';


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
            if ( props.selectedCanvasIndex === idx ) {
                layerClasses.push(classes.selectedLayer);
            }

            return (
                <CollageCanvas
                    key={`${itemDetail['_id']}`}
                    canindex={idx}
                    canImg={ item }
                    setPosition={(posX, posY) => { props.setCanvasImagePosition(idx, posX, posY); }}
                    canWidth={canvasDimension.width}
                    canHeight={canvasDimension.height}
                    selectedIndex={ props.selectedCanvasIndex }
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
                </div>
            );
        }
    );

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
                    <div id="szController" className={classes['size-rotation-controller']} 
                        style={ props.szControllerPosition }
                    >
                        <div className={classes['size-controller-btn']} >
                            <FontAwesomeIcon icon={ faExpand } color='#ffffff' />
                        </div>
                        <div className={classes['rotation-controller-btn']} >
                            <FontAwesomeIcon icon={ faUndo } color='#ffffff' />
                        </div>
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