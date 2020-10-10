import React from 'react';

import Aux from './../../../HOC/Auxilary/Auxilary';
import classes from './styling-requirement.module.scss';

const StylingRequirement = (props) => {
    return (
        <Aux>
            <div className={classes['requirement-ctn']} >
                <div className={classes['requirement-header']} >
                    <span>Styling Requirements</span>
                </div>
                <div className={classes['requirement-details']} >
                    <div className={classes['requirement-details-row']} >
                        <div className={classes['requirement-details-row-title']} >
                            <span>Special Day:</span>
                        </div>
                        <div className={classes['requirement-details-row-value']} >
                            <span>Yes</span>
                        </div>
                    </div>
                </div>
                <div className={classes['requirement-note']} >
                    <span className={classes['requirement-note-label']} >Notes:</span>
                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</span>
                </div>
            </div>
            <div className={classes['profile-ctn']} >
                <div className={classes['profile-header']} >
                    <span>Style Profile</span>
                </div>
                <div className={classes['profile-details']} >
                    <div className={classes['profile-details-row']} >
                        <div className={classes['profile-details-row-title']} >
                            <span>Height:</span>
                        </div>
                        <div className={classes['profile-details-row-value']} >
                            <span>154 cm</span>
                        </div>
                    </div>
                </div>
                <div className={classes['profile-note']} >
                    <span className={classes['profile-note-label']} >Notes:</span>
                    <span>Lorem ipsum dolor sit amet, consetetur <strong>… see more&gt;</strong></span>
                </div>
            </div>
            <div className={classes['moreDetail-ctn']} >
                <div className={classes['moreDetail-saved']} >
                    <span>Check Saved Looks&gt;</span>
                </div>
                <div className={classes['moreDetail-previous']} >
                    <span>Check Previous Sessions&gt;</span>
                </div>
            </div>

        </Aux>
    );
}

export default StylingRequirement;