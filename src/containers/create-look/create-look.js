import React, { Component } from 'react';

import classes from './create-look.module.scss';
import CreateLookHeader from './../../components/create-look/createLook-header';
import StylingRequirement from './styling-requirement/styling-requirement';
import StylistEditorBox from './stylist-editor-box/stylist-editor-box';
import ClientWardrobe from './client-wardrobe-box/client-wardrobe-box';

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
                            <StylistEditorBox />
                        </div>
                        <div className={classes['wardrobe-box']} >
                            <ClientWardrobe />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createLook;