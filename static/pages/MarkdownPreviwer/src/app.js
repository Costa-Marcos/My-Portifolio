const initialState = `# Welcome to my React Markdown Previewer! 

## This is a sub-heading... 

### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`

// React

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            text: initialState
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

        this.setState({
            text: event.target.value
        });
    }

    render(){

        const markdown = marked.parse(this.state.text, {breaks:true})

        return(
            <div className="container">
                <h1 id="title">Markdown Previwer</h1>
                <div className="side-by-side">
                    <div className="small-container">
                        <h2 id="subtitle">Insert your markdown text here</h2>
                        <div>
                            <textarea id="editor" onChange={this.handleChange} value={this.state.text}></textarea>
                        </div>
                    </div>
                    <div className="small-container">
                    <h2 id="subtitle">The Result:</h2>
                        <div id="preview" dangerouslySetInnerHTML={{__html:markdown}}></div>
                    </div>
                </div>
            </div>
        )
    }

}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
