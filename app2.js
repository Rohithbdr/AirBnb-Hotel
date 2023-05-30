const closeBtn = document.querySelector('#span');
const menuBtn = document.querySelector('.login-btn');

const cartBg = document.querySelector('.cart');
const canvas = document.querySelector('.cart-canvas');


const logo = document.querySelector('.logo');

logo.onclick = () => {
    window.location.assign('/hotelsProject/index.html')
}



menuBtn.onclick = () => {
    menuBtn.classList.toggle('clicked');
    if(menuBtn.classList.contains("clicked")) {
        menuBtn.style.boxShadow = "0 4px 4px rgba(0,0,0,0.18)"
    } else {
        menuBtn.style.boxShadow = "none"
    }
}



cartBg.onclick = () => {
    canvas.classList.add('slide');
    let storedObj = JSON.parse(localStorage.getItem("storedObj"));
    let bookHtml = '';
    bookHtml = `
    <div class="booked-card">
        <div class="book-img">
            <img src=${storedObj.image.url} alt="hotel" />
        </div>
        <div class="book-details">
            <p>Total Price: $${parseFloat(storedObj.price) + 12}</p>
            <button class="cancel-booking">Cancel Booking</button>
        </div>
    </div>
`
    document.querySelector('.cart-cont').innerHTML = bookHtml;
    
    const cancel = document.querySelector('.cancel-booking');
    
    cancel.onclick = () => {
        localStorage.removeItem("storedObj");
        document.querySelector('.cart-cont').innerHTML = '';
    }
}

    closeBtn.onclick = () => {
        canvas.classList.remove('slide');
    }



let storedObj;
let renderHtml;

