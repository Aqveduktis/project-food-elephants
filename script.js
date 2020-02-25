// 6ce41007f9563dde23befa59a0baa050
// Sydney 260
// burger 168
// Mary "16566183"


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
      const listF = filterRate(myList)

      showRestaurant(listF)

      reviewFunc(myList)
      //review("16566183")

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


    })

  });


  console.log(newList)
  return newList

}

const showRestaurant = (aList) => {
  const gridBox = document.getElementById('gridRestaurant')
  aList.forEach((item, index, arr) => {
    let offers = item.offers.map(offer => `<span> ${offer}</span>`);
    gridBox.innerHTML += `<article id="art${item.id}"><img src="${item.photo}"><p>${item.name}</p>
    <p>${offers}</p>
    <p>${item.rating}/5</p><p>${item.price} </p></article>`

  })
}
const reviewFunc = (aList) => {

  aList.forEach((item) => {
    let url = `https://developers.zomato.com/api/v2.1/reviews?res_id=${item.id}`
    fetch(url, { headers: { "user-Key": apiKey } })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        //const restaurantId = number
        const myReviews = reviewObject(json, item.id)
        showRev(myReviews)

      })

  })
}




const reviewObject = (object, idN) => {
  const newList = []
  newList.push(idN)
  newList.push(object.reviews_count)
  const reviewList = object.user_reviews
  reviewList.forEach((item) => {
    newList.push({
      ratingN: item.review.rating,
      ratingT: item.review.rating_text,
      name: item.review.user.name,
      date: (new Date(item.review.timestamp * 1000)).toUTCString()
    })

  })
  console.log(newList)
  return newList
}

const showRev = (alist) => {
  const id = `art${alist[0]}`
  console.log(id)
  const myBox = document.getElementById(id)
  console.log(myBox)
  myBox.innerHTML += `<h3>Reviews</h3>`
  alist.forEach((item, index) => {
    if (index > 1) {
      myBox.innerHTML += `<p>Rating: ${item.ratingT}, User: ${item.name}, Date: ${item.date}</p>`
    }



  })

}

const filterRate = (arr) => {
  const filterList = arr.filter((item) => {
    return (parseFloat(item.rating) > 4.5)
  })

  console.log("filteredlist,", filterList)
  return filterList

}


// const costFunction = (aList) => {
//   costArray = []
//   aList.forEach((item) => {
//     costArray.push({ id: item.id, cost: item.cost })
//   })  console.log(costArray)
//   return costArray
// }

// const bookFilter = (arr) => {
//   const bookableTables = arr.filter((item) => {
//     return item.bookTable == 1

//   })
//   console.log(bookableTables)
//   return bookableTables
// }