import React from 'react';

import classes from './client-wardrobe-box.module.scss';
import Aux from './../../../HOC/Auxilary/Auxilary';

const ClientWardrobe = (props) => {

    let categories = null;
    let wardrobe = null;
    if (props.wardrobe !== null) {
        categories = Object.keys(props.wardrobe);
        wardrobe = categories.map(
            (title, idx) => {

                const items = props.wardrobe[ title ];

                if ( items.length <= 0 ) {
                    return null;
                }

                const catergoryItems = items.map(
                    ( itm ) => {
                        return (
                            <div className={classes['category-item']} 
                                key={`${title}-image__${ itm['_id'] }`}
                                onClick={ () => { props.itemClicked( itm['_id'], itm ); } }
                            >
                                <img src={ itm['image'] }  alt='' />
                            </div>
                        );
                    }
                );

                return (
                    <div className={classes['wardrobe-category']} 
                        key={ `${title}__${idx}` }
                    >
                        <div className={classes['category-title']} >
                            <span>{title}</span>
                        </div>
                        <div className={classes['category-item-ctn']} >
                            { catergoryItems }
                        </div>
                    </div>
                );
            }
        );
    }

    return (
        <Aux>
            { wardrobe }
        </Aux>
    );
}

export default ClientWardrobe;