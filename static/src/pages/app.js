const commonPathImages = '../../src/images/';
const commonFilePath = '../../pages/'
const projects = [
    {   
        ID: 1,
        name: 'Homepage Dr. Antonio Barone',
        description: 'Site responsivo para celulares, tablets, notebooks e tablets.',
        imagePath: commonPathImages + 'homepageDrAntonio.png',
        technologies: ['HTML5, CSS3, JavaScript'],
        categories: ['Homepage', 'Projeto real'],
        rating: 9,
        link: 'https://drantoniobarone.com.br/'
    },
    {   
        ID: 2,
        name: 'Máquina geradora de citações',
        description: 'Aplicativo para gerar citações de personalidades e posterior compartilhamento.',
        imagePath: commonPathImages + 'randomQuoteMachine.png',
        technologies: ['HTML5, CSS3, JavaScript','React.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 6,
        link: commonFilePath + 'randomQuoteMachine/index.html'
    },
    {   
        ID: 3,
        name: 'Visualizador de linguagem de marcação',
        description: 'Aplicativo para vizualização de texto usando linguagem de marcação.',
        imagePath: commonPathImages + 'markdownPreview.png',
        technologies: ['HTML5, CSS3, JavaScript','React.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 6.5,
        link: commonFilePath + 'MarkdownPreviwer/index.html'
    },
    {   
        ID: 4,
        name: 'Bateria Eletrônica',
        description: 'Aplicativo que simula uma bateria eletrônica',
        imagePath: commonPathImages + 'drumMachine.png',
        technologies: ['HTML5, CSS3, JavaScript', 'Bootstrap', 'React.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 7,
        link: commonFilePath + 'drumMachine/index.html'
    },
    {   
        ID: 5,
        name: 'Relógio Pomodoro',
        description: 'Aplicativo para monitorar atividades usando o método Pomodoro',
        imagePath: commonPathImages + '.png',
        technologies:  ['HTML5, CSS3, JavaScript', 'Bootstrap', 'React.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 8,
        link: commonFilePath + 'PomodoroTimer/index.html'
    },
    {   
        ID: 6,
        name: 'Gráfico PIB Estados Unidos',
        description: 'Gráfico de barras do PIB Americano desde 1946 até 2015',
        imagePath: commonPathImages + '',
        technologies:  ['HTML5, CSS3, JavaScript', 'D3.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 7,
        link: commonFilePath + 'dataD3/'+  'barChart/index.html'
    },
    {   
        ID: 7,
        name: 'Gráfico Dopping em ciclistas',
        description: 'Gráfico de dispersão do dopping em cilistas com os tempos mais rápidos em um trecho do tour de France',
        imagePath: commonPathImages + '',
        technologies:  ['HTML5, CSS3, JavaScript', 'D3.js'],
        categories: ['FreeCode Camp projeto', 'Estudo de caso'],
        rating: 7.5,
        link: commonFilePath + 'dataD3/'+  'scatterPlot/index.html'
    }

];

const namesList = projects.map(item => {return item.name;});

function sortedArray(list){
    const sortedList = [...list];
    return sortedList.sort();
}

const technologiesList = projects.reduce((list, item) => {
    item.technologies.map((element) => {
        if(!list.includes(element)){
            list.push(element)
        }
    })
    return sortedArray(list);
}, []);

const ratingList = projects.map(item => {return item.rating;});

const categoriesList = projects.reduce((list, item) => {
    item.categories.map((element) => {
        if(!list.includes(element)){
            list.push(element);
        }
    })
    return sortedArray(list);
}, []);

// React 
class App extends React.Component{


//   constructor(props) {
//     super(props);
//     this.selectRef = React.createRef();
//   }

//   handleButtonClick = () => {
//     if (this.selectRef.current.multiple) {
//       console.log("Multiple selection is enabled");
//     } else {
//       console.log("Multiple selection is disabled");
//     }
//   };

//   render() {
//     return (
//       <div>
//         <select ref={this.selectRef} multiple>
//           {/* options */}
//         </select>
//         <button onClick={this.handleButtonClick}>Check Multiple</button>
//       </div>
//     );
//   }
// }



    constructor(props){
        super(props);
        this.state = {
            selectedInput1: 'relevancia',
            input2List: ['Ordem crescente', 'Ordem decrescente'],
            selectedInput2: ['Ordem crescente']
        };
        this.handleSelect1 = this.handleSelect1.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
    }
    
    handleSelect1(event){
        this.setState({selectedInput1: event.target.value});
        const value = event.target.value;
        if(value == 'relevancia' || value == 'nome'){
            this.setState({input2List: ['Ordem crescente', 'Ordem decrescente']});
            // this.setState({selectedInput2: ['Ordem crescente']})
        }else if(value == 'tecnologias'){
            this.setState({input2List: technologiesList});
            this.setState({selectedInput2: ['React.js']});
        }else if(value == 'categorias'){
            this.setState({input2List: categoriesList});
            this.setState({selectedInput2: ['Projeto real']})
        }
    }

    handleSelect2(event){
        const selectedOptions = Array.from(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
        this.setState({selectedInput2: selectedOptions});
    }

    render(){
        return(
            <div>
                <div>
                    <div className="container-fluid bg-light" style={{minHeight: '76px'}}></div>
                    <div className="container-fluid bg-light text-center pb-2">
                        <p className="display-1 pb-4">Projetos</p>
                        <div className='d-flex flex-row'>
                            <select className="form-select form-select-lg mb-3 mx-2" aria-label=".form-select-lg example" multiple={false} value={this.state.selectedInput1} onChange={this.handleSelect1}>
                                <option defaultValue value="relevancia">Relevância</option>
                                <option value="nome">Nome</option>
                                <option value="tecnologias">Tecnologias</option>
                                <option value="categorias">Categorias</option>
                            </select>
                            <select 
                                className="form-select form-select-lg mb-3 mx-2" 
                                aria-label=".form-select-lg example" 
                                multiple={this.state.selectedInput1 == 'tecnologias'? true : this.state.selectedInput1 == 'categorias' ? true: false} 
                                size={this.state.selectedInput1 == 'tecnologias'? 4 : this.state.selectedInput1 == 'categorias' ? 4 : 1} 
                                value={
                                    this.state.selectedInput1 == 'nome' || this.state.selectedInput1 == 'relevancia' ? this.state.selectedInput2[0] : this.state.selectedInput2
                                }
                                onChange= {this.handleSelect2}>
                                {this.state.input2List.map((item, index) =>{
                                    return(<option value={item} key={index}>{item}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <Project 
                            whatFilter = {this.state.selectedInput1} 
                            howToFilter = {this.state.selectedInput1 == 'relevancia' ||  this.state.selectedInput1 == 'nome' ? this.state.selectedInput2[0] : this.state.selectedInput2} 
                    />
                    </div>
                </div>
            </div>
        )
    }
}

const initialState = () => {
    let projectsToRender = [];     
    let projectsRanked = sortedArray(projects.map( item => {
        return [item.rating, item.ID]
    }))
    for(let i = 0; i < projectsRanked.length; i++ ){
        const foundProject = projects.find(item => item.ID == projectsRanked[projectsRanked.length - i - 1][1])
        if(foundProject){projectsToRender.push(foundProject)}
    }
    return projectsToRender
}

class Project extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            projects: initialState()
        }
    }

    componentDidUpdate(prevProps){

        if(prevProps.whatFilter !== this.props.whatFilter || prevProps.howToFilter !== this.props.howToFilter){
            let projectsToRender = [];
            if(this.props.whatFilter == 'relevancia'){            
                let projectsRanked = sortedArray(projects.map( item => {
                    return [item.rating, item.ID]
                }));
    
                if(this.props.howToFilter == 'Ordem decrescente'){
                    for(let i = 0; i < projectsRanked.length; i++ ){
                        const foundProject = projects.find(item => item.ID == projectsRanked[i][1])
                        if(foundProject){projectsToRender.push(foundProject)}
                    }
                }else if(this.props.howToFilter == 'Ordem crescente'){
                    for(let i = 0; i < projectsRanked.length; i++ ){
                        const foundProject = projects.find(item => item.ID == projectsRanked[projectsRanked.length - i - 1][1])
                        if(foundProject){projectsToRender.push(foundProject)}
                    }
                }   
            }else if(this.props.whatFilter == 'nome'){
                let projectsRanked = sortedArray(projects.map( item => {
                    return [item.name, item.ID]
                }));
    
                if(this.props.howToFilter == 'Ordem crescente'){
                    for(let i = 0; i < projectsRanked.length; i++ ){
                        const foundProject = projects.find(item => item.ID == projectsRanked[i][1])
                        if(foundProject){projectsToRender.push(foundProject)}
                    }
                }else if(this.props.howToFilter == 'Ordem decrescente'){
                    for(let i = 0; i < projectsRanked.length; i++ ){
                        const foundProject = projects.find(item => item.ID == projectsRanked[projectsRanked.length - i - 1][1])
                        if(foundProject){projectsToRender.push(foundProject)}
                    }
                }
            }else if(this.props.whatFilter == 'tecnologias'){
                projects.map(item => {
                    let itemsChecked = item.technologies.map(element => {
                        let output = 0;
                        for(let i = 0; i < this.props.howToFilter.length; i++ ){
                            if(element == this.props.howToFilter[i]){
                                ++output
                            }
                        }
                        return output

                    })
                    if(eval(itemsChecked.join(' + '))){
                        projectsToRender.push(item)
                    }

                })
            }
            else if(this.props.whatFilter == 'categorias'){
                projects.map(item => {
                    let itemsChecked = item.categories.map(element => {
                        let output = 0;
                        for(let i = 0; i < this.props.howToFilter.length; i++ ){
                            if(element == this.props.howToFilter[i]){
                                ++output
                            }
                        }
                        return output

                    })
                    if(eval(itemsChecked.join(' + '))){
                        projectsToRender.push(item)
                    }

                })
            }
            this.setState({projects: projectsToRender})

        }
        
    }

    render(){

        const items = this.state.projects.map(item => {

            return(
                <div className="card m-2 w-98" key={item.ID}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={item.imagePath} className="img-fluid rounded-start" alt='' />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.technologies.join(', ')}</p>
                                <p className="card-text"><small className="text-body-secondary">
                                    <a href={item.link}
                                    target="_blank" 
                                    rel="noopener noreferrer">Acesse a página do projeto aqui</a>
                                </small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return(
            <div>
                {items}
            </div>
        )
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
