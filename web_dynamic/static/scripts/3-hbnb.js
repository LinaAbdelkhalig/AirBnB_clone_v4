$(document).ready(function() {
    // this is where we store the amenity id when box is checked
    let checkedAmenitiesList = {};

    // update the amenities list in the html
    function updateAmenList() {
        let getAmenList = Object.values(checkedAmenitiesList).join(', ');
        $('.amenities h4').text(getAmenList);
    }

    // grabbing the input checkbox 
    const checkbox = $('.amenities input[type="checkbox"]');

    // Listening for checked and unchecked boxes
    $(checkbox).change(function() {
        // assign variables to the id and name from <input>
        let amenId = $(this).data('id');
        let amenName = $(this).data('name');

        // if the box is checked add to list
        if ($(this).is(':checked')) {
            checkedAmenitiesList[amenId] = amenName;
        } else {
            delete checkedAmenitiesList[amenId];
        }

        // invoke the function to make changes to HTML
        updateAmenList();
    });

    // requesting this URL
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
        if (data.status === "OK") {
            $('#api_status').addClass("available");
        } else {
            $('#api_status').removeClass("available");
        }
    });

    function newPlaces() {
        // requestign url
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
	    type: "POST",
	    contentType: "application/json",
	    data: JSON.stringify({}),
	    success: function(data) {
	        $('.places').empty();
	        places.forEach(place => {
		    const article = `
                         <article>
                              <div class="title_box">
                                   <h2>${place.name}</h2>
                                   <div class="price_by_night">$${place.price_by_night}</div>
                              </div>
                              <div class="information">
                                   <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                                   <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                                   <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                              </div>
                              <div class="description">
                                   ${place.description}
                              </div>
                         </article>`;
                     $('.places').append(article);
	        });
	    },
        });
    };
    //trigger newPlaces
    newPlaces();
});
