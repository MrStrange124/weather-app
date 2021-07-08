console.log('client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
// messageOne.textContent = ''
// messageTwo.textContent = ''
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.innerHTML = 'Loading...'
  const location = search.value
  const url = `/weather?address=${location}`

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerHTML = data.error
        messageTwo.innerHTML = ''
      }
      else {
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = data.forecast
      }
    })
  })
  search.value = ''
})

const change = () => {
  const temp = document.getElementById("temp");
  temp.innerHTML = "&#xf2cb";
  temp.style.color = "#48dbfb";
  setTimeout(() => {
    temp.innerHTML = "&#xf2ca";
    temp.style.color = "#2ecc71";
  }, 1000);
  setTimeout(() => {
    temp.innerHTML = "&#xf2c9";
    temp.style.color = "#fed330";
  }, 2000);
  setTimeout(() => {
    temp.innerHTML = "&#xf2c8";
    temp.style.color = "#F79F1F";
  }, 3000);
  setTimeout(() => {
    temp.innerHTML = "&#xf2c7";
    temp.style.color = "#fc5c65";
  }, 4000);
};
change();
setInterval(change, 5000);

const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);