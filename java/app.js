var form = document.getElementById('form');
var table = document.getElementById('table');
var allData = [];
function Info(carModel , modelYear , price , manefacturer){
    this.carModel = carModel;
    this.modelYear = modelYear;
    this.price = price;
    this.manefacturer = manefacturer;
    allData.push(this);
}

Info.prototype.getPrice = function(min, max){
    this.price = Math.ceil(getRandomPrice(min , max))
}

// render constructot function to show information on browser page
Info.prototype.render = function(){
    var dataRowEl = document.createElement('tr')
    table.appendChild(dataRowEl);
    var tdEl1 = document.createElement('td');
    dataRowEl.appendChild(tdEl1);
    tdEl1.textContent = this.carModel;
    var tdEl2 = document.createElement('td');
    dataRowEl.appendChild(tdEl2);
    tdEl2.textContent = this.modelYear;
    var tdEl3 = document.createElement('td');
    dataRowEl.appendChild(tdEl3);
    tdEl3.textContent = this.price;
    var tdEl4 = document.createElement('td');
    dataRowEl.appendChild(tdEl4);
    tdEl4.textContent = this.manefacturer;
}

// add event listner to submit button
form.addEventListener('submit', submitInfo)

function submitInfo(event){
    event.preventDefault();
    var carModel = event.target.carModel.value;
    var modelYear = event.target.modelYear.value;
    var manufacturer = event.target.manufacturer.value;
    var info = new Info(carModel,modelYear,0,manufacturer);
    info.getPrice(7000, 100000);
    info.render();
    console.log(info);
    showTotal();
    localStorage.setItem('info' ,JSON.stringify(allData))

}

function showTotal (){
    var total = 0;
    for(var i = 0 ; i < allData.length ; i++){
        total += allData[i].price;
    }
    localStorage.setItem('total', total);
    document.getElementById('total').textContent = 'total = ' + total;
}

// get Data from local
var dataInParse = JSON.parse( localStorage.getItem('info'));
for(var i = 0 ; i < dataInParse.length ; i++){
    new Info(dataInParse[i].carModel , dataInParse[i].modelYear , dataInParse[i].price , dataInParse[i].manefacturer);
}
// show data from local
for(var i = 0 ; i < allData.length ; i++){
    allData[i].render();
    showTotal();
}

// helper function
function getRandomPrice(min, max) {
    return Math.random() * (max - min) + min;
  }