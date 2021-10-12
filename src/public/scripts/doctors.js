document.addEventListener('DOMContentLoaded', async() => {

   const response = await fetch(
      "/alldoctorsusers", {
      method: "GET"
   })

   const json = await response.json()

   const doctors = await json.doctors

   // const doctors = [
   //    {
   //       id: 1,
   //       name: 'Дмитрий Нагиев',
   //       speciality: ['Имплантолог'],
   //       bio: 'Доступно множество вариаций отрывков Lorem Ipsum, но большинство из них претерпели изменения в той или иной форме из-за добавленного юмора или случайных слов, которые даже немного.',
   //       tel: '+998 (94) 123-45-67',
   //       img: 'https://i.pravatar.cc/380?img=59'
   //    },
   //    {
   //       id: 2,
   //       name: 'Анна Чапман',
   //       speciality: ['Маммолог', 'Гинеколог'],
   //       bio: 'Доступно множество вариаций отрывков Lorem Ipsum, но большинство из них претерпели изменения в той или иной форме из-за добавленного юмора или случайных слов, которые даже немного.',
   //       tel: '+998 (94) 123-45-67',
   //       img: 'https://i.pravatar.cc/380?img=45'
   //    },
   //    {
   //       id: 3,
   //       name: 'Мата Хари',
   //       speciality: ['Маммолог'],
   //       bio: 'Доступно множество вариаций отрывков Lorem Ipsum, но большинство из них претерпели изменения в той или иной форме из-за добавленного юмора или случайных слов, которые даже немного.',
   //       tel: '+998 (94) 123-45-67',
   //       img: 'https://i.pravatar.cc/380?img=13'
   //    },
   //    {
   //       id: 4,
   //       name: 'Мата Хари',
   //       speciality: ['Маммолог'],
   //       bio: 'Доступно множество вариаций отрывков Lorem Ipsum, но большинство из них претерпели изменения в той или иной форме из-за добавленного юмора или случайных слов, которые даже немного.',
   //       tel: '+998 (94) 123-45-67',
   //       img: 'https://i.pravatar.cc/380?img=44'
   //    },
   //    {
   //       id: 5,
   //       name: 'Иван Витас',
   //       speciality: ['Кордиолог'],
   //       bio: 'Доступно множество вариаций отрывков Lorem Ipsum, но большинство из них претерпели изменения в той или иной форме из-за добавленного юмора или случайных слов, которые даже немного.',
   //       tel: '+998 (94) 123-45-67',
   //       img: 'https://i.pravatar.cc/380?img=33'
   //    }
   // ]

   const doctorsListWrapper = document.querySelector('.our-doctors__main');

   function doctorsListRender() {
      doctorsListWrapper.innerHTML = ' ';
      doctors.forEach(({id, name, filename}) => {
         const doctorElement = document.createElement('div'),
            doctorImg = document.createElement('img');

         doctorElement.classList.add('doctor');
         doctorElement.id = id;
         doctorElement.addEventListener('click', () => {
            doctorInfoRender(id)
         })
         doctorImg.src = "/files/doctors/"+filename;
         doctorImg.alt = name + ' image';
         doctorElement.append(doctorImg);
         doctorsListWrapper.append(doctorElement);
      })
   }

   doctorsListRender();

   let doctorInfoClose;

   function doctorInfoRender(id) {
      let selectedDoctor;

      doctors.forEach(doctor => {
         if (doctor.id === id)
            selectedDoctor = doctor
      })

      doctorsListWrapper.innerHTML = `
         <div class="doctor-info">
            <div class="doctor-info__img">
               <img src=/files/doctors/${selectedDoctor.filename} alt=${selectedDoctor.name}>
            </div>
            <div class="doctor-info__text">
               <h3 class="doctor-info__name">${selectedDoctor.name}</h3>
               <div class="doctor-info__specials">${selectedDoctor.specials}</div>
               <p class="doctor-info__about">
                  
               </p>
               <div class="doctor-info__tel">
                  <div>Номер врача:</div>
                  <div>${selectedDoctor.phone_number}</div>
               </div>
            </div>
            <div class="doctor-info__close">
               &times;
            </div>
         </div>
      `;
      const about_doctor = document.querySelector('.doctor-info__about')
      about_doctor.innerHTML = selectedDoctor.about
      doctorInfoClose = document.querySelector('.doctor-info__close');

      doctorInfoClose.addEventListener('click', () => {
         doctorsListRender();
      })
   }
})

