const projectName = 'Choroplet Map';
const title = 'United States Educational Attainment';
const description = "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)";

const margin = {
    top: 50,
    left:50,
    bottom:50,
    right:50
}

const width = 1200;
const height = 800;

let container = d3
    .select('body')
    .append('div')
    .attr('id', 'anchor')
    .attr('width', width)
    .attr('height', height);

let tooltip = d3
    .select('#anchor')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

let svgContainer = d3
    .select('#anchor')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'map')

let path = d3.geoPath();

const urlEducationData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

const urlPathData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';


Promise.all([d3.json(urlEducationData), d3.json(urlPathData)])
    .then(data => ready(data[0], data[1]))        
    .catch(err => console.error(err));

function ready(usEducation, usMap){
    
    const bachelorPercentual = usEducation.map(item =>{
        return item.bachelorsOrHigher
    })

    const minPercentual = (Math.min.apply(null, bachelorPercentual)).toFixed(1);
    const maxPercentual = (Math.max.apply(null, bachelorPercentual)).toFixed(1);

    let legendX = d3
        .scaleLinear()
        .domain([minPercentual, maxPercentual])
        .range([0,300])

    let legendThreshold = d3
        .scaleThreshold()
        .domain((function(min, max, count){
            let arr = [];
            let base = Number(min);
            let step = Number((max - min)/count);

            for(let i = 0; i <= 8; i++){

                arr.push(base + i * step)
            }

            return arr
        })(minPercentual, maxPercentual, 8))
        .range(d3.schemePurples[9])
            
    let legendXAxis = d3
        .axisBottom()
        .scale(legendX)
        .tickSize(15)
        .tickValues(legendThreshold.domain())
        .tickFormat(
            function(d){
                return Math.round(d) + '%';
            }
        )

        
    
    let legend = svgContainer
        .append('g')
        .attr('id', 'legend')
        .attr('transform', 'translate(' + width/2 + ', 50)')

    legend
        .append('g')
        .selectAll('g')
        .data(
            legendThreshold.range().map(function(color){
                let d = legendThreshold.invertExtent(color);

                if(d[0] === undefined) {
                   d[0] = legendX.domain()[0];
                }
                if(d[1] === undefined){
                    d[1] = legendX.domain()[1];
                }
                return d;
            })
        )
        .enter()
        .append('rect')
        .style('fill', function(d){
            return legendThreshold(d[0]);
        })
        .attr('x', d => legendX(d[0]))
        .attr('y', 20)
        .attr('width', d => d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : null)
        .attr('height', 25)
        .attr('transform', 'translate(0, -45)')


    legend
        .append('g')
        .call(legendXAxis)
    
    svgContainer
        .append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(
            topojson.feature(usMap, usMap.objects.counties).features
        )
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('data-fips', function(d){return d.id})
        .attr('data-education', function (d) {
            let result = usEducation.filter(function (obj) {
                return obj.fips === d.id;
            });
            if (result[0]) {
                return result[0].bachelorsOrHigher;
            }

            return 0;
        })        
        .attr('fill', function(d){
            let result = usEducation.filter(function(obj) {
                return obj.fips === d.id;
            })
            if(result[0]) {
                return legendThreshold(result[0].bachelorsOrHigher)
            }
            return legendThreshold(0)
        })
        .attr('d', path)
        .style('padding', 0)
        .on('mouseover', function(event, d) {
            tooltip.html(function(){
                let str = usEducation.filter(function(obj) {
                    return obj.fips === d.id
                })
                if(str[0]){
                    return (
                        '<span>' +
                        str[0]['area_name'] + ', ' + 
                        str[0]['state'] + '</br> ' +
                        str[0]['bachelorsOrHigher'] + '%'+
                        '</span>'
                    )
                }
            });
            tooltip.attr('data-education', function () {
                let result = usEducation.filter(function (obj) {
                    return obj.fips === d.id;
                });
                if (result[0]) {
                    return result[0].bachelorsOrHigher;
                }
                return 0;
            });  
            tooltip.style('opacity', 0.95);
            tooltip.style('left', (event.pageX + 25) + 'px');
            tooltip.style('top', event.pageY + 'px');
            
        })
        .on('mouseout', function(){tooltip.style('opacity', 0)})

    svgContainer
        .append('div')
        .attr('id', 'title')
        .text(title)
    
    svgContainer
        .append('div')
        .attr('id', 'description')
        .text(description)

}   