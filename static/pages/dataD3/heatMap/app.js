const projectName = 'Heat Map'
const title = 'Monthly Global Land-Surface Temperature';
const subTitle = '1753 - 2015: base temperature 8.66℃';

const margin = {
    top: 20,
    right: 20,
    bottom: 120,
    left: 100
}

const width = 1200;
const height = 800;

// Create the project container
let container = d3
    .select('body')
    .append('div')
    .attr('id', 'anchor')
    .attr('width', width)
    .attr('heigth', height);

// Create the tooltip
let tooltip = d3
    .select('#anchor')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

// Create the svg container
let svgContainer = d3
    .select('#anchor')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'graph')
    // .attr('transform', 'translate('  + margin.left/2 + ',' + margin.top + ')');

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

// Create the axis

let x = d3.scaleLinear().range([0, width - margin.left - margin.right]);
// let xAxis = d3.axisBottom(x).tickFormat(d3.format('d')).tickSize(10,2);


let yScale = d3
    .scaleBand()
    // months
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .rangeRound([0, height - margin.top - margin.bottom])
    .padding(0);

let yAxis = d3
    .axisLeft()
    .scale(yScale)
    .tickValues(yScale.domain())
    .tickFormat(function (month) {
        let date = new Date(0);
        date.setUTCMonth(month);
        let format = d3.utcFormat('%B');
        return format(date);
    })
    .tickSize(10, 1);


// Colors from: https://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=5
let colorScheme = ['#d7191c','#fdae61','#ffffbf','#abd9e9','#2c7bb6'];
colorScheme = colorScheme.reverse();

// Fecth the data
d3.json(url)
    .then(data => {    
    x.domain([
        d3.min(data.monthlyVariance, function(d){
            return d.year
        }),
        d3.max(data.monthlyVariance, function(d){
            return d.year
        })
    ]);

    let xScale = d3.scaleBand()
        .domain(data.monthlyVariance.map(value =>{
            return value.year;
        }))
        .rangeRound([0, width - margin.left])
        .padding(0);
    

    let xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickValues(
            xScale.domain().filter(function (year) {
            // set ticks to years divisible by 10
            return year % 10 === 0;
            })
        )
        .tickFormat(function (year) {
            var date = new Date(0);
            date.setUTCFullYear(year);
            var format = d3.utcFormat('%Y');
            return format(date);
        })
        .tickSize(10, 1);

    svgContainer
        .append('g')
        .attr('id', 'x-axis')
        .attr('class', 'x axis')
        // .attr('transform', 'translate(' + (margin.left + 10) + ',' + (height - margin.top - margin.bottom + 50) + ')')
        .attr('transform', 'translate(' + margin.left + ',' + (height - margin.top - margin.bottom + 50) + ')')
        .call(xAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'translate(' + width/2 + ',' + 40 + ')')
        .attr('fill', '#000')
        .style('text-anchor', 'middle')
        .text('Year');

    svgContainer
        .append('g')
        .attr('id', 'y-axis')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (margin.left) + ',' + 50 +  ')')
        .call(yAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#000')
        .attr('y', -60)
        .attr('dy', '2%')
        .attr('x', - height * 0.42)
        .style('text-anchor', 'middle')
        .text('Month');

    let variance = data.monthlyVariance.map(function (val) {
        return val.variance;
    });
    
    const minTemp = (data.baseTemperature + Math.min.apply(null, variance)).toFixed(1);
    const maxTemp = (data.baseTemperature + Math.max.apply(null, variance)).toFixed(1);

    let legendThreshold = d3.scaleThreshold()
        .domain((function(min, max, count){
            let arr =[];
            let base = Number(min);
            let step = Number((max - min)/count);

            for(let i = 1; i < colorScheme.length ; i++ ){
                arr.push(base + i * step)
            }
            return arr
        })(minTemp, maxTemp, colorScheme.length))
        .range(colorScheme)

    let legendX = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .range([0, 200]);
    
    let legendXAxis = d3
        .axisBottom()
        .scale(legendX)
        .tickSize(10, 0)
        .tickValues(legendThreshold.domain())
        .tickFormat(d3.format('.1f'));

    let legend = svgContainer
        .append('g')
        // .classed('legend', true)
        .attr('id', 'legend')
        .attr(
          'transform',
          'translate(50,' + (height * 0.98 - margin.top) + ')'
        );

    legend
        .append('g')
        .selectAll('rect')
        .data(
            legendThreshold.range().map(function (color) {
            let d = legendThreshold.invertExtent(color);
            
            if (d[0] === undefined) {
              d[0] = legendX.domain()[0];
            }
            if (d[1] === undefined) {
              d[1] = legendX.domain()[1];
            }
            return d;
          })
        )
        .enter()
        .append('rect')
        .style('fill', function (d) {
            return legendThreshold(d[0]);
        })
        .attr('x', d => legendX(d[0]))
        .attr('y', -20)
        .attr('width', d => d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : legendX(null))
        .attr('height', 20);

    legend
        .append('g')
        .attr('transform', 'translate(0,0)')
        .call(legendXAxis);
    
    svgContainer
        .append('g')
        .classed('map', true)
        .attr(
            'transform', 
            'translate(' + margin.left + ',' + 50 + ')')
        .selectAll('rect')
        .data(data.monthlyVariance)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('data-month', function(d){
            return d.month - 1
        })
        .attr('data-year', function(d){
            return d.year
        })
        .attr('data-temp', function(d){
            return data.baseTemperature + d.variance
        })
        .attr('x', function(d){
            return xScale(d.year)
        })
        .attr('y', function(d){
            return yScale(d.month - 1)
        })
        .attr('width', d => xScale.bandwidth(d.year))
        .attr('height', d => yScale.bandwidth(d.month))
        .attr('fill', function (d) {
            return legendThreshold(data.baseTemperature + d.variance);
        })
        .style('padding', 0)
        .on('mouseover', function(event, d){
            let showDate = new Date(d.year, d.month);
            tooltip.attr('data-year', d.year)
            let str =
                "<span class='date'>" + "Date: " +
                d3.utcFormat('%Y - %B')(showDate) +
                '</span>' +
                '<br />' +
                "<span class='temperature'>" + "Temperature: " +
                d3.format('.1f')(data.baseTemperature + d.variance) +
                '&#8451;' +
                '</span>' +
                '<br />' +
                "<span class='variance'>" + "Variance: " +
                d3.format('+.1f')(d.variance) +
                '&#8451;' +
                '</span>';
            tooltip.html(str)
            tooltip.style('opacity', 0.95)
            tooltip.style('left', (event.pageX + 20) + 'px')
            tooltip.style('top', event.pageY + 'px')

        })
        .on('mouseout', function(){
            tooltip.style('opacity',0)
        })
        
        svgContainer
            .append('text')
            .attr('id', 'title')
            .attr('transform', 'translate(' + (width/2 - margin.left/2)  + ',' + margin.top/2 + ')')
            .text(title)

        svgContainer
            .append('text')
            .attr('id', 'description')
            .attr('transform', 'translate(' + (width/2 - margin.left/2)  + ',' + (margin.top + 20) + ')')
            .text(subTitle)      
    
})
    .catch(err => console.error(err));


