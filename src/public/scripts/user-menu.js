const elUserMenu = document.querySelector('.user__menu'),
   elModalUser = document.querySelector('.modal__user');

function clearClasses() {
   elModalUser.classList.remove('fade-out', 'show', 'fade-in');
}

elUserMenu.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal__content')) {
      return;
   }
   if (!elModalUser.classList.contains('fade-in')) {
      document.removeEventListener('animationend', clearClasses);
      elModalUser.classList.remove('fade-out');
      elModalUser.classList.add('fade-in', 'show');

      window.addEventListener('click', (e) => {
         if (!e.target.classList.contains('modal__content') && !(e.target.classList.contains('user__menu') ||
            e.target.classList.contains('user__menu__img') || e.target.classList.contains('user__menu__text') ||
            e.target.classList.contains('icon__bottom') || e.target.classList.contains('user__img__wrapper'))) {
            elModalUser.classList.add('fade-out');
            document.addEventListener('animationend', clearClasses);
         }
      })
   } else {
      elModalUser.classList.add('fade-out');
      document.addEventListener('animationend', clearClasses);
   }
})