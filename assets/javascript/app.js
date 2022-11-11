function createButton(superhero) {
    // Create button
    let $superheroButton = $('<button>')
                        // Give each button the same class
                        .attr('id', superhero)
                        // Add text to the button of the current superhero
                        .text(superhero);
    
    // Add newly created button to #superheroes section
    $('#superheroes').append($superheroButton);
}

// Get the link to do API requests
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8MdAEnC5o8xrtEnYfGNqV3fkqDjgoK62";

// Hard code superheroes and give them the formatting I want all buttons to have
var superheroes = ['batman','wonder woman','superman','aquaman','green lantern','captain america','iron man'];

// Loop through each superhero and add their buttons to #searched-superhero. Give each superhero a .superhero class
superheroes.forEach(superhero => createButton(superhero));

// When the add superhero button is clicked
$('#add-superhero').click(function () {
    // One AJAX call
    $.ajax({
        // Designate the index.html page as the page to write the new button to
        url: "index.html"
    })
        // Extract searched superhero text from input field once #search-button is clicked
        .then(function () {
            let $newSuperhero = $('#search-field').val();
            createButton($newSuperhero);
        })
    });
    
// Show 10 pictures of ANY clicked superhero from #superheroes in #gifImages section
// When ANY superhero button is click
$('#superheroes').on('click', 'button', function () {
    // Clear the #gifImages section to make room for the new superhero
    $('#gifImages').empty();
    // Get its superhero value
    // Format the queryURL to have the superhero name that has been clicked on as the one's GIFs to be searched for
    let searchQuery = `q=${$(this).text()}`; // extract the superhero name from the button
    let limitQuery = "limit=10";
    let ratingQuery = "rating=g";

    let superheroQueryURL = queryURL + "&" + searchQuery + "&" + limitQuery + "&" + ratingQuery;
    console.log("superheroQueryURL: " + superheroQueryURL);

    // Another AJAX call
    $.ajax({
        // Get the GIFs from the GIPHY API
        url: superheroQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log("response: ");
            console.log(response);
            // For each gif data in the response
                // Extract the gif's url
                // Make an image with the gif's url as the source (src)
                // Prepend the gif into the #gifImages section 
            // let gifs = Object.values(response);
            // console.log("gifs:");
            // console.log(gifs);
            
            for (let i = 0; i < response.data.length; i++) {
                let gifURL = response.data[i].url;
                console.log(gifURL);

                let $gifImg = $('<img>')
                    .attr('src', gifURL);
                    // .attr('alt', `${}`);

                // console.log("gifImg:");
                // console.log($gifImg);
                $('#gifImages').prepend($gifImg);
            }
        })
    });