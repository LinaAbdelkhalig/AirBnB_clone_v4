$(document).ready(function() {
	// this is where we store the amnety id when box is checked
	let checkedAmenitiesList = {};

	// update the amenities list in the html
	function updateAmenList()
	{
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
		}
		else {
			delete checkedAmenitiesList[amenId];
		}
	});

	// invoke the earlier func to make changes to html
	updateAmenList();
});
