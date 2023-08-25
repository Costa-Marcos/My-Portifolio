function App (){

    // React State
    // For testing
    // const [breakTime, setBreakTime] = React.useState(2);
    // const [sessionTime, setSessionTime] = React.useState(2);
    // const [displayTime, setDisplayTime] = React.useState(2);
    const [breakTime, setBreakTime] = React.useState(5*60);// Break duration in seconds
    const [sessionTime, setSessionTime] = React.useState(25*60);// Session duration in seconds
    const [displayTime, setDisplayTime] = React.useState(25*60);// Current displayed time in seconds
    const [timerOn, setTimerOn] = React.useState(false);// Timer status: running or paused
    const [onBreak, setOnBreak] = React.useState(false);// Indicates if it's break time
    const [countSessions, setCountSessions] = React.useState(0);// Count of completed sessions
    const [countBreaks, setCountBreaks] = React.useState(0);// Count of completed breaks
    const [showClockSettings, setShowClockSettings] = React.useState(false);// Toggle clock settings visibility
    const [clockSettingsClass, setClockSettingsClass] = React.useState("d-none");// Clock settings display class
    const audioRef = React.useRef(null);// Reference to the audio element

    // Format time in seconds to hh:mm format
    const formatTime = (time, showSeconds) => {

        let minutes = Math.floor(time/60);        
        let seconds = time % 60;

        return showSeconds
        ? `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        : minutes;
   
    }

    // Modify session or break duration 
    const changeTimer = (amount, type) => {
        if(!timerOn){
            if(type == "break"){

                if((breakTime + amount) > 0 && (breakTime + amount) < 3660){

                    setBreakTime((prev) => prev + amount);
                    if(!timerOn){
                        setDisplayTime(breakTime + amount)
                    }
                }
            }else if(type == "session"){

                if((sessionTime + amount) > 0 && (sessionTime + amount) < 3660){

                    setSessionTime((prev) => prev + amount);
                    if(!timerOn){
                        setDisplayTime(sessionTime + amount)
                    }
                }
            }
        }
    }

    // Clock Engine
    const timerEngine = () => {

        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let breakTracker = onBreak;
        let count = 0;

        if(!timerOn){

            let interval = setInterval(() => {

                date = new Date().getTime();
                if(date > nextDate){

                    setDisplayTime((prev) => {

                        if(prev <= 0 && !breakTracker){

                            count++;
                            breakTracker = true;
                            setCountSessions((prev) => prev + 1);
                            setOnBreak(true);

                            if(count % 4 == 0){
                                return 30*60;
                            }else{
                                return breakTime;
                            }

                        }else if( prev <= 0 && breakTracker){

                            breakTracker = false;
                            setCountBreaks((prev) => prev + 1);
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
            localStorage.setItem("interval-id", interval);
        }else{
            clearInterval(localStorage.getItem("interval-id"))
        }
        setTimerOn(!timerOn);
    }

    // Reset the settings to the initial state
    const resetTimer = () => {
        setBreakTime(5*60);
        setSessionTime(25*60);
        setDisplayTime(25*60);
        setOnBreak(false);
        if(timerOn){timerEngine()};
        stopBeep();
    }

    // Play the sound signal 
    const playBeep = () => {
        audioRef.current.play();
        audioRef.volume = 1;
    }

    // Stop the sound signal
    const stopBeep = () => {
        
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    // Display or hide the settings
    const showSettings = () => {
        if(!showClockSettings){
            setClockSettingsClass("d-flex flex-column col-6 py-3");
        }else{
            setClockSettingsClass("d-none");
        }
        setShowClockSettings(!showClockSettings)
    }

    // Component rendering
    return(
        <div className = "container">
            <div>
                <div className="position-absolute top-50 start-50 translate-middle col-lg-6 col-md-8 col-sm-10 col-11">
                    <div className="column mt-5">
                        <div className="d-flex flex-row my-2  rounded" style={{backgroundColor:"#ebe2e2"}}>
                            <div className={clockSettingsClass}>
                                <div id="break-label" className="text-center fs-4">Break Length</div>
                                <div className="d-flex flex-row mx-auto mt-2 pb-2">
                                    <button 
                                        id="break-increment" 
                                        onClick={() => changeTimer(60, "break")} 
                                        className="btn btn-dark">
                                        <i className="fa fa-arrow-up fa-2x"></i>
                                    </button>
                                    <div id="break-length" className="mx-2 fs-5 px-2 my-auto">{formatTime(breakTime, false)}</div>
                                    <button 
                                        id="break-decrement" 
                                        onClick={() => changeTimer(-60, 'break')} 
                                        className="btn btn-dark">
                                        <i className="fa fa-arrow-down fa-2x"></i>
                                    </button>
                                </div>
                            </div>
                            <div className={clockSettingsClass}>
                                <div id="session-label" className="text-center fs-5">Session Length</div>
                                <div className="d-flex flex-row mx-auto mt-2 pb-2">
                                    <button 
                                        id="session-increment" 
                                        onClick={() => changeTimer(60, "session")} 
                                        className="btn btn-dark">
                                        <i className="fa fa-arrow-up fa-2x"></i>
                                    </button>
                                    <div id="session-length" className="mx-2 fs-5 px-2 my-auto">{formatTime(sessionTime, false)}</div>
                                    <button 
                                        id="session-decrement" 
                                        onClick={() => changeTimer(-60, "session")} 
                                        className="btn btn-dark">
                                        <i className="fa fa-arrow-down fa-2x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button 
                                id="session-increment" 
                                onClick={showSettings} 
                                className="btn position-fixed">
                                <i className="fa fa-thin fa-gear fa-lg"></i>
                            </button>
                        </div>
                        <div className="mx-auto text-center my-2  rounded py-3" style={{backgroundColor:"#ebe2e2"}}>
                            <div>
                                <div>
                                    <div id="timer-label" className = "display-4">{onBreak? "Break": "Session"}</div>
                                    <div id="time-left" className = "display-1 my-2">{formatTime(displayTime, true)}</div>
                                </div>
                            </div>
                            <div>
                                <button 
                                    id="start_stop" 
                                    onClick={timerEngine} 
                                    className="btn btn-success border border-2 border-secondary">
                                    <i className="fa fa-play fa-2x"></i>
                                    <i className="fa fa-pause fa-2x"></i>
                                </button>
                                <button 
                                    id='reset' 
                                    onClick={resetTimer} 
                                    className="btn btn-danger border border-2 border-secondary ms-2">
                                    <i className="fa fa-refresh fa-2x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <audio id="beep" preload="auto" src="./beepSound.wav" ref={audioRef} muted={false}></audio>
            </div>
            <div 
                className="container  rounded text-center fs-5 py-2 col-lg-6 col-md-8 col-sm-10 col-11 position-absolute start-50 translate-middle" 
                style={{backgroundColor:"#ebe2e2", top:"90vh"}}>
                <div>Sessions: {countSessions}</div>
                <div>Breaks: {countBreaks}</div>
            </div>
        </div>
    )
}

// Render the App component
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

