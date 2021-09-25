document.addEventListener('DOMContentLoaded', () => {

   const tabsMenuListItems = document.querySelectorAll('.tabs__menu__li'),
      tabsContentItems = document.querySelectorAll('.tabs__content__item'),
      tabsMenuList = document.querySelector('.tabs__menu__ul');

   let selectedTabIndex;

   if (localStorage.getItem('selectedTabIndex')) {
      selectedTabIndex = localStorage.getItem('selectedTabIndex');
   } else {
      selectedTabIndex = 0;
   }

   function hideTabContent() {
      tabsContentItems.forEach(item => {
         item.classList.add('hide');
      });

      tabsMenuListItems.forEach(item => {
         item.classList.remove('tabs__menu__li--active');
      });
   }

   function showTabContent(i = selectedTabIndex) {
      tabsContentItems[i].classList.remove('hide');
      tabsMenuListItems[i].classList.add('tabs__menu__li--active');

      if (document.querySelector('.feedback')) {
         if (i !== 0) {
            document.querySelector('.feedback').style.display = 'none';
         } else {
            document.querySelector('.feedback').style.display = 'block';
         }
      }
   }

   hideTabContent();
   showTabContent();

   tabsMenuList.addEventListener('click', e => {
      const target = e.target;
      tabsMenuListItems.forEach((item, index) => {
         if (item === target) {
            hideTabContent();
            showTabContent(index);
            localStorage.setItem('selectedTabIndex', index)
         }
      })
   })


})