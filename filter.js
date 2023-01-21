let filterCon = document.getElementById("filter-container");

let categories = [
  "HOME",
  "HTML",
  "CSS",
  "JS",
  "ICON",
  "FONT",
  "IMAGE",
  "DESIGN",
  "LIBRARIES",
  "FRAMEWORKS",
  "EXTENTIONS",
  "OTHER",
  "BOOKMARKS",
];

let catHTml = "";
let c = 0;

categories.map((category) => {
  catHTml += `<input
          type="radio"
          class="btn-check"
          name="filters"
          autocomplete="off"
          id="filter-${category.toLowerCase()}"
          ${c == 0 ? "checked" : ""}
        />
        <label onclick="render(this.id)" id="${category}" class="btn filter btn-outline-light" for="filter-${category.toLowerCase()}">${category.toUpperCase()}</label>`;
  c++;
});
filterCon.innerHTML = catHTml;

function disableAll() {
  let btns = document.querySelectorAll("button");
  btns.forEach((button) => {
    button.classList.add("disabled");
  });
  setTimeout(() => {
    btns.forEach((button) => {
      button.classList.remove("disabled");
    });
  }, 10000);
}
