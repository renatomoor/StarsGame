import React from 'react';
import {Stars} from "./Components/Stars";
import {Button} from "./Components/Button";
import {Answer} from "./Components/Answer";
import {Numbers} from "./Components/Numbers";
import {DoneFrame} from "./Components/DoneFrame"

import _ from "lodash";

Numbers.list = _.range(1, 10);

let possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};


export class Game extends React.Component{

    static randomNumber = () => 1 + Math.floor(Math.random()*9);

    static initialState  = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
    });
    state = Game.initialState();

    resetGame = () => this.setState(Game.initialState());

    possibleSolution = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        )
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };


    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!'};
            }
            if (prevState.redraws === 0 && !this.possibleSolution(prevState)) {
                return { doneStatus: 'Game Over!'};
            }
    });
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
        this.setState(prevState =>({
                answerIsCorrect: null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            })
        );
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter((number => number !== clickedNumber))
        }))
    };

    checkAnswer = () => {
        this.setState (prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus
        );
    };

    redraw = () => {
        if (this.state.redraws === 0) {return;};
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1,
        }), this.updateDoneStatus
        );
    };


    render() {
        const {
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus,
        } = this.state;



        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}
                    />
                </div>
                <br/>
                {doneStatus ?
                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
                    <Numbers selectedNumbers={selectedNumbers}
                             selectedNumber={this.selectNumber}
                             usedNumbers={usedNumbers}/>
                }




            </div>
        )
    }

}

