// from data.js
var rawData = data

function addTable (tableData) {
  // remove all the existing table data if it exists
  d3.selectAll('td').remove()

  // add the rows
  var tbody = d3.select('tbody')
  tableData.forEach((sighting) => {
    var row = tbody.append('tr')
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append('td')
      cell.text(value)
    })
  })
}

// initialize the table with all the data
addTable(rawData)

// datetime selector
var dateSelected

var datetimeNest = d3.nest()
  .key(function (d) {
    return d.datetime
  })
  .entries(rawData)

var datetimeMenu = d3.select('#datetimeDropdown')

datetimeMenu
  .append('select')
  .selectAll('option')
  .data(datetimeNest)
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d.key
  })
  .text(function (d) {
    return d.key
  })

datetimeMenu.on('click', function () {
  dateSelected = d3.select(this)
    .select('select')
    .property('value')
})

// city selector
var citySelected

var cityNest = d3.nest()
  .key(function (d) {
    return d.city
  })
  .entries(rawData)

var cityMenu = d3.select('#cityDropdown')

cityMenu
  .append('select')
  .selectAll('option')
  .data(cityNest)
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d.key
  })
  .text(function (d) {
    return d.key
  })

cityMenu.on('click', function () {
  citySelected = d3.select(this)
    .select('select')
    .property('value')
})

// state selector
var stateSelected

var stateNest = d3.nest()
  .key(function (d) {
    return d.state
  })
  .entries(rawData)

var stateMenu = d3.select('#stateDropdown')

stateMenu
  .append('select')
  .selectAll('option')
  .data(stateNest)
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d.key
  })
  .text(function (d) {
    return d.key
  })

stateMenu.on('click', function () {
  stateSelected = d3.select(this)
    .select('select')
    .property('value')
})

// country selector
var countrySelected

var countryNest = d3.nest()
  .key(function (d) {
    return d.country
  })
  .entries(rawData)

var countryMenu = d3.select('#countryDropdown')

countryMenu
  .append('select')
  .selectAll('option')
  .data(countryNest)
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d.key
  })
  .text(function (d) {
    return d.key
  })

countryMenu.on('click', function () {
  countrySelected = d3.select(this)
    .select('select')
    .property('value')
})

// shape selector
var shapeSelected

var shapeNest = d3.nest()
  .key(function (d) {
    return d.shape
  })
  .entries(rawData)

var shapeMenu = d3.select('#shapeDropdown')

shapeMenu
  .append('select')
  .selectAll('option')
  .data(shapeNest)
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d.key
  })
  .text(function (d) {
    return d.key
  })

shapeMenu.on('click', function () {
  shapeSelected = d3.select(this)
    .select('select')
    .property('value')
})

// submit button to selections and update the table
var filterButton = d3.select('#filter-btn')
filterButton.on('click', function () {

  var results = data
  if (dateSelected) {
    results = results.filter(function (e) {
      return e.datetime === dateSelected
    })
  }
  if (citySelected) {
    results = results.filter(function (e) {
      return e.city === citySelected
    })
  }
  if (stateSelected) {
    results = results.filter(function (e) {
      return e.state === stateSelected
    })
  }
  if (countrySelected) {
    results = results.filter(function (e) {
      return e.country === countrySelected
    })
  }
  if (shapeSelected) {
    results = results.filter(function (e) {
      return e.shape === shapeSelected
    })
  }

  addTable(results)
})

// reset button to reset selections
var rstButton = d3.select('#reset-btn')
rstButton.on('click', function () {
  dateSelected = undefined
  citySelected = undefined
  stateSelected = undefined
  countrySelected = undefined
  shapeSelected = undefined

  addTable(rawData)
})