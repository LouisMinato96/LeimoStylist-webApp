import React, { Component } from 'react';
import axios from 'axios';

import classes from './create-look.module.scss';
import CreateLookHeader from './../../components/create-look/createLook-header/createLook-header';
import StylingRequirement from './../../components/create-look/styling-requirement/styling-requirement';
import StylistEditorBox from './../../components/create-look/stylist-editor-box/stylist-editor-box';
import ClientWardrobe from './../../components/create-look/client-wardrobe-box/client-wardrobe-box';

class createLook extends Component {

    state = {
        receivedWardrobe: false,
        wardrobe: null,
        itemsOnCanvas: [],
        selectedCanvasIndex: -1
    }

    getCreatLook = () => {
        const URLcreatelook = `https://whispering-lake-75400.herokuapp.com/sHome/CreateLook/5f814135abf4fd00178fc91b`;
        const config = {
            headers: {
                token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2M2NWE5MzUxOTJkMjlmMGYzODAyZCIsInR5cGUiOiJzdHlsaXN0IiwiaWF0IjoxNjAyNTIwOTAzLCJleHAiOjE2MDI1MjQ1MDN9.sE2vcOkz7QZekeAQgXJ8ik73pKlDcisOL7J-i0XHSSo`
            }
        };
        axios.get(URLcreatelook, config)
            .then(
                res => {

                    const resWardrobe = res.data.wardrobe;
                    const WardrobeObj = {};
                    Object.keys(resWardrobe).map(
                        (key, idx) => {
                            const itemObj = resWardrobe[key].map(
                                (item, i) => {
                                    const imageDOM = new Image();
                                    imageDOM.src = item['image'];
                                    return { ...item, imageDOM }
                                }
                            );
                            WardrobeObj[key] = itemObj;
                            return ({ key: itemObj });
                        }
                    );

                    console.log('wardrobe', WardrobeObj);
                    this.setState({ receivedWardrobe: true, wardrobe: WardrobeObj });
                },
                err => {
                    console.error(err);
                }
            );
    }

    selectedCanvasIndexSetState = (idx) => {
        this.setState({ selectedCanvasIndex: idx });
    }

    componentDidMount() {

        if (!this.state.receivedWardrobe) {
            this.getCreatLook();
        }

    }

    wardrobeItemClicked = (id, itemObj) => {
        const updatedItemsOnCanvas = [...this.state.itemsOnCanvas];
        let idx = 0;
        for (const item of updatedItemsOnCanvas) {
            if (item.details['_id'] === id) {
                return false;
            }
            idx++;
        }
        updatedItemsOnCanvas.push({
            details: itemObj,
            dimentions: {
                _x: (50 * idx) + 100,
                _y: (50 * idx) + 100,
                _s: 10,
                _r: 0
            }
        });
        this.setState({ 
            selectedCanvasIndex: idx, 
            itemsOnCanvas: updatedItemsOnCanvas 
        });
    }

    setCanvasImagePosition = (idx, posX, posY) => {

        const oldItemOnCanvasAtIDX = this.state.itemsOnCanvas[idx];
        const updatedItemOnCanvasAtIDX = {
            details: oldItemOnCanvasAtIDX.details,
            dimentions: {
                ...oldItemOnCanvasAtIDX.dimentions,
                _x: posX,
                _y: posY
            }
        };

        const updatedItemOnCanvas = [...this.state.itemsOnCanvas];
        updatedItemOnCanvas[idx] = updatedItemOnCanvasAtIDX;

        this.setState({ 
            itemsOnCanvas: updatedItemOnCanvas 
        });
    }

    setCanvasImageScale = ( idx, scale ) => {
        console.log( 'Scale', idx, scale );
        const oldItemOnCanvasAtIDX = this.state.itemsOnCanvas[idx];
        const updatedItemOnCanvasAtIDX = {
            details: oldItemOnCanvasAtIDX.details,
            dimentions: {
                ...oldItemOnCanvasAtIDX.dimentions,
                _s: scale 
            }
        };

        const updatedItemOnCanvas = [...this.state.itemsOnCanvas];
        updatedItemOnCanvas[idx] = updatedItemOnCanvasAtIDX;

        this.setState({ 
            itemsOnCanvas: updatedItemOnCanvas 
        });
    }

    setCanvasImageRotation = (idx, rotation ) => {

        const oldItemOnCanvasAtIDX = this.state.itemsOnCanvas[idx];
        const updatedItemOnCanvasAtIDX = {
            details: oldItemOnCanvasAtIDX.details,
            dimentions: {
                ...oldItemOnCanvasAtIDX.dimentions,
                _r: rotation
            }
        };

        const updatedItemOnCanvas = [...this.state.itemsOnCanvas];
        updatedItemOnCanvas[idx] = updatedItemOnCanvasAtIDX;

        this.setState({ 
            itemsOnCanvas: updatedItemOnCanvas 
        });
    }


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
                            <StylistEditorBox
                                itemsOnCanvas={this.state.itemsOnCanvas}
                                setCanvasImagePosition={this.setCanvasImagePosition}
                                selectedCanvasIndexSetState={this.selectedCanvasIndexSetState}
                                selectedCanvasIndex={this.state.selectedCanvasIndex}
                                setCanvasImageScale={ this.setCanvasImageScale }
                                setCanvasImageRotation={ this.setCanvasImageRotation }
                            />
                        </div>
                        <div className={classes['wardrobe-box']} >
                            <ClientWardrobe
                                wardrobe={this.state.wardrobe}
                                itemClicked={this.wardrobeItemClicked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createLook;