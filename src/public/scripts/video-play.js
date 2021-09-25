document.addEventListener('DOMContentLoaded', () => {
   const videosData = [
      {
         id: 1,
         videoURL: 'https://www.youtube.com/embed/1YPQ2iZhYEA',
         posterURL: 'https://picsum.photos/484/250?rand=1',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 2,
         videoURL: 'https://www.youtube.com/embed/GFADGs3vBuU',
         posterURL: 'https://picsum.photos/484/250?rand=2',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 3,
         videoURL: 'https://www.youtube.com/embed/1YPQ2iZhYEA',
         posterURL: 'https://picsum.photos/484/250?rand=3',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 4,
         videoURL: 'https://www.youtube.com/embed/xH8P-8EbpnM',
         posterURL: 'https://picsum.photos/484/250?rand=4',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 5,
         videoURL: 'https://www.youtube.com/embed/GFADGs3vBuU',
         posterURL: 'https://picsum.photos/484/250?rand=5',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 6,
         videoURL: 'https://www.youtube.com/embed/1YPQ2iZhYEA',
         posterURL: 'https://picsum.photos/484/250?rand=6',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 7,
         videoURL: 'https://www.youtube.com/embed/1YPQ2iZhYEA',
         posterURL: 'https://picsum.photos/484/250?rand=7',
         videoTitle: 'Технологии будущего для вашего здоровья'
      },
      {
         id: 8,
         videoURL: 'https://www.youtube.com/embed/1YPQ2iZhYEA',
         posterURL: 'https://picsum.photos/484/250?rand=8',
         videoTitle: 'Технологии будущего для вашего здоровья'
      }
   ]

   const tabsVideosWrapper = document.querySelector('.tabs__videos');

   function renderVideosList(array) {
      array.forEach((video, index) => {
         tabsVideosWrapper.innerHTML += `
         <div class="video-wrapper">
            <div class="video-wrapper__video" data-index="${index}">
               <img src=${video.posterURL} alt="">
               <button>
                  <img src="img/icons/play.svg" alt="">
               </button>
            </div>
            <h3>${video.videoTitle}</h3>
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
         const target = e.currentTarget;
         openVideoModal(+target.getAttribute('data-index'))
      })
   })

   function openVideoModal(index) {
      document.body.style.overflow = 'hidden';
      videoModal.classList.remove('hide');
      videoModal.innerHTML = `
      <iframe width="800" height="450" src=${videosData[index].videoURL} frameborder="0" allow="accelerometer; autoplay;
      clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <button>&times;</button>
   `
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