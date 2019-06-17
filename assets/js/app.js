// When the user clicks on the submit button, populate park results to the datatable 'parkPopulation'.
$("#btnSubmit").on('click', function (e) {
    // Prevent Page Reloading.
    e.preventDefault();
    // Check to see if we're hitting our click.
    console.log("trying to make a table");
    // Execute API response data population.
    populateSearchResults();
    // Hide home page carousel.
    document.getElementById("carouselContainer").style.display = "none";
    // Show Park Population Table.
    document.getElementById("parkPopulation").style.display = "block";
})

// This array contains the names of our National Parks.
var nationalParks = [

];

// This variable contains zip codes.
var zipcode = "";

// Here we define the variables for our queryURL.

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

        // Get our response data.
        .then(function (response) {
            var parks = response.data;
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
                        parkCode:currentPark.parkCode
                    });
                }
                // Log Push.
                console.log(nationalParks);
            }

        })
    // .then(populateSearchResults)
}

// Populate our datatable with our park repsonse data.
function populateSearchResults() {
    // console.log(nationalParks);
    nationalParks.forEach(function (nationalPark) {
        // Create rows.
        var newRow = $("<tr>").append(
            $("<td>").text(nationalPark.name),
            $("<td>").text(nationalPark.type),
            $("<td>").text(nationalPark.url), 
            $("<td>").html('<input type="button" value="Add Fav" id="parkSelect-'+nationalPark.parkCode+'"/>'),
            $("<td>").html('<input type="button" value="More Details" id="parkDetails-'+nationalPark.parkCode+'"/>')
        );
        // Append new rows to the table.
        $("#searchResults > tbody").append(newRow)
    })
};