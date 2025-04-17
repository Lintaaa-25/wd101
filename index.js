const userForm = document.getElementById("user-form");
const dobInput = document.getElementById("dob");

// Set DOB validation range (18–55 years)
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

dobInput.max = maxDate.toISOString().split("T")[0];
dobInput.min = minDate.toISOString().split("T")[0];

// Retrieve from localStorage
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

// Save to localStorage
const saveEntries = (entries) => {
  localStorage.setItem("user-entries", JSON.stringify(entries));
};

// Display the table entries
const displayEntries = () => {
  const entries = retrieveEntries();
  const tableBody = document.getElementById("user-entries");
  tableBody.innerHTML = entries.map(entry => `
    <tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms ? "Yes" : "No"}</td>
    </tr>
  `).join("");
};

// Validate DOB range
const isValidDob = (dob) => {
  const dobDate = new Date(dob);
  return dobDate >= minDate && dobDate <= maxDate;
};

// Handle form submission
const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isValidDob(dob)) {
    alert("You must be between 18 and 55 years old.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  const userEntries = retrieveEntries();
  userEntries.push(entry);
  saveEntries(userEntries);
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
window.addEventListener("load", displayEntries);

