const $ = document;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const allInputContainers = $.querySelectorAll(".input");
const dayInputElem = $.getElementById("dayInput");
const monthInputElem = $.getElementById("monthInput");
const yearInputElem = $.getElementById("yearInput");

const allInputElems = [dayInputElem, monthInputElem, yearInputElem];

const dayOutputElem = $.querySelector(".day-out");
const monthOutputElem = $.querySelector(".month-out");
const yearOutputElem = $.querySelector(".year-out");

const calBtnElem = $.querySelector(".cal-btn");

let calculationStatus;

let userYear;
let userMonth;
let userDay;

// OPERATE ON ENTER

allInputElems.forEach((inputElem) => {
  inputElem.addEventListener("keypress", (e) => {
    let pressedKey = e.keyCode;

    if (pressedKey === 13) {
      InputsValidation();

      if (calculationStatus) {
        clearInputsError();
        ageCalculation();
        showAge(userYear, userMonth, userDay);
      }
    }
  });
});

calBtnElem.addEventListener("click", () => {
  InputsValidation();

  if (calculationStatus) {
    clearInputsError();
    ageCalculation();
    showAge(userYear, userMonth, userDay);
  }
});

const InputsValidation = () => {
  calculationStatus = true;
  if (Number(dayInputElem.value) > 31 || Number(dayInputElem.value) < 1) {
    invalidDay();
    calculationStatus = false;
  }

  if (Number(monthInputElem.value) > 12 || Number(monthInputElem.value) < 1) {
    invalidMonth();
    calculationStatus = false;
  }

  if (Number(yearInputElem.value) > 2023 || Number(yearInputElem.value) < 1900) {
    invalidYear();
    calculationStatus = false;
  }
};

// SHOW ERROR MESSAGES

const invalidDay = () => {
  if (!dayInputElem.nextElementSibling) {
    dayInputElem.parentElement.classList.add("invalid-input");

    let errorMsg = $.createElement("p");
    errorMsg.innerHTML = "Must be a  valid day";
    errorMsg.classList.add("error-msg");
    dayInputElem.parentElement.append(errorMsg);
  }
};

const invalidMonth = () => {
  if (!monthInputElem.nextElementSibling) {
    monthInputElem.parentElement.classList.add("invalid-input");

    let errorMsg = $.createElement("p");
    errorMsg.innerHTML = "Must be a  valid month";
    errorMsg.classList.add("error-msg");
    monthInputElem.parentElement.append(errorMsg);
  }
};

const invalidYear = () => {
  if (!yearInputElem.nextElementSibling) {
    yearInputElem.parentElement.classList.add("invalid-input");

    let errorMsg = $.createElement("p");
    errorMsg.innerHTML = "Must be a  valid year";
    errorMsg.classList.add("error-msg");
    yearInputElem.parentElement.append(errorMsg);
  }
};

const ageCalculation = () => {
  userYear = currentYear - Number(yearInputElem.value);
  userMonth = Number(monthInputElem.value);
  userDay = Number(dayInputElem.value);

  if (currentMonth < userMonth || (userMonth === currentMonth && userDay < currentDay)) {
    userYear--;
  }
  if (userDay > currentDay) {
    userDay = 30 - userDay + currentDay;
  } else {
    userDay = currentDay - userDay;
  }
  if (userMonth < currentMonth && userDay > currentDay) {
    userMonth = currentMonth - userMonth - 1;
  } else if (userMonth === currentMonth && userDay > currentDay) {
    userMonth = 11;
    userYear--;
  } else {
    userMonth = currentMonth - userMonth;
  }
};

// SHOW RESUT IN DOM

const showAge = (userYear, userMonth, userDay) => {
  numberAnimation(yearOutputElem, userYear);
  numberAnimation(monthOutputElem, userMonth);
  numberAnimation(dayOutputElem, userDay);
};

const clearInputsError = () => {
  allInputContainers.forEach((inputElem) => {
    if (inputElem.className.includes("invalid-input")) {
      let invalidinputElem = inputElem;

      invalidinputElem.lastElementChild.remove();
      invalidinputElem.classList.remove("invalid-input");
    }
  });
};

// COUNTER EFFECT

const numberAnimation = (targetElem, time) => {
  const value = time;
  let data = 0;
  const addNumber = () => {
    if (data < value) {
      data++;
      targetElem.innerHTML = data;
      setTimeout(addNumber, 20);
    }
  };
  addNumber();
};
