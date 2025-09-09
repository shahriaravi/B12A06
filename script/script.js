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




const displayCards = (datas) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""

    datas.forEach(data => {
        const card = document.createElement('div')
        card.innerHTML = `
       <div class="bg-white p-2 rounded-xl h-fit">
                    <img class="h-[200px] w-full rounded-lg" src="${data.image}" alt="">
                    <h3 class="font-semibold my-1">${data.name}</h3>
                    <p class="text-xs">${data.description}</p>
                    <div class="flex justify-between items-center my-2">
                        <button class="bg-[#DCFCE7] text-[#15803D] text-sm font-medium rounded-full px-3 py-1 items-center">${data.category}</button>
                        <p><span>${data.price}</span></p>
                    </div>
                    <button class="btn bg-[#15803D] rounded-full w-full text-white">Add to Cart</button>
                </div>
        `
        cardContainer.appendChild(card)
    });
    // manageSpeen(false)
}