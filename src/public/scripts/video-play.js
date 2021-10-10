
document.addEventListener('DOMContentLoaded', async function(){

   const response = await fetch(
      "/admin/allvideos", {
      method: "GET"
   })

   const json = await response.json()


   let videosData = await json.videos
   

   const tabsVideosWrapper = document.querySelector('.tabs__videos');

   function renderVideosList(array) {
      array.forEach((video, index) => {
         tabsVideosWrapper.innerHTML += `
         <div class="video-wrapper">
            <div class="video-wrapper__video" data-index="${video.video_link}">
               <img src=/files/${video.filename} alt="">
               <button>
                  <img src="img/icons/play.svg" alt="">
               </button>
            </div>
            <h3>${video.caption}</h3>
         </div>
      `
      })
   }

   renderVideosList(videosData)

   let tabsVideos = document.querySelectorAll('.video-wrapper__video'),
      videoModal = document.querySelector('.video-modal'),
      closeVideoModalBtn;

   tabsVideos.forEach(video => {
      video.addEventListener('click', e => {
         console.log(e.currentTarget);
         const target = e.currentTarget;    
        openVideoModal(target.getAttribute('data-index'))
      })   })

   function openVideoModal(index) {
      console.log('salom');
      document.body.style.overflow = 'hidden';
      videoModal.classList.remove('hide');
         
      videoModal.innerHTML = `<iframe width="800" height="450" src='${index}' frameborder="0" allow="accelerometer; autoplay;
      clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <button>&times;</button>`
      closeVideoModalBtn = document.querySelector('.video-modal button');

      closeVideoModalBtn.addEventListener('click', () => {
         closeVideoModal();
      });
   }

   function closeVideoModal() {
      document.body.style.overflow = '';
      videoModal.classList.add('hide');
      videoModal.innerHTML = '';
   }

   window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
         closeVideoModal();
      }
   })
})