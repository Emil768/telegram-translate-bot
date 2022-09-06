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
let count = 0;

add.addEventListener("click", () => {
  list.insertAdjacentHTML("afterbegin", create(inputValue.value));
  res.push(inputValue.value);
  console.log(JSON.stringify(res));
  inputValue.value = "";
  count++;
  document.getElementById("title").textContent = count;
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

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    list.insertAdjacentHTML("afterbegin", create(inputValue.value));
    res.push(inputValue.value);
    console.log(res);
    inputValue.value = "";
    updateAndDelete(list.querySelectorAll(".list__item"));
  }
});

// fetch("http://localhost:3333/upload", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "your_api_key",
//   },
// }).then((response) => {
//   console.log(response);
// });

console.log(
  JSON.stringify(
    "щавель щадить щебет щебетание щебетать Щебетовка щегол щеголять щедрость щедрый щека щекотать щелкать щель щенок щепотка щербина щетина щи щиколотка щипать щипнуть щипцы щит щука щур щурить щуриться Щёлкино щёлочь щётка".split(
      " "
    )
  )
);
