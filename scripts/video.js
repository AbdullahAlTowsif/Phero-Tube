

function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
};
const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

// fetch, load and show categories on html

// create loadCategories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error));
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then(data => {
            removeActiveClass();
            const activeButton = document.getElementById(`btn-${id}`);
            activeButton.classList.add('active');
            displayVideos(data.category);
        })
        .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
};

const displayDetails = (video) =>{
    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
    <img src="${video.thumbnail}"/>
    <p>${video.description}</p>
    `
    // way 1
    // document.getElementById('showModalData').click();

    // way 2
    document.getElementById('customModal').showModal();
    
};

const cardDemo = {
    "category_id": "1001",
    "video_id": "aaag",
    "thumbnail": "https://i.ibb.co/DRxB1Wm/sunris.jpg",
    "title": "Sunrise Reverie",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/yQFJ42h/ava.jpg",
            "profile_name": "Ava Johnson",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "16950"
    },
    "description": "'Sunrise Reverie' by Ava Johnson takes listeners on a serene journey through tranquil melodies and soft harmonies. With 1.1K views, this track is perfect for morning relaxation or an evening wind-down. Ava's heartfelt lyrics and soothing voice create a sense of peace, making it a go-to for fans seeking calm and inspiration in their musical choices."
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png" />
            <h2 class="text-center text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>': ''}
                </div>
                <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
            </div>
        </div>
        `;
        videoContainer.append(card);
    })
}


// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        // create a button
        const buttonContainer = document.createElement('div');
        // button.classList = 'btn';
        // button.innerText = item.category;
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}</button>
        `
        
        // add button to category container
        categoryContainer.append(buttonContainer);
    });
}


loadCategories();
loadVideos();