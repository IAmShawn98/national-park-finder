
$("#btnSubmit").on('click', function(e) {
    e.preventDefault();
    document.getElementById("carouselContainer").style.display = "none";
    document.getElementById("parkPopulation").style.display = "block";
})

    // Array for parks 
    var nationalParks = [
        
    ]; 

    // Var for Zip Code 
    var zipcode = ""; 

    // Vars for query URL 
    // api key
    var searchState = ""; 
    //query URL 
    var parkQueryURL = "http://developer.nps.gov/api/v1/parks?stateCode=PA&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm"; 

    $("#btnSubmit").on("click", function () { 

    })
    
    parkFetcher(); 

    function parkFetcher () { 
        console.log("parkFetcher");

        $.ajax ({
            url:parkQueryURL, 
            method: "GET"
        })

        .then(function (response){
            var parks = response.data; 
            console.log(parks); 

            for (var i = 0; i < parks.length; i++) {
                var currentPark =  parks[i]
                console.log('currentPark',currentPark.latLong)
                if(currentPark.latLong === ''){
                    i++;
                }else {
                    var splitValue = currentPark.latLong.split(", ");
                    var lat = splitValue[0].split(":")[1];
                    var long = splitValue[1].split(":")[1];
                    nationalParks.push({
                        name:currentPark.fullName,
                        type:currentPark.designation,
                        lat,
                        long,
                        url:currentPark.url,
                    });
                }
                    console.log(nationalParks);
            }

        }) 
        .then(populateSearchResults)
    }

    function populateSearchResults () {
        console.log(nationalParks,'nationalParks');
        nationalParks.forEach(function(nationalPark){
            var newRow = $("<tr>").append (
                    $("<td>").text(nationalPark.name),
                    $("<td>").text(nationalPark.designation),
                    $("<td>").text(nationalPark.url)
                );
             $("#searchResults > tbody").append(newRow)
        })
    };




    

