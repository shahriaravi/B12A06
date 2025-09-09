let carts = [];

const categoriesCntainer = document.getElementById('Categorie-container')
const allCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then(categories => {
            const allCat = categories.categories;
            showCategories(allCat)
        })

        .catch((err) => {
            console.log(err)
        })
}
allCategories()

const showCategories = (categories) => {
    categories.forEach(categorie => {
        categoriesCntainer.innerHTML += `
            <button id="cat-btn-${categorie.id}" onclick="showCard(${categorie.id})" class="btn btn-soft flex justify-start border-none my-1 bg-[#e7ffef] w-full hover:bg-[#15803D] cat-btn">${categorie.category_name}</button>
            `
    });
}

const removeActive = () => {
    const lessBtn = document.querySelectorAll(".cat-btn")
    lessBtn.forEach(btn => {
        btn.classList.remove('active')
    });
}

const showCard = (id) => {
    manageSpeen(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            displayCards(data.plants)
            removeActive()
            const clickBtn = document.getElementById(`cat-btn-${id}`)
            clickBtn.classList.add("active")
        })
}


const url = `https://openapi.programming-hero.com/api/plants`
fetch(url)
    .then((res) => res.json())
    .then(data => {
        const allData = data.plants;
        displayCards(allData)
    })

const manageSpeen = (status) => {
    if (status == true) {
        document.getElementById('loadspeen').classList.remove('hidden')
        document.getElementById('card-container').classList.add('hidden')
    } else {
        document.getElementById('loadspeen').classList.add('hidden')
        document.getElementById('card-container').classList.remove('hidden')
    }
}


const displayCards = (datas) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""

    datas.forEach(data => {
        cardContainer.innerHTML += `
       <div id="${data.id}" class="bg-white p-2 rounded-xl h-fit">
                    <img class="h-[200px] w-full rounded-lg object-cover" src="${data.image}" alt="">
                    <h3 onclick="showModal('${data.id}')" class="font-semibold my-1 cursor-pointer">${data.name}</h3>
                    <p class="text-xs md:h-12 overflow-hidden">${data.description}</p>
                    <div class="flex justify-between items-center my-2">
                        <button class="bg-[#DCFCE7] text-[#15803D] text-sm font-medium rounded-full px-3 py-1 items-center">${data.category}</button>
                        <p><span><i class="fa-solid fa-bangladeshi-taka-sign"></i></span><span class="font-bold">${data.price}</span></p>
                    </div>
                    <button class="btn bg-[#15803D] rounded-full w-full text-white">Add to Cart</button>
                </div>
        `

    });
    manageSpeen(false)
}

document.getElementById('card-container').addEventListener('click', (e) => {
    if (e.target.innerText === 'Add to Cart') {
        const title = e.target.parentNode.children[1].innerText;
        const price = e.target.parentNode.children[3].children[1].children[1].innerText;
        const priceNumber = Number(price)
        const cardId = e.target.parentNode.id
        alert(`${title} has been added to the cart`)
        carts.push({
            title: title,
            price: priceNumber,
            id: cardId
        })

        showCart(carts)
    }
})

const showCart = (carts) => {
    const addCartContainer = document.getElementById('add-to-cart-containetr')
    addCartContainer.innerHTML = "";
    let total = 0;
    carts.forEach(cart => {
        total += cart.price;
        addCartContainer.innerHTML += `
        <div class="flex justify-between items-center bg-[#e7ffef] rounded-md my-2 p-2">
                        <div>
                            <h3 class="font-medium text-sm mb-1">${cart.title}</h3>
                            <p class="text-xs">৳ ${cart.price}</p>
                        </div>
                        <div onclick="deleteCart('${cart.id}')" class="btn border-none bg-[#e7ffef]">❌</div>
                    </div>
        `

    });
    addCartContainer.innerHTML += `
    <div class="py-1 border-t border-gray-300 flex justify-between items-center">
                    <div><h3 class="font-semibold text-sm">Total:</h3></div>
                    <div><p><span class="text-sm font-normal"><i class="fa-solid fa-bangladeshi-taka-sign"></i></span><span>${total}</span><p></div>
    </div>
    `
}

const deleteCart = (cartId) => {
    const filterCarts = carts.findIndex(cart => cart.id === cartId)
    if (filterCarts !== -1) {
        carts.splice(filterCarts, 1);
    }

    showCart(carts)
}

const showModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then(data => displayModal(data.plants))
}
const displayModal = (plants) => {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
                        <div class="space-y-1">
                            <h1 class="text-base font-bold">${plants.name}</h1>
                            <img class="h-[200px] md:h-[250px] w-full rounded-lg object-cover" src="${plants.image}" alt="">
                            <h3 class="text-sm"><span class="font-bold">Category: </span>${plants.category}</h3>
                            <p class="text-sm"><span class="font-bold">Price: </span>৳${plants.price}</p>
                            <p class="text-sm"><span class="font-bold">Description: </span>${plants.description}</p>
                        </div>
    `
    document.getElementById('modalCard').showModal()
}