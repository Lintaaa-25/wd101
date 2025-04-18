const userForm = document.getElementById("user-form");

function getUserEntries() {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function displayEntries() {
  const entries = getUserEntries();
  const tableEntries = entries.map(entry => `
    <tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTermsAndConditions}</td>
    </tr>`).join("");

  const table = `
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
      </tr>
      ${tableEntries}
    </table>`;

  document.getElementById("user-entries").innerHTML = table;
}

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

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function saveUserForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  if (name.length < 2) {
    alert("Please enter a valid name (at least 2 characters).");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const age = getAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  if (!acceptedTermsAndConditions) {
    alert("You must accept the terms and conditions.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTermsAndConditions };
  const userEntries = getUserEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();

  userForm.reset();
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

userForm.addEventListener("submit", saveUserForm);

window.addEventListener("DOMContentLoaded", () => {
  displayEntries();
  setDobRange();
});
