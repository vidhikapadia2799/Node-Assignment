var carDetails = [
    {
        carName:'BMW',
        carModel:'Bbmw 5 STR WITH A/C+HTR CNG',
        manufacturingYear: 2001,
        carPrice:12.25,
        lastServiceDate:'24 Jan 2010 08:18:28'
    },
    {
        carName:'Audi',
        carModel:'Audi 5 STR WITH A/C+HTR CNG',
        manufacturingYear: 2002,
        carPrice:5.25,
        lastServiceDate:'2 Feb 2010 08:18:28'
    },
    {
        carName:'BMW',
        carModel:'BMW 5 STR WITH Petrol',
        manufacturingYear: 2004,
        carPrice:7.25,
        lastServiceDate:'8 June 2009 08:18:28'
    },
    {
        carName:'Maruti',
        carModel:'Maruti 2 STR WITH A/C+HTR CNG',
        manufacturingYear: 1999,
        carPrice:1.25,
        lastServiceDate:'24 Jan 2010 08:18:28'
    },
    {
        carName:'Alto',
        carModel:'Alto 2 Star with petrol/diesel',
        manufacturingYear: 2007,
        carPrice:3.25,
        lastServiceDate:'24 Jan 2010 08:18:28'
    },
    {
        carName:'Volvo',
        carModel:'Volvo 5 STR WITH A/C+HTR CNG',
        manufacturingYear: 2001,
        carPrice:6.9,
        lastServiceDate:'8 May 2003 08:18:28'
    },
    {
        carName:'Mercedes Benz Skoda',
        carModel:'Mercedes Benz Skoda WITH A/C+HTR CNG',
        manufacturingYear: 2004,
        carPrice:17.9,
        lastServiceDate:'15 October 2007 08:18:28'
    },
    {
        carName:'Eco',
        carModel:'Eeco 5 STR WITH A/C+HTR CNG',
        manufacturingYear: 2001,
        carPrice:5.25,
        lastServiceDate:'24 Jan 2010 08:18:28'
    },
    {
        carName:'Jeep Volkswagen',
        carModel:'Jeep Volkswagen WITHOUT A/C+HTR CNG',
        manufacturingYear: 1997,
        carPrice:3.25,
        lastServiceDate:'18 September 2006 08:18:28'
    },
    {
        carName:'Hama',
        carModel:'hama WITHOUT A/C+PETROL/Diesel',
        manufacturingYear: 2011,
        carPrice:7.25,
        lastServiceDate:'18 March 2010 08:18:28'
    },
]
//Total car count
console.log("Total car count is: " + carDetails.length);

//Filter by Car Name
console.log("Filter by Car Name");
var filterCarName = carDetails.filter(x => x.carName == 'Jeep Volkswagen');
console.log(filterCarName);

//Filter by Car Model
console.log("Filter by Car Model");
var filterCarModel = carDetails.filter(x => x.carModel == 'Mercedes Benz Skoda WITH A/C+HTR CNG' || x.carModel=='Volvo 5 STR WITH A/C+HTR CNG');
console.log(filterCarModel);

//Filter by Manufacturing Year
console.log("Filter by Manufacturing Year > 2004");
var filterYear = carDetails.filter(x => x.manufacturingYear > 2004);
console.log(filterYear);

let date = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();

//Print current Date and Time
console.log("Current Date and time is: "+ Date());

//Last Month Date from Current Month
var lastMonthDate = function(y,m,d){
    return  new Date(y, m - 1,d).toLocaleDateString();
}
console.log("Last Month Date from Current Month: "+ lastMonthDate(year,month,date));

//Last Date of Next Month from Current Month
var lastDateOfNextMonth = function(y,m){
    return  new Date(y, m +2, 0).toLocaleDateString();
}
console.log("Last Date of Next Month from Current Month: "+ lastDateOfNextMonth(year,month));