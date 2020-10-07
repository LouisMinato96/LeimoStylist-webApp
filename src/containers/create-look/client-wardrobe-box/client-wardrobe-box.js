import React from 'react';

import classes from './client-wardrobe-box.module.scss';

const ClientWardrobe = (props) => {
    return (
        <div className={classes['wardrobe-category']} >
            <div className={classes['category-title']} >
                <span>Tank Top</span>
            </div>
            <div className={classes['category-item-ctn']} >
                <div className={classes['category-item']} ></div>
                <div className={classes['category-item']} ></div>
                <div className={classes['category-item']} ></div>
                <div className={classes['category-item']} ></div>
                <div className={classes['category-item']} ></div>
            </div>
        </div>
    );
}

export default ClientWardrobe;