function createButton(superhero) {
    // Create button
    let $superheroButton = $('<button>')
                        // Give each button the same class
                        .attr('class', 'superhero')
                        // Add text to the button of the current superhero
                        .text(superhero);
    
    // Add newly created button to #searched-superheroes
    $('#superheroes').append($superheroButton);
}

// Get the link to do API requests
var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=8MdAEnC5o8xrtEnYfGNqV3fkqDjgoK62";

// Hard code superheroes and give them the formatting I want all buttons to have
var superheroes = ['batman','wonder woman','superman','aquaman','green lantern','captain america','iron man'];

// Loop through each superhero and add their buttons to #searched-superhero. Give each superhero a .superhero class
superheroes.forEach(superhero => createButton(superhero));

// When the add superhero button is clicked
$('#add-superhero').click(function () {
    // One AJAX call
    $.ajax({
        url: "index.html"
    })
        // Extract searched superhero text from input field once #search-button is clicked
        .then(function () {
            let newSuperhero = $('#search-field').val();
            createButton(newSuperhero);
        })
    });
    
// Another AJAX call
    // Show 10 pictures of ANY clicked superhero from #searched-superheroes in #images field