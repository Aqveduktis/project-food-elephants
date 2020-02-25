// 6ce41007f9563dde23befa59a0baa050
// Sydney 260
// burger 168


const today = document.getElementById('currentWeather')
const CityId = 260;
const CousineId = 168;
const apiKey = "6ce41007f9563dde23befa59a0baa050";


const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${CityId}&entity_type=city&cuisines=${CousineId}&start=0&count=20`


const fetchRestaurants = () => {

  fetch(url, { headers: { "user-Key": apiKey } })
    .then(res => res.json())
    .then(json => {
      console.log(json.restaurants)
      myList = restaurantList(json.restaurants)
      showRestaurant(myList)

    })
}

fetchRestaurants()
const restaurantList = (Alist) => {
  const newList = []
  Alist.forEach(element => {
    newList.push({
      name: element.restaurant.name,
      id: element.restaurant.id,
      address: element.restaurant.location.address,
      cost: `${element.restaurant.currency}${element.restaurant.average_cost_for_two}`,
      price: element.restaurant.price_range,
      photo: element.restaurant.featured_image,
      offers: element.restaurant.highlights,
      rating: element.restaurant.user_rating.aggregate_rating,
      ratingT: element.restaurant.user_rating.rating_text,
      // delivery: element.restaurant.has_online_delivery,
      bookTable: element.restaurant.is_table_reservation_supported
    })

  });


  console.log(newList)
  return newList

}

const showRestaurant = (aList) => {
  const gridBox = document.getElementById('gridRestaurant')
  aList.forEach((item) => {
    let offers = item.offers.map(offer => `<span> ${offer}</span>`);
    gridBox.innerHTML += `<article><img src="${item.photo}"><p>${item.name}</p>
    <p>${offers}</p>
    <p>${item.rating}/5</p><p>${item.price} </p>
    <p>${item.bookTable}</p>
    </article>`
    
  })
}