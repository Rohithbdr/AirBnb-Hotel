

const menuBtn = document.querySelector('.login-btn');

menuBtn.onclick = () => {
    menuBtn.classList.toggle('clicked');
    if(menuBtn.classList.contains("clicked")) {
        menuBtn.style.boxShadow = "0 4px 4px rgba(0,0,0,0.18)"
    } else {
        menuBtn.style.boxShadow = "none"
    }
}

const closeBtn = document.querySelector('#span');
const cartBg = document.querySelector('.cart');
const canvas = document.querySelector('.cart-canvas');

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
            <p>Total Price: $${parseInt(storedObj.price) + 12}</p>
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



function renderData(data) {
    console.log(data)
    // const template = Handlebars.compile(document.querySelector('#template').innerHTML);
    // const htmlTemplate = template({data});
    // document.querySelector('.render').innerHTML += htmlTemplate;
    // <div class="next img-btn"><ion-icon name="chevron-forward-outline"></ion-icon></div>
    // <div class="prev img-btn"><ion-icon name="chevron-back-outline"></ion-icon></div>


    let htmlTemplate = `<div id=${data.id} class="card-bg">
    <div class="card-img">        
        <img src="${data.image.url}" alt="">
    </div>
    <div class="card-desc">
        <div class="hotel-details">
            <h3>${data.title}</h3>
            <p>★<span>${data.rating}</span></p>
        </div>
        <p>Contact: ${data.contactNumber}</p>
        <p>Price:  $${data.price.slice(0,3)}</p>
    </div>
</div>`

document.querySelector('.render').innerHTML += htmlTemplate;


const cardBgs = document.querySelectorAll('.card-bg');
cardBgs.forEach(each => {
    each.onclick = (e) => {
        idArray.filter(each1 => {
            if(each.id == each1.id) {
                // console.log(each1);
                // window.location.pathname = "index.htm]l"
                // window.location.pathname = `/hotelsProject/index.html/${each.id}`;
                // if(window.location.pathname == `/hotelsProject/index.html/${each.id}`) {
                //     window.location.assign("/html/index2.html")
                // }
                localStorage.setItem("dataId" , each.id)
                window.location.assign("/hotelsProject/index2.html")
            }
        })
    }
})
}



    // if(window.location.pathname == `/hotelsProject/index.html/${y.id}`) {

    // }

let idArray = [];
async function jsonData() {
    const response = await fetch('https://res.cloudinary.com/cliqtick/raw/upload/v1665574559/react-class/top-hotels_jegeur.json');
    const data = await response.json();
    // console.log(data)
    for(let x of data) {
        renderData(x);
        idArray.push(x)
    }
    
}

jsonData();

console.log(idArray);

// const pTags = document.querySelectorAll('.filter-items p');

// pTags.forEach(each => {
//     each.onclick = () => {
//         if(each.id == 'price') {
//             // let priceFilter = idArray.filter(each => each.rating.sort((a,b) => a-b) )
//             // idArray.forEach(each => {
//             //     console.log(each.rating)
//             //     each.sort((x,y) => x-y)
//             // })

//             const ab = idArray.sort((x,y) => {
//                 return x.price - y.price
//             })
//             renderData(ab)
//         }
//     }
// })



const filterBg = document.querySelector('.filter-bg');
filterBg.onclick = () => {
    document.querySelector('.filter-items').classList.toggle("filt");
}
