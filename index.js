const form = document.getElementById("user-form");
const dobInput = document.getElementById("dob");
const userEntriesTable = document.getElementById("user-entries");

// Set DOB range between 18 and 55
const today = new Date();
const maxDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDOB = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

dobInput.max = maxDOB.toISOString().split("T")[0];
dobInput.min = minDOB.toISOString().split("T")[0];

// Retrieve user entries from localStorage
function getUserEntries() {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

// Save user entries to localStorage
function saveUserEntries(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

// Render the entries in the table
function displayEntries() {
  const entries = getUserEntries();
  userEntriesTable.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptTerms}</td>
    `;
    userEntriesTable.appendChild(row);
  });
}

// Custom email validation
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Validate DOB
function isValidDOB(dob) {
  const dobDate = new Date(dob);
  return dobDate >= minDOB && dobDate <= maxDOB;
}

// Form submission handler
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!isValidEmail(email)) {
    alert("Invalid email");
    return;
  }

  if (!isValidDOB(dob)) {
    alert("You must be between 18 and 55 years old.");
    return;
  }

  const newEntry = {
    name,
    email,
    password,
    dob,
    acceptTerms: acceptTerms ? true : false
  };

  const entries = getUserEntries();
  entries.push(newEntry);
  saveUserEntries(entries);
  displayEntries();
  form.reset();
});

// On page load, show table with only headers
window.addEventListener("DOMContentLoaded", displayEntries);




