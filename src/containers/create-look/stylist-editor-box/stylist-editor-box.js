import React from 'react';

import classes from './stylist-editor-box.module.scss';
import Aux from './../../../HOC/Auxilary/Auxilary';
import canvasoutlineImage from './../../../assets/images/create_looks_outline.png';
import lipsticImage from './../../../assets/images/beauty.png';


const StylistEditorBox = (props) => {
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
                ></div>
            </div>
            <div className={classes['layer-editor-ctn']} ></div>
        </Aux>
    );
}

export default StylistEditorBox;