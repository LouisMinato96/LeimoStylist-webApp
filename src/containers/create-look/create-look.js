import React, { Component } from 'react';

import classes from './create-look.module.scss';
import CreateLookHeader from './../../components/create-look/createLook-header';
import StylingRequirement from './styling-requirement/styling-requirement';
import canvasoutlineImage from './../../assets/images/create_looks_outline.png';

class createLook extends Component {
    render() {
        return (
            <div className={classes['createLook-box-ctn']} >
                <div className={classes['header-ctn']} >
                    <CreateLookHeader />
                </div>
                <div className={classes['main-ctn']} >
                    <div className={classes['styling-requirement-ctn']} >
                        <StylingRequirement />
                    </div>
                    <div className={classes['styling-editor-ctn']} >
                        <div className={classes['editor-box']} >
                            <div className={classes['body-editor-ctn']} ></div>
                            <div className={classes['canvas-editor-ctn']} >
                                <div className={classes['canvas-ctn']} 
                                    style={{ backgroundImage: `url(${canvasoutlineImage})` }}
                                ></div>
                            </div>
                            <div className={classes['layer-editor-ctn']} ></div>
                        </div>
                        <div className={classes['wardrobe-box']} >
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createLook;