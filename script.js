let elementHolder = document.getElementById("tools-holder-element");
let discriptionHolder = document.getElementById("discription-text");
let loginAlert = document.getElementById("login-alert");
let tools;
async function render(filter) {
  if (!loggedIn) await loginCheck();
  if (!tools) await fetchTools();
  let toolsData = tools;
  if (filter === "HOME") {
    toolsData = tools;
  } else if (filter == "BOOKMARKS") {
    toolsData = tools.filter((tool) =>
      (tool.bookmark ? tool.bookmark : [""]).includes(userData.id.toString())
    );
  } else {
    toolsData = tools.filter((tool) =>
      tool.category.includes(filter.toUpperCase())
    );
  }

  finalHtml = "";

  toolsData.map((tool) => {
    tool.category;
    cateHtml = "";
    tool.category.map((c) => {
      cateHtml += `<span class="category">${c}</span>`;
    });
    liked = false;
    if (userData && tool["user-voted"].includes(userData.id.toString())) {
      liked = true;
    }
    bookmarked = false;
    if (
      tool.bookmark &&
      userData &&
      tool.bookmark.includes(userData.id.toString())
    ) {
      bookmarked = true;
    }
    finalHtml += `      <div class="col-lg-4">
              <div class="card border m-auto text-bg-dark" style="width: 18rem">
                <div class="card-body">
                  <img
                    
                    class="card-logo mx-2"
                    src="${tool["image-url"]}"
                    alt=""
                  />
                  <h5 class="card-title" >${
                    tool.name
                  } <button  data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="info-${
      tool.name
    }" data-bs-content="<p>${tool.discription.replace(
      /['"]+/g,
      ""
    )}</p><a class='btn btn-primary' href='${
      tool.url
    }' target='_blank'>visit</a>" data-bs-html="true" class="btn text-primary px-1 p-0 ">&#9432;</button></h5>
                  <div class="card-text d-flex">
                    <small class="text-muted">category</small>
                    <p >
                    ${cateHtml}</p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center py-2"
                  >
                    <button class="btn  text-primary likebtns" onclick="toggleLike(this,${
                      tool.id
                    })"  id='likebtn' liked=${liked ? "true" : "false"}>
                      <i class="fa-${
                        liked ? "solid text-danger" : "regular"
                      } fa-heart"> </i> <small> ${tool.votes}</small>
                    </button>
                    <div class="mark-link">
                      <button class="btn ${
                        bookmarked ? "btn-success " : "btn-primary "
                      }mx-2" onclick="toggleBookmark(this,${
      tool.id
    })" bookmark="false">
                        <i class="fa-${
                          bookmarked ? "solid" : "regular"
                        } fa-bookmark"></i>
                      </button>
                      <a href="${
                        tool.url
                      }" target="_blank" class="btn btn-primary">VISIT</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- too lend -->`;
  });
  if (finalHtml == "") {
    finalHtml += `
    <div id="loader" class="flex-column">
    <img class="img-fluid" style="max-height:50vh;" src="Empty-bro.svg">
    <h2 class="text-danger">
    NO TOOL FOUND IN THIS CATEGORY
    </h2>
    </div>
    `;
  }
  elementHolder.innerHTML = finalHtml;
  let likeBtns = document.querySelectorAll(".likebtns");
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  const popover = new bootstrap.Popover(".popover-dismiss", {
    trigger: "focus",
  });
}
render("HOME");

function renderDetails(id) {
  let tool = tools.filter((tool) => tool.id === id)[0];
  discriptionHolder.innerHTML = `
    <p class="fw-bloder h3">${tool.name.toUpperCase()}</p>
    <p>${tool.discription}</p>
<a href="${tool.url}" class="btn btn-primary">Visit</a>
  `;
  discriptionHolder.scrollIntoView(true);
}
function toggleLike(button, toolId) {
  if (!loggedIn) return loginAlert.click();
  let btn = button;
  let id = toolId;
  let icon = btn.children[0];
  let count = btn.children[1];
  let liked = btn.getAttribute("liked");
  let condition;
  let tool = tools.filter((tool) => tool.id === id)[0];
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  icon.classList.toggle("text-danger");
  let likedTool = tool.votes;
  let likes = parseInt(count.innerHTML);
  let bookmarks = tool.bookmark;
  let userVoted = tool["user-voted"];
  if (liked === "false") {
    likes++;
    count.innerHTML = likes;
    btn.setAttribute("liked", "true");
    condition = true;
  } else {
    likes--;
    count.innerHTML = likes;
    btn.setAttribute("liked", "false");
    condition = false;
  }
  updateVotesInTools(likedTool, userVoted, bookmarks, id, condition);
}

function toggleBookmark(button, toolId) {
  if (!loggedIn) return loginAlert.click();

  let condition;
  let id = toolId;

  let btn = button;
  icon = btn.children[0];
  btn.classList.toggle("btn-primary");
  btn.classList.toggle("btn-success");

  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  let bookmarked = btn.getAttribute("bookmark");
  let tool = tools.filter((tool) => tool.id === id)[0];
  let votes = tool.votes;
  let bookmarks = tool.bookmark;

  let userVoted = tool["user-voted"];
  if (bookmarked == "false") {
    btn.setAttribute("bookmark", "true");
    condition = true;
  } else {
    btn.setAttribute("bookmark", "false");
    condition = false;
  }
  bookmarkUpdate(votes, userVoted, bookmarks, toolId, condition);
}
