

// // Define the API URL
// const apiUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=FocPImi2GA4iU9WvjJKQu3gB8zsjAFJ9%20&q=delhi&details=false ';

// // Make a GET request
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


$city = "";
$locationKey = "";
$weatherForcast = "" ;
$cityName = "";
$("#btn").click(function () {
    $city = $("#cityName").val();
    $.getJSON('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=FocPImi2GA4iU9WvjJKQu3gB8zsjAFJ9%20&q=' + $city + '&details=false',
        function (data) {
            $locationKey = parseInt(data[0].Key);
            $cityName = data[0].LocalizedName;
            //city name and its location key is captured here

            //now we will use the location key to get the weather forcast from the site .
            $.getJSON(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + $locationKey + '?apikey=${config.MY_KEY}`,
                function (data) {
                    $weatherForcast = data['DailyForecasts'][0];
                    console.log($weatherForcast);
                    //this capture the weather of that city

                    //now the data has been captured now its just to show to user on the screen
                    $("#response").html('<div class="mt-5 alert alert-success">City : '+$cityName+'<br>Date :'+$weatherForcast.Date+'<br>Day : '+$weatherForcast.Day.IconPhrase+'<br>Night : '+$weatherForcast.Night.IconPhrase+'<br>Temprature : ('+$weatherForcast.Temperature.Minimum.Value+' F to '+$weatherForcast.Temperature.Maximum.Value+' F)</div>');
                }
            );
        }
    );

});






//this will get the location key based on the city name .

//now we are done with getting the location name using api through the city name .
//Next up we will find the forcast data using location key and also if the name is wrong it will let the user to reenter the city name.
