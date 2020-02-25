// 6ce41007f9563dde23befa59a0baa050
// Sydney 260
// burger 168


const today = document.getElementById('currentWeather')
const CityId = 260;
const CousineId = 168;
const apiKey = "6ce41007f9563dde23befa59a0baa050";
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${CityId}&entity_type=city&cuisines=${CousineId}&start=0&count=20`
const gridBox = document.getElementById('gridRestaurant')

//pricerangebuttons
const filterPriceExp = document.getElementById('priceClickedExp')
const filterPriceCheap = document.getElementById('priceClickedCheap')
let myList

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
      cost: element.restaurant.average_cost_for_two,
      price: element.restaurant.price_range,
      photo: element.restaurant.featured_image,
      offers: element.restaurant.highlights,
      rating: element.restaurant.user_rating.aggregate_rating,
      ratingT: element.restaurant.user_rating.rating_text

    })

  });


  console.log(newList)
  return newList

}

const showRestaurant = (aList) => {
  aList.forEach((item) => {
    let offers = item.offers.map(offer => `<span> ${offer}</span>`);
    gridBox.innerHTML += `<article><img src="${item.photo}"><p>${item.name}</p>
    <p>${offers}</p>
    <p>${item.rating}/5</p><p>${showDollarsigns(item.price)} </p></article>`

    console.log(item.cost)
  })

}



//here is a start on a function to sort by price from low to high or reverse. not finished!

const sortByCost = (aList, type) => {
  if (type === 'low') {
    aList.sort((a, b) => a.cost - b.cost)
  } else {
    aList.sort((a, b) => b.cost - a.cost)
  }

  console.log('sort', aList)
}


// Filter for pricerange
// expensive-button
const priceFilterExp = (arr, points, points2) => {
  gridBox.innerHTML = ""
  const priceList = arr.filter((item) => {
    return (item.price === points || item.price === points2)
  })

  priceList.forEach((item) => {
    let offers = item.offers.map(offer => `<span> ${offer}</span>`);
    gridBox.innerHTML += `<article><img src="${item.photo}"><p>${item.name}</p>
  <p>${offers}</p>
  <p>${item.rating}/5</p><p>${showDollarsigns(item.price)} </p></article>`

  })
}


//cheap-button
const priceFilterCheap = (arr, points, points2) => {
  gridBox.innerHTML = ""
  const priceList = arr.filter((item) => {
    return (item.price === points || item.price === points2)
  })

  priceList.forEach((item) => {
    let offers = item.offers.map(offer => `<span> ${offer}</span>`);
    gridBox.innerHTML += `<article><img src="${item.photo}"><p>${item.name}</p>
  <p>${offers}</p>
  <p>${item.rating}/5</p><p>${showDollarsigns(item.price)} </p></article>`

  })
}

//shows $$$ for every restaurant
const showDollarsigns = (price) => {
  if (price === 1) {
    return '$'
  } else if (price === 2) {
    return '$$'
  } else if (price === 3) {
    return '$$$'
  } else if (price === 4) {
    return '$$$$'
  }
}

// fot the pricerangebuttons
filterPriceExp.addEventListener('click', (e) => {
  e.preventDefault()
  priceFilterExp(myList, 3, 4)
})

filterPriceCheap.addEventListener('click', (e) => {
  e.preventDefault()
  priceFilterCheap(myList, 1, 2)
})