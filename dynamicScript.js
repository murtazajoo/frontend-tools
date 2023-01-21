let userBtn = document.getElementById("user");
let burgerBtn = document.getElementById("burger");
let cookie = document.cookie.split(";");
let RequestError = false;
let reportErrorEle = document.getElementById("request-error");
let loggedIn = false;
let userData, token, toolsData;

cookie.map((e) => {
  e.split("=")[0] === "token" ? (token = e.split("=")) : token;
});
async function fetchTools() {
  await fetch("https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/tools")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.hasOwnProperty("message") || data.hasOwnProperty("status")) {
        setAlert();
      } else {
        toolsData = data;
        tools = data;
      }
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}

async function loginCheck() {
  if (loggedIn && userData && token[0] && token[1] !== "") {
    setUserProfile(userData.name, userData.email);
    burgerBtn.style.display = "block";
    userBtn.style.display = "none";
    loggedIn = true;

    return;
  } else if (token) {
    let headersList = {
      Accept: "application/json",
      Authorization:
        "dynamicScript.js:11eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.z98vVQ0oE1ABwQhHJ-YVrq8fsWHDcF7g3F3ghkxXC0Rw8kRiGs57FNY6G3eFt9dFq0MQRK0ZPEYAT-picqjxW0pHO_K7E9kH.IoY3rK3M3d7Wge-oqNpx6w.0ZuJcnIXxreRxElUUEH5V10bSL1LqydNQzDW06RZSeiNRooExQIdeIYkCIV9gbWPCRcDsebP4Z-9hCKxWJK12MxYAXhIH0eK0SvYVLyxLSjhOya7G5q1VP9Xu_vtPF3pV3J0V43u3NvUXUn0G4b2fZxYn-pGkp-PiOaJTWZ9OjY.BoYUZltRDVWxJVI_p2c3_aqGtQD16O3qERSouWYr8J8",
      Authorization: "Bearer " + token[1],
    };

    let response = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/auth/me",
      {
        method: "GET",
        headers: headersList,
      }
    );
    loggedIn = true;
    let data = await response.json();
    userData = data;
    setUserProfile(userData.name, userData.email);
    burgerBtn.style.display = "block";
    userBtn.style.display = "none";
  }
}

async function updateVotesInTools(
  votes,
  userVoted,
  bookmarks,
  toolId,
  condition
) {
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token[1],
  };
  let user = {
    id: userData.id,
  };
  let likedUser = userVoted ? userVoted : [""];
  condition
    ? likedUser.push(user.id.toString())
    : (likedUser = likedUser.filter((e) => e !== user.id.toString()));

  let bodyContent = JSON.stringify({
    tool_id: toolId,
    votes: condition ? votes + 1 : votes - 1,
    "user-voted": likedUser,
    bookmark: bookmarks,
  });

  let response = await fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/tools/${toolId}`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.hasOwnProperty("message") && data.hasOwnProperty("status")) {
    setAlert();
  }
}

async function bookmarkUpdate(votes, userVoted, bookmarks, toolId, condition) {
  let headersList = {
    Accept: "application/json",
    Authorization: "Bearer " + token[1],
    "Content-Type": "application/json",
  };
  let user = {
    id: userData.id,
  };
  let book = bookmarks ? bookmarks : [""];
  condition
    ? book.push(user.id.toString())
    : (book = book.filter((id) => id !== user.id.toString()));

  let bodyContent = JSON.stringify({
    tools_id: toolId,
    votes: votes,
    "user-voted": userVoted,
    bookmark: book ? book : ["0"],
  });

  let response = await fetch(
    "https://x8ki-letl-twmt.n7.xano.io/api:QiZJ31hn/tools/" + toolId,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.hasOwnProperty("message") && data.hasOwnProperty("status")) {
    setAlert();
  }
}

function setAlert() {
  disableAll();
  window.scroll(0, 0);
  reportErrorEle.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Too Many Requests , please wait 20 seconds and try again
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
  setTimeout(() => {
    reportErrorEle.innerHTML = "";
  }, 20000);
}
