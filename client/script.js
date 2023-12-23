// requirement:
// 1. The user can click on a dropdown result to select an item.
// 2. The user can use the Up and Down arrow keys to move through the results and press the Enter key to select an item.

const search = document.getElementById("search");
const results = document.getElementById("results");
const body = document.body;
let currentIndex = -1;

search.addEventListener("input", function () {
  const query = this.value.toLowerCase();

  fetch(`http://localhost:4000/states?search=${query}`)
    .then((response) => response.json())
    .then((states) => showResult(states))
    .catch((error) => console.error("Error:", error));
});

search.addEventListener("keydown", function (e) {
  const results = document.querySelectorAll("#results li");
  switch (e.key) {
    case "ArrowUp":
      keyUpDown(-1);
      break;
    case "ArrowDown":
      keyUpDown(1);
      break;
    case "Enter":
      if (currentIndex !== -1) {
        search.value = results[currentIndex].textContent;
        results.innerHTML = "";
      }
      break;
  }
});

body.addEventListener("click", function (e) {
  const tag = e.target.tagName;
  if (!["INPUT", "UL", "LI"].includes(tag)) {
    results.innerHTML = "";
  }
});

function showResult(states) {
  results.innerHTML = "";
  currentIndex = -1;
  if (states.length > 0) {
    states.forEach(function (state, index) {
      const listItem = document.createElement("li");
      listItem.textContent = state;
      listItem.addEventListener("click", function () {
        search.value = state;
        results.innerHTML = "";
      });
      listItem.addEventListener("mouseover", function () {
        currentIndex = index;
        highlightResult();
      });
      results.appendChild(listItem);
    });

    highlightResult();
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "No matches found";
    results.appendChild(listItem);
  }
}

function keyUpDown(direction) {
  const resultList = document.querySelectorAll("#results li");
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = resultList.length - 1;
  } else if (currentIndex >= resultList.length) {
    currentIndex = 0;
  }

  highlightResult();
}

function highlightResult() {
  const resultList = document.querySelectorAll("#results li");

  resultList.forEach((result, index) => {
    result.classList.toggle("highlighted", index === currentIndex);
  });
}
