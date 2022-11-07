// Get the link to do API requests
var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=8MdAEnC5o8xrtEnYfGNqV3fkqDjgoK62";

// Hard code categories and give them the formatting I want all buttons to have
var categories = ['batman','wonder woman','superman','aquaman','green lantern','captain america','iron man'];

// Loop through each category and add their buttons to #searched-categories. Give each category a .category class
categories.forEach(category => {
        
    // Create button
    let $categoryButton = $('<button>')
                        // Give each button the same class
                        .attr('class', 'category')
                        // Add text to the button of the current category
                        .text(category);
    
    // Add newly created button to #searched-categories
    $('#searched-categories').append($categoryButton);
});

// One AJAX call
    // Extract searched category text from input field once #search-button is clicked
    // Additionally, add searched category to #searched-categories array
    
// Another AJAX call
    // Show 10 pictures of ANY clicked category from #searched-categories in #images field