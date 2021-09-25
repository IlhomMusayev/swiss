function controlPagination(countCard, activePage, cardsArray) {

   const totalPage = parseInt(cardsArray.length / countCard, 10) + 1;

   if (totalPage !== 1)
      document.querySelector(".pagination").classList.add("show");
   const elPaginationList = document.querySelector(".pagination__list");
   const elTabCardWrapper = document.querySelector(".tabs__card__wrapper");


   let clickPageDatasetId = activePage;

   function createPagination(totalPage, activePageForFunc) {
      let newLi = "";
      let newCard = "";

      if (totalPage >= 2 && activePageForFunc !== 1) {
         newLi += `<li class="pagination__btn prev" data-id="prev"><span data-id="prev"></span></li>`;
      }
      if (totalPage < 8) {
         for (let index = 1; index <= totalPage; index++) {
            newLi += `<li data-id ="${index}" class="num ${(index === activePageForFunc) ? "active" : ""}">${index}</li>`;
         }
      }

      if (totalPage > 7) {
         newLi += `<li data-id ="1" class="num ${(activePageForFunc === 1) ? "active" : ""}">1</li>`;

         if (activePageForFunc <= 3) {
            newLi += `<li data-id ="2" class="num ${(activePageForFunc === 2) ? "active" : ""}">2</li>
      <li data-id ="3" class="num ${(activePageForFunc === 3) ? "active" : ""}">3</li>`;

            if (activePageForFunc === 3) newLi += `<li data-id ="4" class="num">4</li>`;
            newLi += `<li data-id ="..." class="dots">...</li>`;
         }

         if (activePageForFunc > 3 && activePageForFunc < totalPage - 1) {
            newLi += `<li data-id ="..." class="dots">...</li>`;
            for (let index = activePageForFunc - 1; index < activePageForFunc + 2; index++) {
               newLi += `<li data-id ="${index}" class="num ${(activePageForFunc === index) ? "active" : ""}">${index}</li>`;
            }
            newLi += (activePageForFunc !== totalPage - 2) ? `<li data-id ="..." class="dots">...</li>` : "";
         }

         if (activePageForFunc > totalPage - 2) {
            newLi += `<li data-id ="..." class="dots">...</li>`;
            newLi += `<li data-id ="${totalPage - 2}" class="num ${(activePageForFunc === totalPage - 2) ? "active" : ""}">${totalPage - 2}</li>
      <li data-id ="${totalPage - 1}" class="num ${(activePageForFunc === totalPage - 1) ? "active" : ""}">${totalPage - 1}</li>`;
         }

         newLi += `<li data-id ="${totalPage}" class="num ${(activePageForFunc === totalPage) ? "active" : ""}">${totalPage}</li>`;
      }

      if (totalPage >= 2 && activePageForFunc !== totalPage) {
         newLi += `<li class="pagination__btn next" data-id="next"><span data-id="next"></span></li>`;
      }
      ;

      for (let i = (activePageForFunc - 1) * countCard; i < activePageForFunc * countCard; i++) {
         if (i === news.length)
            break;
         newCard += `<div class="tabs__card">
                     <div class="tabs__card__header">
                        <img src="${cardsArray[i].imgHeader}${i}" alt="" width="280" height="190">
                     </div>
                     <div class="tabs__card__body">
                        <time>
                           <img src="img/icons/clock.svg" alt="clock icon">
                           <span>${cardsArray[i].time}</span>
                        </time>
                        <h3>${cardsArray[i].text}</h3>
                     </div>
                     <div class="tabs__card__link">
                        <time>
                           <img src="img/icons/clock.svg" alt="clock icon">
                           <span>${cardsArray[i].time}</span>
                        </time>
                        <h3>
                           <a href="#">${cardsArray[i].text}</a>
                        </h3>
                        <p>
                           <a href="#">${cardsArray[i].text}</a>
                        </p>
                     </div>
                  </div>`;
      }

      elTabCardWrapper.innerHTML = newCard;
      elPaginationList.innerHTML = newLi;
   }

   createPagination(totalPage, activePage);

   elPaginationList.addEventListener("click", evt => {
      document.documentElement.scrollTop = 0;
      clickPageDatasetId = parseInt(evt.target.dataset.id, 10) || clickPageDatasetId;
      if (evt.target.dataset.id === "prev") {
         clickPageDatasetId--;
      }
      if (evt.target.dataset.id === "next") {
         clickPageDatasetId++;
      }
      createPagination(totalPage, clickPageDatasetId);
   });
}


controlPagination(9, 1, news);