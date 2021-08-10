// Read the data
d3.csv("https://gist.githubusercontent.com/ichinichichi/5115fbbba58a29209fc3450235fd7236/raw/4c0dc5806466492f9476aba5e29aaeb0ba87fd34/FinalBillboardCharts.csv")

.then(function(data){

// We create a function called parse which turns parsed data into datetime format
const parse = d3.timeParse("%Y-%m-%d");


// Select that button
d3.select('button')
//   give it an on click event
  .on('click', function(){
      d3.selectAll('tr').remove();
      d3.selectAll('td.song-name').remove();

//     Select the text
    d3.selectAll('.text,.text2,.text3')
//     Remove the class hide
        .classed('hide', false)

//     Get the year value, node removes everything else from D3 and gives actual data
// As the date changes, you should use let instead of const. const variables are meant for values that do not change. 
// You can also initialize data as null or 0 first to make sure that everytime you select a new date, the previous one is removed.
    
      
 
      let date = parse(d3.select('#start').node().value)





// setYear will overwrite the year
// get string from date object
        var month = date.getMonth();
        var year = date.getYear();
        var day = date.getDate();

// create a new array with birthday songs

const array= data.filter((d)=>{
      var coldate = parse(d.Date.trim())
      var colmonth = coldate.getMonth();
      var colyear = coldate.getYear();
      var colday = coldate.getDate();

      return month===colmonth && day===colday && colyear >= year
})

// Creating a table

d3.select('#tablesongs')
// create a row for each single row in array
  .selectAll('tr')
  .data(array)
  // create a row with join
  .join('tr')
  // for every single row we want to do sth, want to add a td for birthday, artist, and title
  .each(function(d){
      const row = d3.select(this)
      row.append('td')
      .text(d.Date.split("-")[0])
      
      row.append('td')
      .text(d.Artist)

      row.append('td')
      .text(d.Song)


  })



/// This is where third page barchart starts




/// write a comparison function
function compare( a, b ) {
  if ( +a.Week < +b.Week ){
    return -1;
  }
  if ( +a.Week > +b.Week ){
    return 1;
  }
  return 0;
}

// sort the array of objects by week
const sorted = array.sort(compare).slice(-10).reverse();
console.log(sorted)
console.log(d3.max(sorted, d=>+d.Week))
const barScale = d3.scaleLinear().domain([0,d3.max(sorted, d=>+d.Week)]).range([0, 100])

d3.select('#my_dataviz')
  .append('table')
// create a row for each single row in array
  .selectAll('tr')
  .data(sorted)
  // create a row with join
  .join('tr')
  // for every single row we want to do sth, want to add a td for birthday, artist, and title
  .each(function(d){
      const row = d3.select(this)
      row.append('td')
      .attr('class', 'song-name')
      .text(d.Song)
      
      row.append('td')
      .attr('class', 'week-bar')
      .append('div')
      .style('width', barScale(+d.Week)+'%')
      .text(d.Week)

  })



 

// create the margins

// const margin = {top: 80, right: 30, bottom: 90, left: 40},
// width = 800 - margin.left - margin.right,
// height = 600 - margin.top - margin.bottom;


// const weekExtent= d3.extent(sorted, function(d){ return +d.Week})
// console.log(weekExtent)

// const yScale = d3.scaleLinear().domain([0,weekExtent[1]]).range([margin.top,height-margin.bottom])
// const xScale = d3.scaleBand().domain(songlist).range([width-margin.right,margin.left]).padding(.1)

// // append the bar svg object to the body of the page
// const svg = d3.select("#my_dataviz")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom);

// //xScale.bandwidth() will tell you how wide each of your bars should be, while xScale(d.Song) will tell you where it should go
// // xScale(d.Song) is going to evenly position out your bands

// // Show the bars
// svg.selectAll("rect")
//   .data(sorted)
//   .join("rect")
//   .attr("x", d => xScale(d.Song))
//   // the bandwidth is always going to be the same, so you won’t need to give it a d.Song
//   .attr("width", xScale.bandwidth())
//   .attr("fill", "#black")
//   // no bar at the beginning thus:
//   .attr("height", d => yScale(+d.Week))
//   .attr("y", d => yScale(0))

// const xAxisG = svg.append('g')
//   .attr('class','axis axis-x')
//   // .attr('transform', 'translate(0,' + margin.top + ')')
//   .attr('transform', `translate(0,'${margin.top}')`)
//   .call(d3.axisBottom(xScale))

// xAxisG.selectAll('.tick text')
//   .attr("transform", "rotate(90)")
//   .style('text-anchor', 'start')
    

  






})  // closing parenthesis for the click 

})
