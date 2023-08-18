function App (){

    const [breakTime, setBreakTime] = React.useState(5*60);
    const [sessionTime, setSessionTime] = React.useState(25*60);
    const [displayTime, setDisplayTime] = React.useState(25*60);
    const [timerOn, setTimerOn] = React.useState(false);
    const [onBreak, setOnBreak] = React.useState(false);
    const audioRef = React.useRef(null);

    const formatTime = (time, showSeconds) => {

        let minutes = Math.floor(time/60);        
        let seconds = time % 60;
        if(showSeconds){
            return (( minutes < 10 ? minutes = '0' + minutes : minutes) + ':' +  (seconds < 10 ? seconds = '0' + seconds : seconds));
        }else{
            return minutes
        }      
    }

    const changeTimer = (amount, type) => {
        if(!timerOn){
            if(type == 'break'){
                if((breakTime + amount) > 0 && (breakTime + amount) < 3660){
                    setBreakTime((prev) => prev + amount);
                    if(!timerOn){
                        setDisplayTime(breakTime + amount)
                    }
                }
            }else if(type == 'session'){
                if((sessionTime + amount) > 0 && (sessionTime + amount) < 3660){
                    setSessionTime((prev) => prev + amount);
                    if(!timerOn){
                        setDisplayTime(sessionTime + amount)
                    }
                }
            }
        }
    }

    const timerEngine = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let breakTracker = onBreak;

        if(!timerOn){
            let interval = setInterval(() => {
                date = new Date().getTime();
                if(date > nextDate){
                    setDisplayTime((prev) => {
                        if(prev <= 0 && !breakTracker){
                            // playBeep();
                            breakTracker = true
                            setOnBreak(true);
                            return breakTime;
                        }else if( prev <= 0 && breakTracker){
                            // playBeep();
                            breakTracker = false
                            setOnBreak(false);
                            return sessionTime;
                        }
                        if((prev - 1) == 0 ){playBeep()}
                        return prev - 1;
                    })
                    nextDate += second;
                }
            }, 30);
            localStorage.clear()
            localStorage.setItem('interval-id', interval);
        }else{
            clearInterval(localStorage.getItem('interval-id'))
        }
        setTimerOn(!timerOn);
    }

    const resetTimer = () => {
        setBreakTime(5*60);
        setSessionTime(25*60);
        setDisplayTime(25*60);
        setOnBreak(false);
        if(timerOn){timerEngine()};
        stopBeep();
    }

    const playBeep = () => {
        audioRef.current.play();
    }

    const stopBeep =() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    return(
        <div className = 'container h-100'>
            <div className='row'>
                <div className="container position-absolute top-50 start-50 translate-middle col-lg-4 col-md-6 col-sm-10 col-12">
                    <div className='text-center mb-5 display-2'>Pomodoro Timer</div>
                    <div className='column mt-5'>
                        <div className='d-flex flex-row my-2 border border-3 border-danger rounded' style={{backgroundColor:'#ebe2e2'}}>
                            <div className="d-flex flex-column col-6 py-3">
                                <div id='break-label' className='text-center fs-4'>Break Length</div>
                                <div className="d-flex flex-row mx-auto mt-2 pb-2">
                                    <button id='break-increment' onClick={() => changeTimer(60, 'break')} className='btn btn-dark'>
                                        <i className="fa fa-arrow-up fa-2x"></i>
                                    </button>
                                    <div id='break-length' className='mx-2 fs-5 px-2 my-auto'>{formatTime(breakTime, false)}</div>
                                    <button id='break-decrement' onClick={() => changeTimer(-60, 'break')} className='btn btn-dark'>
                                        <i className="fa fa-arrow-down fa-2x"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-column col-6 py-3">
                                <div id='session-label'className='text-center fs-4'>Session Length</div>
                                <div className="d-flex flex-row mx-auto mt-2 pb-2">
                                    <button id='session-increment' onClick={() => changeTimer(60, 'session')} className='btn btn-dark'>
                                        <i className="fa fa-arrow-up fa-2x"></i>
                                    </button>
                                    <div id='session-length' className='mx-2 fs-5 px-2 my-auto'>{formatTime(sessionTime, false)}</div>
                                    <button id='session-decrement'  onClick={() => changeTimer(-60, 'session')} className='btn btn-dark'>
                                        <i className="fa fa-arrow-down fa-2x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='mx-auto text-center my-4 border border-3 border-danger rounded py-3 pb-5' style={{backgroundColor:'#ebe2e2'}}>
                            <div>
                                <div>
                                    <div id='timer-label' className = 'display-4'>{onBreak? 'Break': 'Session'}</div>
                                    <div id='time-left' className = 'fs-2 my-3'>{formatTime(displayTime, true)}</div>
                                </div>
                            </div>
                            <div>
                                <button id='start_stop' onClick={timerEngine} className='btn btn-success border border-2 border-secondary'>
                                    <i className="fa fa-play fa-2x"></i>
                                    <i className="fa fa-pause fa-2x"></i>
                                </button>
                                <button id='reset' onClick={resetTimer} className='btn btn-danger border border-2 border-secondary ms-2'>
                                    <i className="fa fa-refresh fa-2x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <audio id="beep" preload="auto" src="./beepSound.wav" ref={audioRef}></audio>
            </div>
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
