// console.log("hello")
fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCiMhD4jzUqG-IgPzUmmytRQ&maxResults=10&order=viewCount&key=AIzaSyCe2q77Gkp_4AueISByAXrJcKVrz_ozsSM")
.then((result)=>{
  return result.json()
}).then((data)=>{
  console.log(data)
  let videos = data.items
  let videoContainer = document.querySelector(".youtube")
  // document.querySelector(".name").innerHTML += `${video.snippet.channelTitle}`
  for(video of videos){
    videoContainer.innerHTML += `

      <iframe width="480" height="360" src="https://www.youtube.com/embed/${video.id.videoId}">
        <img src="${video.snippet.thumbnails.high.url}">
      </iframe>

    `
  }
})
