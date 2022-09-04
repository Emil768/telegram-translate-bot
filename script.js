let inputValue = document.getElementById("text");
const add = document.getElementById("add");
const list = document.querySelector(".list");
const listItem = document.querySelectorAll(".list__item");

if (inputValue.value.length === 0) {
  inputValue.value = "value";
}
inputValue.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    e.target.value = "value";
  }
});

const updateAndDelete = (listItems) => {
  listItems.forEach((item) => {
    const title = item.querySelector(".list__title");
    item.querySelector(".delete").addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
    item.querySelector(".update").addEventListener("click", (e) => {
      title.setAttribute("contenteditable", true);
      title.onblur = () => {
        title.removeAttribute("contenteditable");
      };
    });
  });
};

updateAndDelete(listItem);

const res = [];

add.addEventListener("click", () => {
  list.insertAdjacentHTML("afterbegin", create(inputValue.value));
  res.push(inputValue.value);
  console.log(res);
  inputValue.value = "";
  updateAndDelete(list.querySelectorAll(".list__item"));
});

const create = (value) => {
  const li = `
    
    <li class="list__item">
        <span class="list__title">${value}</span> 
        <b class="delete">Удалить</b>
        <b class="update">Обновить</b>
  </li>
    `;

  return li;
};

// console.log(
//   "арба арбуз аргамак Аргентина аргумент аргументировать арена аренда арендатор арест арестованный арестовать арестовывать ариец арийский аристократ аристократия арифметика арифметический арка армейский Армения армия армянин Армянск армянский ароматный арсенал артель артерия артиллерист артиллерия артист археолог археология архив архивный архитектор архитектура архитектурный арык аскет Астана астра астролог астрология астроном астрономический астрономия асфальт атака атаковать атеист ателье атлантический атлас атлет атмосфера атмосферный атом атомный аттестат Атырау ау аул Афганистан Афины афиша афоризм Африка африканский аффикс ах ахать ахнуть ашуг Ашхабад аэродром аэропорт аят".split(
//     " "
//   )
// );

// fetch("http://localhost:3333/upload", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "your_api_key",
//   },
// }).then((response) => {
//   console.log(response);
// });
