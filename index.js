function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("primary");
    
    React.useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randIndex]);
        }

        fetchData();
    }, []);

    const getNewQuote = () => {

        const colors = [
            "primary",
            "secondary",
            "success",
            "danger",
            "warning",
            "info",
            "dark"
        ];

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setRandomQuote(quotes[randIndex]);
        setColor(colors[randColorIndex]);
    }
    
    return (
        <div className={"bg-" + color} style={{minHeight: "100vh"}}>
            <div className="container pt-5">
            <div className="jumbotron">
                <div id="quote-box" className={"card text-" + color}>
                    <div className="card-header">
                        Quotes of the day
                    </div>
                    <div className="card-body">
                    {randomQuote ? (
                        <blockquote id="text" className="blockquote mb-0">
                            <h5 className="card-title">
                                &quot;{randomQuote.text}&quot;
                            </h5>
                            <p id="author" className="blockquote-footer text-right"><cite>{randomQuote.author || "No author"}</cite></p>
                        </blockquote>
                    ) : (
                        <h2>Loading</h2>
                    )}
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <a id="tweet-quote" href={
                            "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                            encodeURIComponent(
                                '"' + randomQuote.text+ '" ' + randomQuote.author
                            )
                        } 
                        target="_blank" className="btn btn-warning">
                            <i className="fa fa-twitter"></i>
                        </a>
                            <a href="" className="btn btn-danger">
                            <i className="fa fa-tumblr"></i>
                        </a>
                        </div>
                        <div className="col-6 text-right">
                            <button id="new-quote" onClick={getNewQuote} className="btn btn-primary">New Quote</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));