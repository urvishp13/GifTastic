// Hard code superheroes and give them the formatting I want all buttons to have
var topics = ['batman','wonder woman','superman','aquaman','green lantern','captain america','iron man']; // global variable

function createButtons() {
    $('#superheroes').empty();
    for (let i = 0; i < topics.length; i++) {
        // Create button
        let $superheroButton = $('<button>')
                            // Give each button the same class
                            .attr('id', topics[i])
                            // Add text to the button of the current superhero
                            .text(topics[i]);
        
        // Add newly created button to #superheroes section
        $('#superheroes').append($superheroButton);
    }
}

createButtons();

// Get the link to do API requests
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8MdAEnC5o8xrtEnYfGNqV3fkqDjgoK62";

// Show 10 pictures of ANY clicked superhero from #superheroes in #gifsSection
// When ANY superhero button is click
var superheroQueryURL;

// When you click on ANY button
$('#superheroes').on('click', 'button', function () {
    // Clear the #gifsSection to make room for gifs of the new superhero
    $('#gifsSection').empty();
    // Get button's superhero value
    let superhero = $(this).text();
    // Format the queryURL to have the superhero name that has been clicked on as the one's GIFs to be searched for
    let searchQuery = `q=${superhero}`;
    let limitQuery = "limit=10";
    let ratingQuery = "rating=g";

    superheroQueryURL = queryURL + "&" + searchQuery + "&" + limitQuery + "&" + ratingQuery;
    //console.log("superheroQueryURL: " + superheroQueryURL);

    $.ajax({
        // Get the GIFs from the GIPHY API
        url: superheroQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log("response on button click", response);
            // For each gif data in the response
            for (let i = 0; i < response.data.length; i++) {
                // Extract the gif's still-image url
                let stillImgURL = response.data[i].images.fixed_height_still.url;
                //console.log(stillImgURL);

                // Create a div to hold the gif and its rating together
                let $div = $('<div>')
                    .attr('class', 'gif')
                    .css({
                        'display':'inline-block',
                        'margin':'5px'
                    });

                // Make an image with the still-image-gif's url as the source (src)
                let $stillImg = $('<img>')
                    .attr('id', i)
                    .attr('src', stillImgURL)
                    .attr('alt', superhero);
                //console.log("$stillImg", $stillImg);

                let $rating = $('<p>')
                    .text(`rating: ${response.data[i].rating}`);

                $div.append($stillImg);
                $div.prepend($rating);

                // Append the gif into the #gifsSection 
                $('#gifsSection').prepend($div);
            }
        })
    });

// Create an event of on-click on ANY of the still-image gifs
$('#gifsSection').on('click', 'img', function() {
    // Extract the image that has been clicked on
    let $stillImg = $(this);
    //console.log("still-img data", $stillImg);
    // Extract the id of the image clicked on to get the image clicked on
    let id = $stillImg.attr('id');
    //console.log("id of image clicked on: " + id);

    //console.log("superheroQueryURL: " + superheroQueryURL);
    
    $.ajax({
        // Get the GIFs from the API again to get the moving-gif URL/still-image URL
        url: superheroQueryURL,
        method: "GET"
    })
        .then(function(response) {
            // If the source of this image is the gifURL
            if ($stillImg.attr('src') === response.data[id].images.fixed_height.url) {
                // Change it to the still-image
                let stillImgURL = response.data[id].images.fixed_height_still.url;
                $stillImg.attr('src', stillImgURL);

                console.log('still-img', $stillImg);
            } 
            else {
                console.log("response after clicking ANY image", response);

                // Get the gif's URL and animate the still-image 
                let gifURL = response.data[id].images.fixed_height.url;
                //console.log("gif's url: " + gifURL);
                $stillImg.attr('src', gifURL); // rewriting source to be that of gifs
                
                //console.log('meta', response.meta);
                console.log("gif", $stillImg);
            }
        })
});

// When the #add-superhero button is clicked
$('#add-superhero').click(function (event) {
    event.preventDefault(); // alternative to ajax call in the case that this doesn't allow the page to reload
    topics.push($('#search-field').val().trim());
    // Remake the buttons on the page
    createButtons();
    $('#search-field').val(''); // reset input field   
});
    