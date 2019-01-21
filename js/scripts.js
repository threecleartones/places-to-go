// const wrapper = document.querySelectorAll('#wrapper');

// base object
const placesToGo = {};

// fetch results from api and pass to map function
placesToGo.getPlaces = () => {
  $.ajax({
    url: "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json",
    method: "GET",
    dataType: "json",
    data: {
      per_page: "100",
      lat: "43.6567915",
      lng: "-79.4612745",
      // query: "Queen"  // not working not sure why
    }
  }).then((list) => {
    // console.log(list);
    placesToGo.parsePlaces(list);
  });
}

// create cards for each item and pass to filter function
placesToGo.parsePlaces = (data) => {
  let placesHtml = data.map((item) => {
    let itemHtml = `
      <article class="place-card">
        <a class="place-map" href="http://maps.google.com/?q=${item.street}">
          <h2 class="place-name">${item.name}</h2>
          <p class="street-name">${item.street}</p>
          <p class="place-directions">${item.directions}</p>
        </a>
      </article>
    `;
    return itemHtml;
  });

  placesToGo.filterCards(placesHtml);
}

// filter the list by what the user types and populate new list on page
placesToGo.filterCards = (streets) => {
  $("#placesList").html(streets);
  
  $("#streetName").bind("input", function() {
    let streetName = $(this).val();
    // console.log(streetName);

    let filterItems = (streetName) => {
      return streets.filter((element) => {
        return element.toLowerCase().indexOf(streetName.toLowerCase()) > -1;
      });
    }

    $("#placesList").html(filterItems(streetName));
  });
}

placesToGo.init = () => {}

// jQuery
$(() => {
  placesToGo.init();
  placesToGo.getPlaces();
});