async function jsonData() {
    const response = await fetch('https://res.cloudinary.com/cliqtick/raw/upload/v1665574559/react-class/top-hotels_jegeur.json');
    let data = await response.json();
    const dataId = localStorage.getItem("dataId");
    console.log(data);

        data.filter(each => {
        let{location} = each
        if(each.id == dataId) {
            storedObj = each;
            renderHtml = 
            `<div class="dynamicBg">
                <div class="hotel-cont">
                        <div class="hotel-corousel">
                            <div class="hotel-img">
                            <div class="prev img-btn"><ion-icon name="chevron-back-outline"></ion-icon></div> 
                            <div class="next img-btn"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                            <div class="corousel-bg">
                                    <div class="room-bg"><img src=${each.gallery[0].url} alt=""></div>
                                    <div class="room-bg"><img src=${each.gallery[1].url} alt=""></div>
                                    <div class="room-bg"><img src=${each.gallery[2].url} alt=""></div>
                                </div> 
                            </div>
                        </div>
                    <div class="hotel-desc">
                        <div class="name-bg">
                            <h1>${each.title}</h1>
                            <div class="hotel-review">
                                <h5>rating: <span>${each.rating}</span><ion-icon name="star"></ion-icon></h5>
                                <h5>rating count: <span>${each.ratingCount}</span></h5>
                                <h5>property type: <span>${each.propertyType}</span></h5>
                            </div>
                        </div>
                        <div class="desc-bg">
                            <p>${each.content}</p>
                        </div>
                        <div>
                            <p><h3>Location:</h3>  ${location.city}, ${location.state_long}, ${location.country_long}, ${location.zipcode}</p>
                        </div>
                        <div class="amenities-bg">
                            <h3>Amenities:</h3>
                            <div class="amenities-items">
                                <p>Guest Room: <span>${each.amenities[0].guestRoom}</span></p>
                                <p>Bed Room: <span>${each.amenities[1].bedRoom}</span></p>
                                <p>Condition: <span>${each.condition}</span></p>
                                <p>Wifi Availability: <span>${each.amenities[2].wifiAvailability}</span></p>
                                <p>Parking Availability: <span>${each.amenities[3].parkingAvailability}</span></p>
                                <p>Pool Availability: <span>${each.amenities[4].poolAvailability}</span></p>
                                <p>AC: <span>${each.amenities[5].airCondition}</span></p>
                                <p>extraBed Facility: <span>${each.amenities[6].extraBedFacility}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="booking-bg">
                <div class="booking-cont">
                    <div class="booking-details">
                        <h3>Price: $<span>${each.price.slice(0,3)}</span></h3>
                        <h3>Rating:  <span>${each.rating}</span><ion-icon name="star"></ion-icon> </h3>
                        <h3>Review:  <span>${each.ratingCount}</span></h3>
                    </div>
                    <div class="booking-date">
                        <div class="check-bg">
                            <div class="check-in">
                                <p>check-in</p>
                                <p>date</p>
                            </div>
                            <div class="check-out">
                                <p>check-out</p>
                                <p>date</p>
                            </div>
                        </div>
                        <div class="guests-bg" data-price=${each.price.slice(0,3)}>
                            <p>guests</p>
                            <p><ion-icon name="chevron-down-outline"></ion-icon></p>
                            <div class="guests-items">
                                <div class="item-bg">
                                    <div class="item-details">
                                        <p>Adults</p>
                                        <p>Age 13+</p>
                                    </div>
                                    <div class="item-count">
                                        <button data-type="adult" class="btn">-</button>
                                        <p class="peopleText">0</p>
                                        <button data-type="adult" class="btn">+</button>
                                    </div>
                                </div>
                                <div class="item-bg">
                                    <div class="item-details">
                                        <p>Children</p>
                                        <p>Age 2-12</p>
                                    </div>
                                    <div class="item-count">
                                        <button data-type="children" class="btn">-</button>
                                        <p class="peopleText">0</p>
                                        <button data-type="children" class="btn">+</button>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="booking-cont2">
                    <p>price: <span class="bill-span">$${each.price}</span></p>
                    <p>AirBnb Service Charge: <span class="bill-span">$12</span></p>
                    <p class="total-price">total: <span class="bill-span">$${Number(each.price)+12}</span></p>
                </div>
                <div class="book-btn">
                    <button class="booking-btn">Book Now</button>
                </div>
            </div>
            <div class="footer">
                <h3>Welcome to Footer</h3>
            </div>
        </div>`
        }
    })
    document.querySelector('.dynamicData').innerHTML +=  renderHtml;





    const corouselBtns = document.querySelectorAll('.img-btn');
    const corouselBg = document.querySelector('.corousel-bg');
    
    let count = 0;
    corouselBtns.forEach(each => {
        each.onclick = () => {
            console.log(each)
            if(each.classList.contains('next')) {
                if(count <=0 && count > -1000)count-=500;
                corouselBg.style.transform = `translateX(${count}px)`
            }
            if(each.classList.contains('prev')) {   
                if(count < 0 && count < 1000)count=count + 500;
                corouselBg.style.transform = `translateX(${count}px)`
            }
        }
    });

    const btn = document.querySelectorAll('.btn');

    let peopleCount;
    let personCount;
    let adultPersons;
    let childPersons;
    let personTotal;
    let grandTotal;


    btn.forEach((each,index) => {
        // each.onclick = (e) => {
        //     e.stopPropagation();
        //     if(each.textContent == '+'){
        //         if(peopleCount >= 0 && peopleCount < 4){
        //             peopleCount++;
        //         }
        //     } else {
        //         if(peopleCount > 0) {
        //             peopleCount--;
        //         }
        //     }
        //     // console.log(each)
        //     // console.log(peopleCount);

        //     if(each.dataset.type == 'adult') {
        //         peopleText[0].innerHTML = peopleCount;
        //     } if(each.dataset.type == 'children') {
        //         peopleText[1].innerHTML = peopleCount;
        //     }
        // }
        // each.onclick = () => {
        //     let condition = each.dataset.type;
        //     switch(condition) {
        //         case 
        //     }
        // }
        
        each.onclick = (e) => {
            e.stopPropagation();
            if(each.textContent == '+') {
                // console.log(each)
                peopleCount = Number(each.parentElement.children[1].textContent);
                if(peopleCount >= 0 && peopleCount < 2) {
                    peopleCount++;
                    each.parentElement.children[1].textContent = peopleCount;
                }
            }
            if(each.textContent == '-') {
                peopleCount = Number(each.parentElement.children[1].textContent);
                if(peopleCount > 0) {
                    peopleCount--;
                    each.parentElement.children[1].textContent = peopleCount;
                }
            }

            personCount = Number(each.parentElement.children[1].textContent);
            each.parentElement.children[1].setAttribute(each.dataset.type , personCount);
            if(each.dataset.type == 'adult') adultPersons = Number(each.parentElement.children[1].getAttribute("adult"));
            else childPersons = Number(each.parentElement.children[1].getAttribute("children"))

            grandTotal = each.parentElement.getAttribute
            personTotal = adultPersons + childPersons;
        }
    })


    const guestBg = document.querySelector('.guests-bg');
    const guestItem = document.querySelector('.guests-items');


    
    guestBg.onclick = (e) => {
        guestItem.classList.toggle("show");
    }


    const bookingBtn = document.querySelector('.booking-btn');
    bookingBtn.onclick = () => {
        if(personTotal !== undefined) {
            if(personTotal < 4) {
                grandTotal = guestBg.dataset.price;
                localStorage.setItem('storedObj' , JSON.stringify(storedObj));
                bookingBtn.innerHTML = "Booked";
            } 
            if(personTotal == 4) {
                console.warn("person count")
            }
        }
    }



}




jsonData();


