function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} seconds ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    // console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove("active");
    }
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => showCategories(data.categories))
    .catch(error => console.log(error));
}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(response => response.json())
    .then(data => {
        //sbai k active class ta remove korte hobe
        removeActiveClass();

        //id er class k active koro
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        showVideos(data.category)
    })
    .catch(error => console.log(error));
}

const loadDetails = async (videoId) =>{
    // console.log(videoId);

    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetails(data.video);
}

const showDetails = (video) =>{
    // console.log(video);

    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
        <img src=${video.thumbnail}/>
        <p>${video.description}</p>
    `;

    //way-1
     //document.getElementById('showModalData').click();

    //way-2
    document.getElementById('customModal').showModal();
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response => response.json())
    .then(data => showVideos(data.videos))
    .catch(error => console.log(error));
}
// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }
const showVideos = (videos) =>{
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = ""; // Clear previous videos

    if(videos.length == 0){
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col items-center justify-center ">
            <img  src="assets/icon.png"/>
            <h2 class="font-bold mt-4 text-xl text-center">No videos found in this category</h2>
        </div>`;
        return; 
    }else{
        videosContainer.classList.add("grid");
        
    }

    videos.forEach(video =>{
        // console.log(video);

        const card = document.createElement("div");

        card.classList = "card bg-base-100 ";
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}/>
            ${video.others.posted_date.length == 0 ? "" : `<span class="absolute text-xs bg-black text-white right-2 bottom-2 rounded p-1">${getTimeString(video.others.posted_date)}</span>`}
        </figure>
        <div class="flex gap-2 py-3 px-0">
            <div>
            <img src=${video.authors[0].profile_picture} class="h-10 w-10 object-cover rounded-full" />
            </div>
           <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400 text-sm">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />` : ""}
                </div>
                <p class="text-gray-400 text-sm">${video.others.views} views</p>
                <p>
                    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm mt-1 bg-blue-300">Details</button>
                </p>
            </div>
            
        </div>
            
        `;

        videosContainer.append(card);
    })
}

// Example of the data structure returned from the API
// {
//     "category_id": "1001",
//     "category": "Music"
// }
const showCategories = (categories) =>{
    const categoriesContainer = document.getElementById('categories');
    
    categories.forEach(item =>{
        // console.log(item);

        const buttonContainer = document.createElement('div');
        
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onClick = "loadCategoryVideos('${item.category_id}')" class="btn category-btn">
            ${item.category}
            </button>
            
        `;

        categoriesContainer.append(buttonContainer);
    })
    // console.log(categories);
}



loadCategories();
loadVideos();