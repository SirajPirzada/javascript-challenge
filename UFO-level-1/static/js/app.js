// from data.js
var rawData = data

function addTable (tableData) {
  // remove all the existing table data if it exists
  d3.selectAll('td').remove()

  var tbody = d3.select('tbody')
  tableData.forEach((sighting) => {
    var row = tbody.append('tr')
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append('td')
      cell.text(value)
    })
  })
}

function selectDate (rawData) {
  return rawData.datetime === '1/1/2010'
}

var button = d3.select('button')
button.on('click', function () {
  // get the input date
  var inputElement = d3.select('input')
  var inputDate = inputElement.property('value')
  console.log(inputDate)

  var selectData = rawData.filter(function (e) {
    return e.datetime === inputDate
  })

  addTable(selectData)
})

addTable(rawData)