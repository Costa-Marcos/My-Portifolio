function App (){

    const [expression, setExpression] = React.useState('');
    const [answer, setAnswer] = React.useState(0);
    
    const display = (symbol) => {
        
        if(answer == 0){setAnswer('')}

        if(symbol == 0){
            if(expression[0] != 0){
                setExpression((prev) => prev + symbol);
                setAnswer((prev) => prev + symbol);
            }else{
                setExpression(0);
                setAnswer(0);
            }
        }else if(/[1-9]/.test(symbol)){
            setExpression((prev) => prev + symbol);
            setAnswer((prev) => prev + symbol);
        }else if(/[/*+]/.test(symbol)){
                if(/[/*+]/.test(expression[expression.length - 1])){
                let newExpression = expression.split('').slice(0,expression.length-1)
                newExpression = newExpression.join('') + symbol;
                setExpression(newExpression);
                setAnswer(symbol);

            }else if(/[/*+]/.test(expression[expression.length - 2]) && expression[expression.length - 1] == '-'){
                let newExpression = expression.split('')
                newExpression = newExpression.splice(newExpression.length-3,1, '-')
                newExpression = newExpression.join('') + symbol;
                setExpression(newExpression);
                setAnswer(symbol);
            }else{
                setExpression((prev) => prev + symbol);
                setAnswer(symbol);
            }
        }else if(symbol == '-'){
            if(expression[expression.length -1] == '='){
                if(/[0-9]/.test(symbol)){
                    setExpression(symbol);
                }else{
                    setExpression(answer + symbol);
                }
            }else{
                setExpression((prev) => prev + symbol);
            }
            setAnswer(symbol);     
        }else if(symbol == '.'){
            if(!/[.]/.test(answer)){
                if(expression[expression.length -1] == '='){
                    if(/[0-9]/.test(symbol)){
                        setExpression(symbol);
                    }else{
                        setExpression(answer + symbol);
                    }
                }else{
                    setExpression((prev) => prev + symbol);
                }
                setAnswer((prev) => prev + symbol);
            }  
        }        

    }

    const calculate = () => {
        setAnswer(eval(expression));
        setExpression(eval(expression));
    }

    const allClear = () => {
        setExpression("");
        setAnswer(0);
    }

    const clear = () => {
        setExpression((prev) => 
            prev
                .split('')
                .slice(0, prev.length -1)
                .join('')                        
        )
        setAnswer(0);
    }

    return(
        <div className="container h-100">
            <div className="row">
                <div className="container bg-secondary-subtle col-lg-4 col-md-5 col-sm-7 col-9 position-absolute top-50 start-50 translate-middle rounded border border-4 border-secondary">
                    <div className="my-3 text-dark">
                        <div className="border border-3 border-secondary d-flex flex-column">
                            <input id="displayExpression" className="bg-info-subtle border border-0 text-end px-2"
                                value = {expression} disabled
                            ></input>
                            <input id="display" className="bg-info-subtle border border-0 text-end px-2" disabled value={answer}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column ps-4">
                        <div className="row col-12 my-1">
                            <div onClick={allClear} id="clear" className="btn btn-danger col-6 border border-3 border-danger-subtle">AC</div>
                            {/* <div onClick={clear} id="clear" className="btn btn-danger col-3 border border-3 border-danger-subtle">C</div> */}
                            <div onClick={() => display('*')} id="multiply" className="btn btn-light col-3 border border-3 border-dark-subtle">x</div>
                            <div onClick={() => display('/')} id="divide" className="btn btn-light col-3 border border-3 border-dark-subtle">/</div>
                        </div>
                        <div className="row col-12 my-1">
                            <div onClick={() => display('7')} id="seven" className="btn btn-secondary col-3 border border-3 border-light">7</div>
                            <div onClick={() => display('8')} id="eight" className="btn btn-secondary col-3 border border-3 border-light">8</div>
                            <div onClick={() => display('9')} id="nine" className="btn btn-secondary col-3 border border-3 border-light">9</div>
                            <div onClick={() => display('-')} id="subtract" className="btn btn-light col-3 border border-3 border-dark-subtle">-</div>
                        </div>
                        <div className="row col-12 my-1">
                            <div onClick={() => display('4')} id="four" className="btn btn-secondary col-3 border border-3 border-light">4</div>
                            <div onClick={() => display('5')} id="five" className="btn btn-secondary col-3 border border-3 border-light">5</div>
                            <div onClick={() => display('6')} id="six" className="btn btn-secondary col-3 border border-3 border-light">6</div>
                            <div onClick={() => display('+')} id="add" className="btn btn-light col-3 border border-3 border-dark-subtle">+</div>
                        </div>
                        <div className="row col-12">
                            <div className="column col-9 my-1">
                                <div className="row">
                                    <div onClick={() => display('1')} id="one" className="btn btn-secondary col-4 border border-3 border-light">1</div>
                                    <div onClick={() => display('2')} id="two" className="btn btn-secondary col-4 border border-3 border-light">2</div>
                                    <div onClick={() => display('3')} id="three" className="btn btn-secondary col-4 border border-3 border-light">3</div>
                                </div>
                                <div className="row my-2">
                                    <div onClick={() => display('0')} id="zero" className="btn btn-secondary col-8 border border-3 border-light">0</div>
                                    <div onClick={() => display('.')} id="decimal" className="btn btn-light col-4 border border-3 border-dark-subtle">.</div>
                                </div>
                            </div>
                            <div className="column col-3 my-1 pb-2 px-0">
                                <div onClick={calculate} id="equals"className="btn btn-primary h-100 w-100 pt-4 border border-3 border-primary-subtle">=</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

// if(/[0-9]/.test(symbol)){
//     if(symbol == 0){                
//         if(expression[0] !== '0' || expression[0] == undefined){
//             if(expression[expression.length -1] == '='){
//                 if(/[0-9]/.test(symbol)){
//                     setExpression(symbol);
//                 }else{
//                     setExpression(answer + symbol);
//                 }
//             }else{
//                 setExpression((prev) => prev + symbol);
//             }
//             if(answer === 0){
//                 setAnswer(symbol);
//             }else{
//                 if(/[/*+-]/.test(answer[answer.length -1])){
//                     setAnswer(symbol);
//                 }else{
//                     setAnswer((prev) => prev + symbol);
//                 }
//             }
//         }
//     }else{
//         if(expression[expression.length -1] == '='){
//             if(/[0-9]/.test(symbol)){
//                 setExpression(symbol);
//             }else{
//                 setExpression(answer + symbol);
//             }
//         }else{
//             setExpression((prev) => prev + symbol);
//         }
//         if(answer === 0){
//             setAnswer(symbol);
//         }else{
//             if(/[/*+-]/.test(answer[answer.length -1])){
//                 setAnswer(symbol);
//             }else{
//                 setAnswer((prev) => prev + symbol);
//             }
//         }
//     }

// }else if(/[/*+]/.test(symbol)){

//     if(/[/*+]/.test(expression[expression.length - 1])){
//         let newExpression = expression.split('').slice(0,expression.length-1)
//         newExpression = newExpression.join('') + symbol;
//         setExpression(newExpression);
//         setAnswer(symbol);

//     }else if(/[/*+]/.test(expression[expression.length - 2]) && expression[expression.length - 1] == '-'){
//         let newExpression = expression.split('')
//         newExpression = newExpression.splice(newExpression.length-3,1, '-')
//         newExpression = newExpression.join('') + symbol;
//         setExpression(newExpression);
//         setAnswer(symbol);
//     }else{
//         setExpression((prev) => prev + symbol);
//         setAnswer(symbol);
//     }
// }else if( symbol == '='){
//     if(/[/*+]/.test(expression[expression.length - 1])){
//         let newExpression = expression.split('').slice(0,expression.length-1)
//         newExpression = newExpression.join('') + symbol;
//         setAnswer(symbol);
//     }
//     setExpression(calculate)
//     setAnswer(calculate)
// }else if( symbol == '.'){
//     if(!/[.]/.test(answer)){
//         if(expression[expression.length -1] == '='){
//             if(/[0-9]/.test(symbol)){
//                 setExpression(symbol);
//             }else{
//                 setExpression(answer + symbol);
//             }
//         }else{
//             setExpression((prev) => prev + symbol);
//         }
//         setAnswer((prev) => prev + symbol);
//     }            
// }else if( symbol == '-'){
//     if(expression[expression.length -1] == '='){
//         if(/[0-9]/.test(symbol)){
//             setExpression(symbol);
//         }else{
//             setExpression(answer + symbol);
//         }
//     }else{
//         setExpression((prev) => prev + symbol);
//     }
//     setAnswer(symbol);        
// }else{
//     if(expression[expression.length -1] == '='){
//         if(/[0-9]/.test(symbol)){
//             setExpression(symbol);
//         }else{
//             setExpression(answer + symbol);
//         }
//     }else{
//         setExpression((prev) => prev + symbol);
//     }
// }