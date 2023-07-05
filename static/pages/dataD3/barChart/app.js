
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const projectName = 'Bar-Chart';
const width = 800;
const height = 400;
// 275 = size of the array fetched
const barWidth = width/275; 

// Create elements
const toolTip = d3.select('#canva')
                    .append('div')
                    .attr('id', 'toolTip')
                    .style('opacity', 0);

const overlay = d3.select('#canva')
                    .append('div')
                    .attr('class', 'overlay')
                    .style('opacity', 0);


const svgContainer = d3.select('#canva')
                        .append('svg')
                        .attr('width', width + 100)
                        .attr('height', height + 60);


d3.json(url)
    .then(data => {
        let years = data.data.map(function(item){

            let quarter;
            let temp = item[0].substring(5,7)
            switch(temp){
                case '01':
                    quarter = 'Q1'
                    break
                case '04':
                    quarter = 'Q2'
                    break
                case '07':
                    quarter = 'Q3'
                    break
                case '10':
                    quarter = 'Q4'
                    break
            }

            return item[0].substring(0,4) + ' ' +  quarter;
        })

        let yearsDate = data.data.map(function(item){
            return new Date(item[0]);
        })

        let xMaxValue = new Date(d3.max(yearsDate));
        xMaxValue.setMonth(xMaxValue.getMonth() + 3);

        let xScale = d3.scaleTime()
                        .domain([d3.min(yearsDate), xMaxValue])
                        .range([0, width]);

        let xAxis = d3.axisBottom().scale(xScale);

        svgContainer.append('g')
                    .call(xAxis)
                    .attr('id', 'x-axis')
                    .attr('transform', 'translate(60, 400)');
        
        let gdp = data.data.map(function(item){
            return item[1];
        })

        let gdpMaxValue = d3.max(gdp);

        let linearScale = d3.scaleLinear().domain([0, gdpMaxValue]).range([0, height]);

        let scaledGDP = gdp.map(function (item) {
            return linearScale(item);
        });

        let yScale = d3.scaleLinear().domain([0, gdpMaxValue]).range([height, 0]);

        let yAxis = d3.axisLeft().scale(yScale);

        svgContainer.append('g')
                    .call(yAxis)
                    .attr('id', 'y-axis')
                    .attr('transform', 'translate(60, 0)');
        
        d3.select('svg')
            .selectAll('rect')
            .data(scaledGDP)
            .enter()
            .append('rect')
            .attr('data-date', function(d,i){
                return data.data[i][0];
            })
            .attr('data-gdp', function(d,i){
                return data.data[i][1];
            })
            .attr('class', 'bar')
            .attr('x', function(d,i){
                return xScale(yearsDate[i])
            })
            .attr('y', function(d){
                return height- d;
            })
            .attr('width', barWidth)
            .attr('height', function(d){
                return d
            })
            .attr('index', (d, i) => i)
            .style('fill', '#33adff')
            .attr('transform', 'translate(60, 0)')
            .on('mouseover', function(event, d){
                let i = this.getAttribute('index');
                overlay 
                    .transition()
                    .duration(0)
                    .style('heigth', d + 'px')
                    .style('width', barWidth + 'px')
                    .style('opacity', 0.9)
                    .style('left', i * barWidth + 0 + 'px')
                    .style('top', height - d + 'px')
                    .style('transform', 'translateX(60px)');

                toolTip
                    .transition()
                    .duration(200)
                    .style('opacity', 0.9);
                toolTip
                    .html(
                        years[i] + 
                        '<br>' +
                        '$ ' +
                        gdp[i] +
                        'Billion'
                    )
                    .attr('data-date', data.data[i][0])
                    .attr('left', i * barWidth + 30 + 'px')
                    .attr('top', height - 100 + 'px')
                    .style('transform', 'translateX(60px)')                    
            })
            .on('mouseon', function(){
                toolTip.transition().duration(200).style('opacity', 0);
                overlay.transition().duration(200).style('opacity', 0);
            });
    })
