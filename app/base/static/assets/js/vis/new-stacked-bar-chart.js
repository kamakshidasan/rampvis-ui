
class NewStackedBarChart {
    CHART_WIDTH = document.getElementById('charts').offsetWidth;
    CHART_HEIGHT = window.innerHeight - Common.MAIN_CONTENT_GAP;

    constructor(options) {

        const newData=[]; 
        options.data.forEach((d,i)=>{
            d.values.forEach((item,index)=>{		
                let nameTemp = Object.keys(item);
                if(i == 0){
                    let obj = {};
                    obj["Week"] = item[nameTemp[0]];
                    obj[nameTemp[1]] = item[nameTemp[1]];
                    newData.push(obj);
                }else{
                    newData[index][nameTemp[1]] = item[nameTemp[1]];
                }
            })	
        })

        const data = this.processData(newData);
        
        const container = d3.select('#' + options.chartElement);
        container.innerHTML = '';

        const vis = pv.stackedBarChart()
            .margin({ top: 10, right: 10, bottom: 30, left: 50 })
            .colorScale(Common.Colors.SITUATION_SCALE)
            .width(this.CHART_WIDTH)
            .height(this.CHART_HEIGHT);
        const legend = pv.legend()
            .margin({ top: 3, right: 3, bottom: 3, left: 50 })
            .colorScale(Common.Colors.SITUATION_SCALE);

        const legendContainer = container.append('div');
        const svg = container.append('svg')
            .attr('width', this.CHART_WIDTH)
            .attr('height', this.CHART_HEIGHT);

        svg.datum(data).call(vis);
        legendContainer.datum(data.columns).call(legend);
    }

    processData(data) {
        // The first column is for time
        const columns = data.columns = Object.keys(data[0]).slice(1);
        data.forEach(d => {
            columns.forEach(c => {
                d[c] = this.preprocessValue(d[c])
            });
        });

        // Exclude weeks with all 0
        data = data.filter(d => data.columns.some(att => d[att]));

        const parseWeek = d3.timeParse("%Y-%m-%d");//%d-%b-%y
        data.forEach(d => {
            d.time = parseWeek(d.Week);
            d.label = d3.timeFormat('%b %d')(d.time);
        });

        data.columns = columns;
        return data;
    }

    preprocessValue(s) {
        return typeof(s) === 'number' ? s : parseInt(s.replace(',', '').trim());
    }
}