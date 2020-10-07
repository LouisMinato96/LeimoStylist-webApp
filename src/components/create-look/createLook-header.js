import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import classes from './createLook-header.module.scss';

const CreateLookHeader = (props) => {
    return (
        <div className={classes['header']} >
            <div className={classes['back-ctn']} >
                <div className={`${classes['icon-ctn'] }  ${ classes['back-icon'] }`} >
                    <FontAwesomeIcon icon={ faAngleLeft } color="#ff5a5f" />
                </div>
                <span>Back to Styling Tasks</span>
            </div>
            <div className={classes['time-ctn']} >
                <span>{ new Date().toLocaleTimeString( 'en-US', { hour: '2-digit', minute:'2-digit' }) }</span>
            </div>
            <div className={classes['notification-ctn']} >
                <div className={`${classes['icon-ctn'] }  ${ classes['bell-icon'] }`} >
                    <FontAwesomeIcon icon={ faBell } />
                </div>
            </div>
        </div>
    );
}

export default CreateLookHeader;