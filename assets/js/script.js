var userInput = $('#userinput');
var search = $('#search');
var pastSearch = $('#pastsearch');
var today =$('today');
var aside =$('aside');
var cityName=$('#cityname');
var currTemp=$('#currtemp');
var currHum=$('#currhum');
var windSpeed=$('#windspeed');
var uvIndex=$('#uvindex');
var histContain =$();
var fiveDay = $('#5day');


var searchArray = JSON.parse(localStorage.getItem('userInput')) || [];

search.on('click', function (event){
    event.preventDefault();

    var userInputVal = userInput.val();
    searchArray.push(userInputVal);

    console.log(searchArray);
    
    var requestcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${userInputVal}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;

            $.when(
                $.ajax({
                    url:requestcurrent,
                    method:'GET',
                }),
            )
            .then(function(requestcurrent){
                cityName.html(requestcurrent.name);
                currTemp.html(requestcurrent.main.temp.toFixed(0));
                console.log((requestcurrent.main.temp));
                currHum.html(requestcurrent.main.humidity);
                windSpeed.html(requestcurrent.wind.speed);
            })
    var requestfiveday = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputVal}&appid=fc13aea726609eb12f7fb876b4af9bf6`;
            $.when(
                $.ajax({
                    url:requestfiveday,
                    method:'GET',
                }),
            )
            .then(function(requestfiveday){
                console.log(requestfiveday);
                for( var i = 3; i <requestfiveday.list.length; i+=8){
                    var dayFig = $('<figure>');
                    dayFig.addClass('col-md-2');

                    var date = $('<p>');
                    date.html(requestfiveday.list[i].clouds.dt_txt);

                    var temp = $('<p>');
                    temp.html(requestfiveday.list[i].main.temp);

                    var hum =$('<p>');
                    hum.html(requestfiveday.list[i].main.humidity);

                    dayFig.append(date);
                    dayFig.append(temp);
                    dayFig.append(hum);

                    fiveDay.append(dayFig);
                    console.log("loop!");
                }





            });


    localStorage.setItem("userInput", JSON.stringify(searchArray));
    createButtons();
});

function createButtons () {
    if (searchArray.length > 1) {
        histContain.remove();
    }

    histContain =$('<div>')
    histContain.addClass('container remove')
    pastSearch.append(histContain)

    searchArray.forEach(function (item,index){

        var buttonEl = $('<button>')
        buttonEl.addClass('apirequest col-12')
        buttonEl.text(searchArray[index])
    
        histContain.append(buttonEl);

        //needs to pull name of city searched
    });
    // console.log(savedArray);
        // newApiCall(buttonEl);
};
createButtons();


pastSearch.on('click', '.apirequest', function(item,index){

    console.log($(this).text());
    var foo = $(this).text();


    var pastrequest = `https://api.openweathermap.org/data/2.5/weather?q=${foo}&units=imperal&appid=fc13aea726609eb12f7fb876b4af9bf6`;

            $.when(
                $.ajax({
                    url:pastrequest,
                    method:'GET',
                }),
            )
            .then(function(pastrequest){
                console.log(pastrequest);
            });


    // console.log(searchArray[index]);
    // var foo = $(this);
    // console.log(foo.val());

    // console.log(foo.);
    // console.log($(this.outerText));
    // var pastrequest = $(this)

    // var requestcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${userInputVal}&appid=fc13aea726609eb12f7fb876b4af9bf6`;

    //         $.when(
    //             $.ajax({
    //                 url:requestcurrent,
    //                 method:'GET',
    //             }),
    //         )
    //         .then(function(requestcurrent){
    //             console.log(requestcurrent);
    //         })
    // var requestfiveday = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputVal}&appid=fc13aea726609eb12f7fb876b4af9bf6`;
    //         $.when(
    //             $.ajax({
    //                 url:requestfiveday,
    //                 method:'GET',
    //             }),
    //         )
    //         .then(function(requestfiveday){
    //             console.log(requestfiveday);
    //         });



});


