const userForm = document.getElementById("user-form");
const dobInput = document.getElementById("dob");

// Set DOB validation range (18–55 years)
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

dobInput.max = maxDate.toISOString().split("T")[0];
dobInput.min = minDate.toISOString().split("T")[0];

// Get entries from localStorage
function getEntries() {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

// Save entries to localStorage
function saveEntries(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

// Add entry to table
function addEntryToTable(entry) {
  const tableBody = document.getElementById("user-entries");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.acceptedTerms ? "Yes" : "No"}</td>
  `;

  tableBody.appendChild(row);
}

// Render all saved entries
function renderEntries() {
  const entries = getEntries();
  document.getElementById("user-entries").innerHTML = ""; // Clear previous rows
  entries.forEach(addEntryToTable);
}

// Validate DOB
function isValidDob(dob) {
  const dobDate = new Date(dob);
  return dobDate >= minDate && dobDate <= maxDate;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  // HTML5 email input already prevents invalid formats,
  // but this adds extra assurance if needed
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!isValidDob(dob)) {
    alert("Your age must be between 18 and 55 years.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
  addEntryToTable(entry); // Show immediately

  userForm.reset(); // Clear form
}

// Event listeners
userForm.addEventListener("submit", handleFormSubmit);
window.addEventListener("DOMContentLoaded", renderEntries); // Show entries on load


