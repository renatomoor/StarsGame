import React from 'react'
import '../Style/Global.css';
import _ from 'lodash';






export const Stars = (props) => {

    return (
        <div className="col-5">


            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}

        </div>
    )
}