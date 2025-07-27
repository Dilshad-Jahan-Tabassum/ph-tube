function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} seconds ago`;
}


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => showCategories(data.categories))
    .catch(error => console.log(error));
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

        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        categoriesContainer.append(button);
    })
    // console.log(categories);
}



loadCategories();
loadVideos();