import React from 'react';
import '../Style/Global.css';


export const Numbers = (props) => {
    const numberClassName = (number) => {
        if(props.usedNumbers.indexOf(number) >= 0){
            return 'used';
        };
        if(props.selectedNumbers.indexOf(number) >= 0){
            return 'selected';
        };

    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i}
                          className={numberClassName(number)}
                          onClick={() => props.selectedNumber(number)}
                    >{number}</span>
                )}
            </div>
        </div>
    )
}
