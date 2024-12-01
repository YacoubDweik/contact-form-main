let submitButton = document.querySelector(".submit input");
let fname = document.querySelector("form #fname");
let lname = document.querySelector("form #lname");
let email = document.querySelector("form #email");
let query = document.querySelectorAll(
  "form input[type='radio']"
);
let msg = document.querySelector("form #msg");
let consent = document.querySelector("form #consent");
let errorSpans = document.querySelectorAll(".error");
let msgSent = document.querySelector(".msg-sent");

let errorList = {
  fname: false,
  lname: false,
  email: false,
  query: false,
  msg: false,
  consent: false,
};
let send = false;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
  // Reset Errors
  errorSpans.forEach((error) =>
    error.classList.remove("active")
  );

  errorList = {
    fname: false,
    lname: false,
    email: false,
    query: false,
    msg: false,
    consent: false,
  };

  // Check Inputs
  checkInput(fname);
  checkInput(lname);

  if (!emailRegex.test(email.value)) {
    errorList["email"] = true;
  }

  let isQueryChecked = 0;
  query.forEach((radio) =>
    radio.checked ? isQueryChecked++ : false
  );

  if (isQueryChecked == 0) {
    errorList["query"] = true;
  }

  checkInput(msg);

  if (!consent.checked) {
    errorList["consent"] = true;
  }

  Object.entries(errorList).forEach((entry) => {
    if (entry[1] == true) {
      document
        .querySelector(`.${entry[0]} .error`)
        .classList.add("active");
    }
  });

  let send = Object.values(errorList).every(
    (value) => value == false
  );

  if (send) {
    // Send all the inputs
    msgSent.classList.add("active");
    fname.value = "";
    lname.value = "";
    email.value = "";
    query.forEach((radio) => (radio.checked = false));
    msg.value = "";
    consent.checked = false;
    setTimeout(
      () => msgSent.classList.remove("active"),
      1000
    );
  }
}

function checkInput(input) {
  if (input.value == "") {
    errorList[input.id] = true;
  }
}
