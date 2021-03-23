//creating variables
var today = moment().format('l');
var userInput = $('#userinput');
var search = $('#search');
var pastSearch = $('#pastsearch');
var aside =$('aside');
var cityName=$('#cityname');
var currTemp=$('#currtemp');
var currHum=$('#currhum');
var windSpeed=$('#windspeed');
var uvIndex=$('#uvindex');
var histContain =$();
var future = $("#future");
var todayEl = $("#today");

var searchArray = JSON.parse(localStorage.getItem('userInput')) || [];

// function first adds the user's search input to the master array and then being the api requests based on the input.
search.on('click', function (event){
    event.preventDefault();

    var userInputVal = userInput.val();
    searchArray.push(userInputVal);

    console.log(searchArray);
    //first api call
    var requestcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${userInputVal}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;

        $.ajax({
            url:requestcurrent,
            method:'GET',
        }).then(function(response){
            console.log(response);
            cityName.text(response.name +" " + today);
            currTemp.text("Temperature: " + response.main.temp.toFixed(0) + "°F");
            console.log((response.main.temp));
            currHum.text("Humiditiy: " + response.main.humidity +"%");
            windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
            var lat =(response.coord.lat);
            var lon= (response.coord.lon);
            //this call takes the latituide and longitude of the first call , and after beig put into varabiles uses them for an api call where we can get a UV Index
            var requestUVI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;
            uvi (requestUVI)

        });
        function uvi (requestUVI){
            $.ajax({
                url:requestUVI,
                method:'GET',
            }).then(function(response){
                console.log(response);
                uvIndex.text("");
                uvIndex.text("UV Index: ")
                var color = $('<span>')
                //created the color block based on the UV that is returned
                if (response.current.uvi < 2){
                    color.addClass('low');
                } else if (response.current.uvi <5){
                    color.addClass('medium');
                } else {
                    color.addClass('high');
                };
                color.text(response.current.uvi);
                uvIndex.append(color)
            });
        };
        //2nd API that uses the user input to request data of next 5 day forecast
    var requestfiveday = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputVal}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;
            $.when(
                $.ajax({
                    url:requestfiveday,
                    method:'GET',
                }),
            )
            .then(function(response){
                console.log(response)
                future.text("");    
                var fiveDay = $('<row>');
                fiveDay.addClass('row')
                future.append(fiveDay)
                //the given array is 40 periods split over 3 hour increments, using that math, we can get the data for noon of each day.
                for( var i = 3; i <response.list.length; i+=8){
                    var dayFig = $('<figure>');
                    dayFig.addClass('col-md-2');

                    var date = $('<p>');
                    var day =moment().add(i/8,'days').format('l');
                    date.text(day);

                    var weatherIcon =$('<img>');
                    weatherIcon.addClass('weather-icon');
                    weatherIcon.attr('src','http://openweathermap.org/img/wn/'+ response.list[i].weather[0].icon+'.png');
                    

                    var temp = $('<p>');
                    temp.text("Temp: " + response.list[i].main.temp.toFixed(0) + "°F");
                    
                    var hum =$('<p>');
                    hum.text("Humidity: " + response.list[i].main.humidity+"%");

                    dayFig.append(date);
                    dayFig.append(weatherIcon);
                    dayFig.append(temp);
                    dayFig.append(hum);

                    fiveDay.append(dayFig);
                }
            });


    localStorage.setItem("userInput", JSON.stringify(searchArray));
    createButtons();
});
//create the buttons based on the length of the master arry from user inputs
function createButtons () {
    if (searchArray.length > 1) {
        histContain.remove();
    }

    histContain =$('<div>')
    histContain.addClass('container')
    pastSearch.append(histContain)

    searchArray.forEach(function (item,index){

        var buttonEl = $('<button>')
        buttonEl.addClass('apirequest col-12 btn btn-outline-secondary')
        buttonEl.text(searchArray[index])
    
        histContain.append(buttonEl);
    });

};
createButtons();

//creates the same search as the user input but on the buttons that represent past searches.  
pastSearch.on('click', '.apirequest', function(item,index){

    console.log($(this).text());
    var foo = $(this).text();

    var pastrequest = `https://api.openweathermap.org/data/2.5/weather?q=${foo}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;

            $.ajax({
                url:pastrequest,
                method:'GET',
            }).then(function(response){
                cityName.text(response.name +" " + today);
                currTemp.text("Temperature: "+ response.main.temp.toFixed(0)+ "°F");
                console.log((response.main.temp));
                currHum.text("Humidity: "+ response.main.humidity+ "%");
                windSpeed.text("Wind Speed: " +response.wind.speed+ " MPH");
                var lat =(response.coord.lat);
                var lon= (response.coord.lon);
                var pastUVI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;
                uvi (pastUVI)

            });
            function uvi (pastUVI){
                $.ajax({
                    url:pastUVI,
                    method:'GET',
                }).then(function(response){
                    console.log(response);
                    uvIndex.text("");
                    uvIndex.text("UV Index: ")
                    var color = $('<span>')
    
                    if (response.current.uvi < 2){
                        color.addClass('low');
                    } else if (response.current.uvi <5){
                        color.addClass('medium');
                    } else {
                        color.addClass('high');
                    };
                    color.text(response.current.uvi);
                    uvIndex.append(color)
                });
            };
    var pastfiveday = `https://api.openweathermap.org/data/2.5/forecast?q=${foo}&units=imperial&appid=fc13aea726609eb12f7fb876b4af9bf6`;
            $.when(
                $.ajax({
                    url:pastfiveday,
                    method:'GET',
                }),
            )
            .then(function(pastfiveday){
                future.text("");
                var fiveDay = $('<row>');
                fiveDay.addClass('row')
                future.append(fiveDay)
                for( var i = 3; i <pastfiveday.list.length; i+=8){
                    var dayFig = $('<figure>');
                    dayFig.addClass('col-md-2');

                    var date = $('<p>');
                    var day =moment().add(i/8,'days').format('l');
                    date.text(day);

                    var weatherIcon =$('<img>');
                    weatherIcon.addClass('weather-icon');
                    weatherIcon.attr('src','http://openweathermap.org/img/wn/'+ response.list[i].weather[0].icon+'.png');
                    

                    var temp = $('<p>');
                    temp.text("Temp: "+ pastfiveday.list[i].main.temp.toFixed(0)+ "°F");
                    
                    var hum =$('<p>');
                    hum.text("Humidity: " +pastfiveday.list[i].main.humidity+ "%");

                    dayFig.append(date);
                    dayFig.append(weatherIcon);
                    dayFig.append(temp);
                    dayFig.append(hum);

                    fiveDay.append(dayFig);
                    console.log("loop!");
                }
            });
});