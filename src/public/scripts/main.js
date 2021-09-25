document.addEventListener('DOMContentLoaded', () => {
   // custom select element for languages
   let x, i, j, l, ll, selElmnt, a, b, c;

   for (l = (x = document.getElementsByClassName("custom-select")).length, i = 0; i < l; i++) {
      for (ll = (selElmnt = x[i].getElementsByTagName("select")[0]).length, (a = document.createElement("DIV")).setAttribute("class", "select-selected"), a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML, x[i].appendChild(a), (b = document.createElement("DIV")).setAttribute("class", "select-items select-hide"), j = 1; j < ll; j++) (c = document.createElement("DIV")).innerHTML = selElmnt.options[j].innerHTML, c.addEventListener("click", function (e) {
         let t, l, s, n, i, c, a;
         for (c = (n = this.parentNode.parentNode.getElementsByTagName("select")[0]).length, i = this.parentNode.previousSibling, l = 0; l < c; l++) if (n.options[l].innerHTML === this.innerHTML) {
            for (n.selectedIndex = l, i.innerHTML = this.innerHTML, a = (t = this.parentNode.getElementsByClassName("same-as-selected")).length, s = 0; s < a; s++) t[s].removeAttribute("class");
            this.setAttribute("class", "same-as-selected");
            break
         }
         i.click()
      }),b.appendChild(c);
      x[i].appendChild(b), a.addEventListener("click", function (e) {
         e.stopPropagation(), closeAllSelect(this), this.nextSibling.classList.toggle("select-hide"), this.classList.toggle("select-arrow-active")
      })
   }

   function closeAllSelect(e) {
      let t, l, s, n, i, c = [];
      for (t = document.getElementsByClassName("select-items"), l = document.getElementsByClassName("select-selected"), n = t.length, i = l.length, s = 0; s < i; s++) e === l[s] ? c.push(s) : l[s].classList.remove("select-arrow-active");
      for (s = 0; s < n; s++) c.indexOf(s) && t[s].classList.add("select-hide")
   }

   document.addEventListener("click", closeAllSelect);

   //navigation bar close and open
   const navOpenBtn = document.querySelector('.nav-open'),
      navCloseBtn = document.querySelector('.nav-close'),
      nav = document.querySelector('.site-nav__ul');

   navOpenBtn.addEventListener('click', () => {
      nav.classList.add('nav-show');
      document.body.style.overflow = 'hidden';
   })

   navCloseBtn.addEventListener('click', () => {
      nav.classList.remove('nav-show');
      document.body.style.overflow = '';
   })
})