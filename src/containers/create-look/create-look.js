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
        selectedCanvasIndex: -1,
        szControllerPosition: null
    }

    getCreatLook = () => {
        const URLcreatelook = `https://whispering-lake-75400.herokuapp.com/sHome/CreateLook/5f814135abf4fd00178fc91b`;
        const config = {
            headers: {
                token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2M2NWE5MzUxOTJkMjlmMGYzODAyZCIsInR5cGUiOiJzdHlsaXN0IiwiaWF0IjoxNjAyMzUxMDU5LCJleHAiOjE2MDIzNTQ2NTl9.F0lVutdY5MIhSj3dHx2zKXXW4XYgKx3SegwjWeyVI5w`
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
        const updatedItemOnCanvasAtIDX = this.state.itemsOnCanvas[idx];
        const szControllerPosX = updatedItemOnCanvasAtIDX.dimentions['_y'] - 10 ;
        const szControllerPosY = updatedItemOnCanvasAtIDX.dimentions['_x'] - 10 ;
        const updated_szControllerPosition = {
            top: `${ szControllerPosX }px`,
            left: `${ szControllerPosY }px`
        };
        this.setState({ 
            selectedCanvasIndex: idx ,
            szControllerPosition: updated_szControllerPosition
        });
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
                _x: (50 * idx),
                _y: (50 * idx),
                _s: 1,
                _r: 0
            }
        });
        const szControllerPosX = (50 * idx) - 10 ;
        const szControllerPosY = (50 * idx) - 10 ;
        // console.log( szControllerPosX, szControllerPosY );

        const updated_szControllerPosition = {
            top: `${ szControllerPosX }px`,
            left: `${ szControllerPosY }px`
        };
        this.setState({ 
            selectedCanvasIndex: idx, 
            itemsOnCanvas: updatedItemsOnCanvas ,
            szControllerPosition: updated_szControllerPosition
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

        const szControllerPosX = updatedItemOnCanvasAtIDX.dimentions['_y'] - 10 ;
        const szControllerPosY = updatedItemOnCanvasAtIDX.dimentions['_x'] - 10 ;
        // console.log( szControllerPosX, szControllerPosY );

        const updated_szControllerPosition = {
            top: `${ szControllerPosX }px`,
            left: `${ szControllerPosY }px`
        };

        this.setState({ 
            itemsOnCanvas: updatedItemOnCanvas ,
            szControllerPosition: updated_szControllerPosition
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
                                szControllerPosition={ this.state.szControllerPosition }
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