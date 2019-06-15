$("#btnSubmit").on('click', function(e) {
    e.preventDefault();
    document.getElementById("carouselContainer").style.display = "none";
    document.getElementById("parkPopulation").style.display = "block";
})