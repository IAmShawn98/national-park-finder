// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDctDVmKqP-wwaw034DRpQ3HLAgKT-RSaM",
    authDomain: "national-parks-finder-ff4e2.firebaseapp.com",
    databaseURL: "https://national-parks-finder-ff4e2.firebaseio.com",
    projectId: "national-parks-finder-ff4e2",
    storageBucket: "national-parks-finder-ff4e2.appspot.com",
    messagingSenderId: "468902482053",
    appId: "1:468902482053:web:aaedc7ae93fef45a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// When the user clicks on the submit button, populate park results to the datatable 'parkPopulation'.
$("#btnSubmit").on('click', function (e) {
    // Prevent Page Reloading.
    e.preventDefault();
    // Check to see if we're hitting our click.
    console.log("trying to make a table");
    // Execute API response data population.
    parkFetcher(); 
    // populateSearchResults(); 
    

    // .then(function () {
    //     populateSearchResults(); 
    // })
    
    // Hide home page carousel.
    document.getElementById("carouselContainer").style.display = "none";
    // Show Park Population Table.
    document.getElementById("parkPopulation").style.display = "block";
}); 

// This array contains the names of our National Parks.
var nationalParks = [

];

// This variable contains zip codes.
var zipcode = "";

// Here we define the variables for our queryURL.



// This calls our function that fetches the API data from our ajax response object.
// parkFetcher();

// Ajax API Park Fetcher.
function parkFetcher() {
    // Check to see if we're hitting this function.
    console.log("parkFetcher");
    
    // var searchState = $("#searchText").val();
    var searchState = document.getElementById("searchText").value; 
    // query URL
    var hardCodedURL = "https://developer.nps.gov/api/v1/parks?stateCode=PA&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm";
    var parkQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + searchState + "&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm";
    console.log ("search state is " + searchState); 
    console.log(parkQueryURL); 
    nationalParks = []; 

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
                        parkCode:currentPark.parkCode, 
                        description:currentPark.description,
                        hours: standardHours, 
                    });
                }
                // Log Push.
                console.log(nationalParks);
            }

        })
    .then(populateSearchResults); 
}

// Populate our datatable with our park repsonse data.
function populateSearchResults() {
    // console.log(nationalParks);
    $("#searchResults > tbody").empty(); 
    nationalParks.forEach(function (nationalPark) {
        // Create rows.
        var newRow = $("<tr>").append(
            $("<td>").text(nationalPark.name),
            $("<td>").text(nationalPark.type),
            $("<td>").text(nationalPark.url), 
            // User Actions:
            // Favorites button.
            $("<td>").html('<i class="btn btn-success fa fa-star p-1 ml-5 text-white parkSelect" aria-hidden="true"><input type="button" class="btn btn-success p-0" value=" Favorite This" attr = "data-name" '+ nationalPark.parkCode +' " id = "parkSelect"/>'),
            // More Details button.
            $("<td>").html('<i class="btn btn-info fa fa-eye p-1 mr-5 text-white" aria-hidden="true"><input type="button" class="btn btn-info p-0" value=" More Details" id="parkDetails-'+nationalPark.parkCode+'"/>')
        );
        // Append new rows to the table.
        $("#searchResults > tbody").append(newRow)
    })
};

$(document).on("click", "#parkSelect", function () {
    // var attr = element.getAttribute(parkCode);
    // console.log(attr);  
    console.log("click on park")
    // retrieve the code 
    // call the array to find the code  
    // display the details of the park 
    // save the name of the park to FB 

})

// listener for the favs section 

