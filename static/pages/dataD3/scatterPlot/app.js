// D3 Scatter plot graph;

const projectName = 'Scatter Plot';
const title = 'Doping in Professional Bicycle Racing' ;
const subTitle = "35 Fastest times up Alpe d'Huez";

const margin = {
    top:100,
    bottom:50,
    left: 100,
    right:10,
}

const width = window.innerWidth * 0.9 - margin.left - margin.right;
const height =  window.innerHeight * 0.9 - margin.bottom - margin.top;

let x = d3.scaleLinear().range([0, width - 50]);
let y = d3.scaleTime().range([0, height]);

let xAxis = d3.axisBottom(x).tickFormat(d3.format('d'));

let timeFormat = d3.timeFormat('%M:%S'); 
let yAxis = d3.axisLeft(y).tickFormat(timeFormat);

// Define the div for the tooltip
let container = d3
    .select('body')
    .append('div')
    .attr('id', 'anchor')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

let div = d3
    .select('#anchor')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

let svgContainer = d3
    .select('#anchor')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'graph')
    .append('g')
    .attr('transform', 'translate(' + (margin.left + margin.right) + ',' + margin.top + ')');
    
const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

d3.json(url)
    .then(data => { 
        data.map(function(d) {
            let arrParsedTime = d.Time.split(':')
            d.Time =  new Date(1970, 0, 1, 0, arrParsedTime[0], arrParsedTime[1])
        });

    x.domain([
        d3.min(data,function(d) {
            return d.Year - 1;
        }),
        d3.max(data, function(d){
            return d.Year + 1;
        })
        
    ]);

    y.domain(d3.extent(data, function(d){ 
        return d.Time}));

    svgContainer
        .append('g')
        .attr('class', 'x axis')
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,'+ height +')')
        .call(xAxis)
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', width)
        .attr('y', -50)
        .style('text-anchor', 'middle')
        .text('Year')
    
    svgContainer
        .append('g')
        .attr('class', 'y axis')
        .attr('id', 'y-axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', -6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Best Time (minutes)');

    svgContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -290)
        .attr('y', -55)
        .style('font-size', 18)
        .text('Time in Minutes');

    svgContainer
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 6)
        .attr('cx', function (d) {
            return x(d.Year);
        })
        .attr('cy', function (d) {
            return y(d.Time);
        })
        .attr('data-xvalue', function (d) {
            return d.Year;
        })
        .attr('data-yvalue', function (d) {
            return d.Time.toISOString();
        })
        .style('fill', function (d) {
            if(d.Doping != ""){
                return '#842626'
            }else{
                return '#49985f'
            }
        })
        .style('stroke', 'black') // Set the border color to black
        .style('stroke-width', '1px') // Set the border width to 1 pixel
        .on('mouseover', function (event, d) {
            div.style('opacity', 0.99);
            div.attr('data-year', d.Year);
            div
                .html(
                    d.Name +
                    ': ' +
                    d.Nationality +
                    '<br/>' +
                    'Year: ' +
                    d.Year +
                    ', Time: ' +
                    timeFormat(d.Time) +
                    (d.Doping ? '<br/><br/>' + d.Doping : '')
            )
                .style('left', event.pageX + 'px')
                .style('top', event.pageY + 'px');
          })
        .on('mouseout', function () {
            div.style('opacity', 0);
        });
          

        svgContainer
            .append('text')
            .attr('id', 'title')
            .attr('x', width/2)
            .attr('y', -margin.top/1.8)
            .style('font-size', '30px')
            .style('text-anchor', 'middle')
            .text(title)
        
        svgContainer
            .append('text')
            .attr('id', 'subtitle')
            .attr('x', width/2)
            .attr('y', -margin.top/3.2)
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text(subTitle)
        
        let legendContainer = svgContainer.append('g').attr('id', 'legend');
        let legend = legendContainer
            .selectAll('#legend')
            .data(['#842626', '#49985f'])
            .enter()
            .append('g')
            .attr('class', 'legend-label')
            .attr('transform', function(d,i){
                console.log(d,i)
                return 'translate(0,' + (height/2 - i * 33) + ')';
            })
        
        legend
            .append('rect')
            .attr('x', width - 30)
            .style('width', 30)
            .style('height', 30)
            .style('fill', function(d){
                return d
            })
            .style('stroke', 'black')
        
        legend
            .append('text')
            .attr('x', width - 35)
            .attr('y', 19)
            .text(function(d){
                if (d == '#842626' ) {
                    return 'Riders with doping allegations';
                } else {
                    return 'No doping allegations';
                }
            })
            .style('text-anchor', 'end')
            ;



})
.catch(err => console.log(err));


    

    
