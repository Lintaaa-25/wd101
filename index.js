let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries.map((entry) => {
    return `
      <tr>
        <td class='border px-4 py-2'>${entry.name}</td>
        <td class='border px-4 py-2'>${entry.email}</td>
        <td class='border px-4 py-2'>${entry.password}</td>
        <td class='border px-4 py-2'>${entry.dob}</td>
        <td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>
      </tr>`;
  }).join("\n");

  const table = `
    <table class="table-auto w-full">
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
      </tr>
      ${tableEntries}
    </table>`;

  document.getElementById("user-entries").innerHTML = table;
};

function getAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function setDobRange() {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  const formatDate = (date) => date.toISOString().split("T")[0];

  const dobInput = document.getElementById("dob");
  dobInput.max = formatDate(maxDate);
  dobInput.min = formatDate(minDate);
}

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

// Apply date range on load
window.addEventListener("DOMContentLoaded", () => {
  displayEntries();
  setDobRange();
});

// Custom email validation using reportValidity
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => validate(emailInput));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The Email is not in the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

userForm.addEventListener("submit", saveUserForm);
