var COLOR_CASES = '#e93516';   // orange
var COLOR_DEATHS = '#f0852d';   // orange
var COLOR_TESTS = '#2a9d8f';    // green
var COLOR_HOSPITAL = '#264653'; // blue

var nhsBoardField = '';
var latestUpdateTime = '';

class CountryOverview {
    CHART_WIDTH = 1000
    CHART_HEIGHT = 400

    constructor(options) {
        console.log('Input data', options.data);

        var div = d3.select('#' + options.chartElement)
            .append('div')
                .attr('class', 'vis-example-container')
    
        nhsBoardField = Object.keys(options.data[0].values[0])[1];
        latestUpdateTime = console.log(options.data[0].values[options.data[0].values.length-1].index);
        var data = options.data;

        var config = {  
            layout: ['summary',['regions', 'regions2']],
            groups: [
                {
                    name: 'summary',
                    title: 'Summary',
                    layout: [['cases'],['deaths'],['patients']]
                }, 
                {
                    name: 'regions',
                    title: 'Regions',
                    layout: ['regionsTestsNorm','covidInHospital','covidInICU']
                },
                {
                    name: 'regions2',
                    title: '',
                    layout: ['covidDeaths','allDeaths']
                }
            ], 
            panels:[
                {
                    name: 'cases', 
                    title: 'New Cases',
                    dataField: 'Testing - New cases reported',
                    type: 'stats',
                    color: COLOR_CASES,
                    data: data[0].values,
                    mode: dashboard.MODE_DAILY,
                },{
                    name: 'deaths',
                    title: 'COVID-19 Patients in Hospital',
                    dataField: 'COVID-19 patients in hospital - Confirmed',
                    type: 'stats',
                    color: d3.color(COLOR_HOSPITAL).brighter(1.5),
                    data: data[1].values,
                    mode: dashboard.MODE_CUMULATIVE
                },{
                    name: 'patients',
                    title: "Covid Patients in ICU",
                    dataField: "COVID-19 patients in ICU - Confirmed",
                    color: COLOR_HOSPITAL,
                    type: 'stats',
                    data: data[2].values,
                    mode: dashboard.MODE_CURRENT
                },
                {
                    data: data[3].values,
                    name: 'regionsTestsNorm',
                    title: 'Tests per 1000 people',
                    type: 'cartogram',
                    color: COLOR_TESTS, 
                    normalized: true
                },
                {
                    data: data[4].values,
                    name: 'covidInHospital',
                    title: 'Covid Patients in Hospital',
                    color: d3.color(COLOR_HOSPITAL).brighter(1.5),
                    type: 'cartogram',
                    normalized: true
                },
                {
                    data: data[5].values,
                    name: 'covidInICU',
                    title: 'Covid Patients in ICU',
                    type: 'cartogram',
                    color: COLOR_HOSPITAL,
                    normalized: true
                },
                {
                    data: data[6].values,
                    name: 'covidDeaths',
                    title: 'Weekly Covid Deaths',
                    type: 'cartogram',
                    color: COLOR_DEATHS,
                    normalized: true 
                },
                {
                    data: data[7].values,
                    name: 'allDeaths',
                    title: 'Weekly All Deaths',
                    type: 'cartogram',
                    color: d3.color(COLOR_DEATHS).darker(1),
                    normalized: true
                }
            ]
        }

        dashboard.createDashboard(div, config)
    }
}