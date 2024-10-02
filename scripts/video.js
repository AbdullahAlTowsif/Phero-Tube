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
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure>
            <img
            src=${video.thumbnail}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
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
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        // add button to category container
        categoryContainer.append(button);
    });
}


loadCategories();
loadVideos();