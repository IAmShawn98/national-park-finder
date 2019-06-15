// When the user clicks on the submit button, populate park results to the datatable 'parkPopulation'.
$("#btnSubmit").on('click', function (e) {
    // Prevent Page Reloading.
    e.preventDefault();
<<<<<<< HEAD
    // Check to see if we're hitting our click.
    console.log("trying to make a table");
    // Execute API response data population.
    populateSearchResults();
    // Hide home page carousel.
=======
    console.log("trying to make a table"); 
    populateSearchResults(); 
>>>>>>> a5077a381101d90d6414591faacd17db40d131d4
    document.getElementById("carouselContainer").style.display = "none";
    // Show Park Population Table.
    document.getElementById("parkPopulation").style.display = "block";
})

// This array contains the names of our National Parks.
var nationalParks = [

];

<<<<<<< HEAD
// This variable contains zip codes.
var zipcode = "";

// Here we define the variables for our queryURL.
=======
    // Vars for query URL 
    // api key
    var searchState = ""; 
    //query URL 
    var parkQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=PA&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm"; 


    
    parkFetcher(); 
>>>>>>> a5077a381101d90d6414591faacd17db40d131d4

// api key
var searchState = "";
//query URL 
var parkQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=PA&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm";

// This calls our function that fetches the API data from our ajax response object.
parkFetcher();

// Ajax API Park Fetcher.
function parkFetcher() {
    // Check to see if we're hitting this function.
    console.log("parkFetcher");

    // Our ajax request.
    $.ajax({
        url: parkQueryURL,
        method: "GET"
    })

<<<<<<< HEAD
        // Get our response data.
        .then(function (response) {
            var parks = response.data;
=======
        .then(function (response){
            var parks = response.data; 
>>>>>>> a5077a381101d90d6414591faacd17db40d131d4
            // console.log(parks); 

            // Loop through our National Parks Array.
            for (var i = 0; i < parks.length; i++) {
                var currentPark = parks[i]
                console.log('currentPark', currentPark.latLong);
                // If the parks are empty, just continue.
                if (currentPark.latLong === '') {
                    i++; // Keep it movin'!
                } else {
                    // Otherwise, push data.
                    var splitValue = currentPark.latLong.split(", ");
                    var lat = splitValue[0].split(":")[1];
                    var long = splitValue[1].split(":")[1];
                    // Push data.
                    nationalParks.push({
                        name: currentPark.fullName,
                        type: currentPark.designation,
                        lat,
                        long,
                        url: currentPark.url,
                    });
                }
                // Log Push.
                console.log(nationalParks);
            }

<<<<<<< HEAD
        })
    // .then(populateSearchResults)
}
=======
        }) 
        // .then(populateSearchResults)
    }

    function populateSearchResults () {
        // console.log(nationalParks);
        nationalParks.forEach(function(nationalPark){
            var newRow = $("<tr>").append (
                    $("<td>").text(nationalPark.name),
                    $("<td>").text(nationalPark.designation),
                    $("<td>").text(nationalPark.url) 
                );
             $("#searchResults > tbody").append(newRow)
        })
    };




    
>>>>>>> a5077a381101d90d6414591faacd17db40d131d4

// Populate our datatable with our park repsonse data.
function populateSearchResults() {
    // console.log(nationalParks);
    nationalParks.forEach(function (nationalPark) {
        // Create rows.
        var newRow = $("<tr>").append(
            $("<td>").text(nationalPark.name),
            $("<td>").text(nationalPark.designation),
            $("<td>").text(nationalPark.url)
        );
        // Append new rows to the table.
        $("#searchResults > tbody").append(newRow)
    })
};