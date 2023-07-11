const commonPathImages = '../../src/images/';
const commonFilePath = '../../../pages/'
const projects = [
    {   
        ID: 1,
        name: 'Homepage Dr. Antonio Barone',
        description: 'Site responsivo para celulares, tablets, notebooks e tablets.',
        imagePath: commonPathImages + 'homepageDrAntonio.png',
        technologies: 'HTML5, CSS e JavaScript',
        categories: ['Homepage', 'Real project'],
        rating: 7,
        link: 'https://drantoniobarone.com.br/'
    },
    {   
        ID: 2,
        name: 'Máquina geradora de citações',
        description: 'Aplicativo para gerar citações de personalidades e posterior compartilhamento.',
        imagePath: commonPathImages + 'randomQuoteMachine.png',
        technologies: 'React',
        categories: ['FreeCode Camp project', 'Case study'],
        rating: 6.0,
        link: commonFilePath + 'randomQuoteMachine/index.html'
    },
    {   
        ID: 3,
        name: 'Visualizador de linguagem de marcação',
        description: 'Aplicativo para vizualização de texto usando linguagem de marcação.',
        imagePath: commonPathImages + 'markdownPreview.png',
        technologies: 'React',
        categories: ['FreeCode Camp project', 'Case study'],
        rating: 6.3,
        link: commonFilePath + 'MarkdownPreviwer/index.html'
    },
    {   
        ID: 4,
        name: 'Bateria Eletrônica',
        description: 'Aplicativo que simula uma bateria eletrônica',
        imagePath: commonPathImages + 'drumMachine.png',
        technologies: 'React',
        categories: ['FreeCode Camp project', 'Case study'],
        rating: 6.6,
        link: commonFilePath + 'drumMachine/index.html'
    },
    {   
        ID: 5,
        name: 'Relógio Pomodoro',
        description: 'Aplicativo para monitorar atividades usando o método Pomodoro',
        imagePath: commonPathImages + 'drumMachine.png',
        technologies: 'React',
        categories: ['FreeCode Camp project', 'Case study'],
        rating: 6.9,
        link: commonFilePath + 'PomodoroTimer/index.html'
    }
];

const namesList = projects.map(item => {return item.name;});

const uniqueTechnologies = [];
const technologiesList = projects.reduce((list, item) => {
    if (!uniqueTechnologies.includes(item.technologies)) {
        uniqueTechnologies.push(item.technologies);
        list.push(item.technologies);
    }
    return list;
}, []);

const ratingList = projects.map(item => {return item.rating;});

const uniqueCategories = [];
const categoriesList = projects.reduce((list, item) => {
    (item.categories.reduce((acumulator, element) =>{
        if(!uniqueCategories.includes(element)){
            uniqueCategories.push(element)
            list.push(element)
        }
    },[]))
    return list
}, []);


// React 


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectInput1: '',
            selectInput2: [],
        };
        this.handleSelect1 = this.handleSelect1.bind(this);
    }
    
    handleSelect1(event){
        this.setState({selectInput1: event.target.value})
        const value = event.target.value
        if(value == 'relevancia' || value == 'nome'){
            this.setState({selectInput2: ['Ordem crescente', 'Ordem decrescente']});
        }else if(value == 'tecnologias'){
            this.setState({selectInput2: technologiesList});
        }else if(value == 'categorias'){
            this.setState({selectInput2: categoriesList});
        }
    }

    render(){
        return(
            <div>
                <div>
                    <div className="container-fluid bg-light" style={{minHeight: '76px'}}></div>
                    <div className="container-fluid bg-light text-center pb-2">
                        <p className="display-1 pb-4">Projetos</p>
                        <div className='d-flex flex-row'>
                            <select className="form-select form-select-lg mb-3 mx-2" aria-label=".form-select-lg example" multiple={false} value={this.state.selectInput1} onChange={this.handleSelect1}>
                                <option defaultValue value="relevancia">Relevância</option>
                                <option value="nome">Nome</option>
                                <option value="tecnologias">Tecnologias</option>
                                <option value="categorias">Categorias</option>
                            </select>
                            <select className="form-select form-select-lg mb-3 mx-2" aria-label=".form-select-lg example" multiple={false}>
                                {this.state.selectInput2.map((item, index) =>{
                                    return(<option value={item} key={index}>{item}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

class Project extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
