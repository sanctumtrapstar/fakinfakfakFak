let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".menu-nav");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu--active");
  hamburger.classList.toggle("menu--active");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.classList.remove("menu--active");
    hamburger.classList.remove("menu--active");
  }
});


// scrolls

const animItems = document.querySelectorAll(".anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        window.pageYOffset > animItemOffset - animItemPoint &&
        window.pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        if (animItem.classList.contains('.aNNHide')) {
          animItem.classList.remove("active");
        }
        
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 300);
}

// clicks

// document.getElementById("main-action-button").onсlick = function () {
//   document.getElementById("catalog").scrollIntoView({behavior: "smooth"});
// };

let links = document.querySelectorAll(".menu-li > a");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
      document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
  }
};


document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
          delay: 5500,
          disableOnInteraction: false,
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
});






function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      processLocation,
      handleGeolocationError
    );
  } else {
    console.error('Геолокация не поддерживается вашим браузером.');
  }
}

function processLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Теперь у вас есть координаты. Можете использовать другие сервисы для получения данных на русском языке.
  // Например, сервис Яндекс.Карты
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=3bb0cce6-f451-4673-bff4-66663aebec0f&format=json&geocode=${longitude},${latitude}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Геоданные пользователя: ', data);

      const addressComponents = data.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
      let city = '';

      if (addressComponents) {
        // Ищем компонент, отвечающий за город
        const cityComponent = addressComponents.find(component => component.kind === 'locality');

        if (cityComponent) {
          city = cityComponent.name;
          console.log('Город пользователя: ', city);

          // Делайте что-то с городом, например, выводите на страницу
          document.querySelector('.current-city').innerHTML = city;
        } else {
          console.error('Не удалось найти компонент с городом в ответе сервера.');
        }
      } else {
        console.error('Не удалось получить город из ответа сервера.');
      }
    })
    .catch(error => console.error('Ошибка при запросе геоданных: ', error));
}

function handleGeolocationError(error) {
  console.error('Ошибка геолокации: ', error.message);
}

// Вызываем функцию для получения геолокации при загрузке страницы
getGeolocation();