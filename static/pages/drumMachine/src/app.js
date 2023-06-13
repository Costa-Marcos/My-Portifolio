const audioClips = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

function App () {

    const [volume, setVolume] = React.useState(1);
    const [innerTxt, setInnerTxt] = React.useState('');
    const [recording, setRecording] = React.useState('');
    const [speed, setSpeed] = React.useState(0.5);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return() => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    },[])

    const handleKeyPress = (event) => {
        audioClips.map((clip) => {
            if(event.keyCode == clip.keyCode){
                setInnerTxt(clip.id)
            }
        })
    }

    const handleClick = (idPad) => {
        setInnerTxt(idPad)
    }

    const playRecording = () => {

        let recordingArr = recording.split(" ");
        let index = 0;
        const interval = setInterval(() =>{
            const audioTag= document.getElementById(recordingArr[index]);
            audioTag.currentTime = 0;
            audioTag.volume = volume;
            audioTag.play();
            index++;
        }, 600 * speed)
        setTimeout(() => clearInterval(interval), 600 * recordingArr.length - 1);
    }

    const padGroups = audioClips.reduce((groups, clip, index) => {
        // Calculate the group index for each clip
        const groupIndex = Math.floor(index / 3);
        // Check if the group exists, otherwise create a new group
        if (!groups[groupIndex]) {
          groups[groupIndex] = [];
        }
        // Add the current clip to the group
        groups[groupIndex].push(
          <Pad
            key={clip.id}
            clip={clip}
            volume={volume}
            handleClick={handleClick}
            setRecording={setRecording}
          />
        );
        return groups;
      }, []);

    return(
        <div id="drum-machine d-flex flex-row">
            <div className="bg-dark-subtle text-center p-3 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body-tertiary rounded border border-4 border-secondary">
                <h2 className="text-black mb-3">Drum Machine</h2>
                <div className="row mx-3">
                    <div className="col-lg-6">
                        <div>
                            {padGroups.map((group, index) => (
                                <div key={index} className="d-flex flex-row m-2 justify-content-evenly">
                                {group}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h4>Volume</h4>
                        <input
                            type="range"
                            onChange={(e) => setVolume(e.target.value)}
                            step="0.02"
                            value={volume}
                            max="1"
                            min="0"
                            className="w-50"
                        >
                        </input>
                        <div className="my-4">
                        <button 
                            onClick={playRecording} 
                            className="btn btn-success"
                            disabled={!recording}
                        >play</button>
                        <button 
                            onClick={() => {setRecording(""); setInnerTxt("")}} 
                            className="btn btn-danger"
                            disabled={!recording}
                        >clear</button>
                        </div>
                        <h4 className="mt-4">Speed</h4>
                        <input
                            type="range"
                            onChange={(e) => setSpeed(e.target.value)}
                            step="0.02"
                            value={speed}
                            max="2"
                            min="0.1"
                            className="w-50"
                        ></input>
                    </div>
                    <div className="col-12 my-3">
                        <p id="display" className=" rounded mx-auto col-3 bg-dark bg-gradient text-white">{innerTxt}</p>
                        <p className="rounded mx-auto bg-dark bg-gradient text-white">{recording}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )

};

function Pad({ clip, volume, handleClick, setRecording }) {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return() => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    },[])

    const handleKeyPress = (event) => {
        if(event.keyCode === clip.keyCode){
            playSound();
        }
    }

    const playSound = () => {
        const audioTag= document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 300);
        audioTag.currentTime = 0;
        audioTag.volume = volume;
        audioTag.play();
        handleClick(clip.id);
        setRecording((previous) => previous + clip.keyTrigger + " ");
    }

    return(
        <div className="">
            <div 
                id={clip.id}
                onClick={playSound}
                onKeyDown={handleKeyPress} 
                className={`btn btn-secondary p-4 ${active && "btn-warning"} drum-pad mx-2 `}
                style={{width: "70px"}}
            >
                <audio id={clip.keyTrigger} src={clip.url} className="clip" />
                {clip.keyTrigger}
            </div>
        </div>
    )

}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
