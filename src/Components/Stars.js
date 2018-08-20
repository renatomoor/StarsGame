import React from 'react'
import '../Style/Global.css';
import _ from 'lodash';

export const Stars = (props) => {
    return (
        <div className="col-5">
            <div className="row">
            {_.range(props.numberOfStars).map(i =>
                <div className="col-4">
                    <i  key={i} className="fa fa-star"></i>
                </div>
            )}
            </div>
        </div>
    )
};