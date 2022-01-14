const options = Array.from(document.getElementsByClassName("options"));
const firstAnswer = document.getElementById("firstAnswer");
const secAnswer = document.getElementById("secAnswer");
const question1 = document.getElementById("question1");
const question2 = document.getElementById("question2");
const question3 = document.getElementById("question3");
const correctAns = Array.from(document.getElementsByClassName("correctAns"));
const wrongAns = Array.from(document.getElementsByClassName("wrongAns"));
const replayQu = document.getElementById("replay");
const showAnswers = document.getElementById("showAnswers");

// used to loop around the options array of "a" and "p"
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (e) => {
    getValues(e);
  });
}

var option;
// function used to get the inner value of option "a" or "p" and store them in a variable
function getValues(e) {
  option = e.target.innerHTML;
}

// used to listen to the click on each question and put the value of the variable if it was correct
question1.addEventListener("click", () => {
  console.log("you click one tap");
  console.log(option);
  if (option == "a" && option != "p") {
    question1.innerHTML = option;
    question1.style.pointerEvents = "none";
    correct(0);
  } else {
    wrong(0);
  }
});
question2.addEventListener("click", () => {
  if (option == "p" && option != "a") {
    question2.innerHTML = option;
    question2.style.pointerEvents = "none";
    correct(1);
  } else {
    wrong(1);
  }
});
question3.addEventListener("click", () => {
  if (option == "a" && option != "p") {
    question3.innerHTML = option;
    question3.style.pointerEvents = "none";
    correct(2);
  } else {
    wrong(2);
  }
});

// used to change the display of the correct/wrong img from none to flex when called
function correct(i) {
  wrongAns[i].classList.replace("d-flex", "d-none");
  correctAns[i].classList.replace("d-none", "d-flex");
}
function wrong(i) {
  wrongAns[i].classList.replace("d-none", "d-flex");
  correctAns[i].classList.replace("d-flex", "d-none");
}

// used when show answer img is clicked to call allanswers function
showAnswers.addEventListener("click", () => {
  allAnswers();
  showAnswers.style.pointerEvents = "none";
});

function allAnswers() {
  question1.innerHTML = "a";
  question1.style.pointerEvents = "none";

  question2.innerHTML = "p";
  question2.style.pointerEvents = "none";

  question3.innerHTML = "a";
  question3.style.pointerEvents = "none";

  for (let i = 0; i < correctAns.length; i++) {
    correctAns[i].classList.replace("d-none", "d-flex");
    wrongAns[i].classList.replace("d-flex", "d-none");
  }
}

replayQu.addEventListener("click", () => {
  resetAnswers();
});

function resetAnswers() {
  question1.innerHTML = " ";
  question1.style.pointerEvents = "auto";

  question2.innerHTML = " ";
  question2.style.pointerEvents = "auto";

  question3.innerHTML = " ";
  question3.style.pointerEvents = "auto";

  for (let i = 0; i < correctAns.length; i++) {
    correctAns[i].classList.replace("d-flex", "d-none");
  }
  showAnswers.style.pointerEvents = "auto";
  option = "";
}
// page Scaling

var pageWidth, pageHeight;

var basePage = {
  width: 420,
  height: 525,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};

$(function () {
  var $page = $(".page-content");

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  //using underscore to delay resize method till finished resizing window
  $(window).resize(
    _.debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 150)
  );

  function getPageSize() {
    pageHeight = $(".scale-page").height();
    pageWidth = $(".scale-page").width();
  }

  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;

    var newLeftPos = Math.abs(
      Math.floor(basePage.width * basePage.scale - maxWidth)
    );
    var newTopPos = Math.abs(
      Math.floor(basePage.height * basePage.scale - maxHeight)
    );

    page.attr(
      "style",
      "-webkit-transform:scale(" +
        basePage.scale +
        ");left:" +
        newLeftPos +
        "px;top:" +
        newTopPos +
        "px;"
    );
  }
});

$(".loader-inner").hide(2000);
$(".scale-page").fadeIn(4000);
