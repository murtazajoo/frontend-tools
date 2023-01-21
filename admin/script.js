async function checkLoggedIn() {
  await loginCheck();
  !loggedIn ? (window.location = "../user") : "";
}

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
checkLoggedIn();
fetchTools();
let inputElements = {
  inputName: document.getElementById("name"),
  inputUrl: document.getElementById("url"),
  inputCategory: document.getElementById("category"),
  inputDiscription: document.getElementById("discription"),
  inputImageUrl: document.getElementById("image-url"),
};
let { inputName, inputUrl, inputCategory, inputDiscription, inputImageUrl } =
  inputElements;

let previewElements = {
  previewName: document.getElementById("preview-name"),
  previewCategory: document.getElementById("preview-category"),
  previewImageUrl: document.getElementById("preview-image-url"),
};
let { previewName, previewCategory, previewImageUrl } = previewElements;

function livePreview() {
  toolName = inputName.value;
  category = inputCategory.value.split(",");
  imageUrl = inputImageUrl.value;
  category.length = 3;
  previewName.innerText = toolName;
  previewCategory.innerHTML = "";
  category.map((c) => {
    previewCategory.innerHTML += `<span class="category">${c}</span>`;
  });
  previewImageUrl.setAttribute("src", imageUrl);
}

let allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
  input.addEventListener("input", livePreview);
});

async function uploadToDb() {
  let button = document.getElementById("upload");
  toolName = inputName.value;
  url = inputUrl.value;
  category = inputCategory.value.toUpperCase().split(",");
  imageUrl = inputImageUrl.value;
  discription = inputDiscription.value;

  category.map((e) => {
    if (!categories.includes(e)) {
      return throwAlert(
        "Wrong Category Please add from valid categories only",
        false
      );
    }
  });

  if (!toolName || !url || !imageUrl || !discription || !category) {
    throwAlert("Some field are empty please fill them first", false);
    return;
  }
  if (toolName.length > 20) {
    return throwAlert("Tool Name too big (max-20 letters)", false);
  } else if (discription.length > 150) {
    return throwAlert("Discription is too big (max-150 letters)", false);
  }
  checkUrl = url;
  let haveMatch = toolsData.filter(
    (tool) =>
      // tool.url.split(".")[0].slice(8) === checkUrl.split(".")[0].slice(8)
      tool.name.replace(/[\W_]+/g, "") === toolName.replace(/[\W_]+/g, "")
  );
  if (haveMatch.length >= 1) {
    return throwAlert("This Tool is already present on the website", false);
  }
  button.classList.add("disabled");

  tool = {
    name: toolName,
    discription: discription.substr(0, 300),
    url: url,
    "image-url": imageUrl,
    votes: 0,
    category: category,
    "user-voted": [""],
    bookmark: [""],
    "added-by": userData.id,
  };

  await fetch("https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/tools", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  });
  button.classList.remove("disabled");

  Object.values(inputElements).forEach((e) => {
    e.value = "";
  });
  throwAlert("TOOL Successfully added to Database", true);
  fetchTools();
}

function throwAlert(message, condition) {
  window.scroll(0, 0);
  document.getElementById(
    "alert-holder"
  ).innerHTML = `<div class="alert alert-${
    condition ? "success" : "danger"
  } alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
}
