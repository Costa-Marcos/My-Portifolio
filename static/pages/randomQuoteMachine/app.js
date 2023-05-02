
// React

const getRandom = () => {
    console.log(data.length)

}

function App () {

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setaRandomQuote] = React.useState('');
    const [colors, setColor] = React.useState("fff");

    React.useEffect(() =>{
        async function fetchData (){
            const url = 'https://type.fit/api/quotes';
            const response = await fetch(url)
            const data = await response.json();

            setQuotes(data);
            const randomIndex = Math.floor(Math.random() * data.length)
            setaRandomQuote(data[randomIndex])
        }
        fetchData();
    },[])

    const getNewQuote = () =>{

        const colors = ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590", "#277DA1", "#154360"];
        const randomColorIndex = Math.floor(Math.random() * colors.length);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setaRandomQuote(quotes[randomIndex]);
        setColor(colors[randomColorIndex]);
    }
    const txtQuote = `"${randomQuote.text}", ${randomQuote.author}`
    return (
        <div style={{backgroundColor: colors}} className='body-container'>
            <div className="card-container">
                <div id='quote-box' className=''>
                    <div style={{borderBottom: `solid 0.2rem ${colors}`}}>
                        <h1 style={{color: colors, fontSize: '3rem',fontWeight: 800}}>INSPIRATIONAL QUOTE</h1>
                    </div>
                    <div style={{borderBottom: `solid 0.2rem ${colors}`}}>{randomQuote? (
                        <>
                            <h3 style={{fontSize: '2.2rem'}} id="author">{randomQuote.author || 'No author'}</h3>
                            <p  style={{fontSize: '2rem'}} id="text">{`"${randomQuote.text}"`}</p>
                        </>
                        ):(<h2>Loading</h2>)}
                    </div>
                    <div className='buttons'>
                        <div className="btn-primary">
                            <button id="new-quote" type='button' className='btn' onClick={getNewQuote}>New Quote</button>
                        </div>
                        <div className="btn-socials">
                            <a id="tweet-quote" href={"https://twitter.com/intent/tweet?hastags=quote&text=" + encodeURIComponent(txtQuote)}
                            className="btn-tweet" target='blank'>
                                <i class="fa fa-twitter fa-2xl"></i>
                            </a>
                            <a href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tag=quotes' + encodeURIComponent(randomQuote.author) + "&content=" + encodeURIComponent(randomQuote.text) + "&canonicalURl=https%3A%2F%2Fwww.tumblr.com%2FbuttonshareSource=tumblr_share"} target='blank' className="btn-tweet">
                                <i className="fa fa-tumblr fa-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));