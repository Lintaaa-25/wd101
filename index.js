const userForm = document.getElementById("user-form");
const dobInput = document.getElementById("dob");


const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

dobInput.max = maxDate.toISOString().split("T")[0];
dobInput.min = minDate.toISOString().split("T")[0];

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
  const entries = retrieveEntries();
  if (entries.length === 0) {
    document.getElementById("user-entries").innerHTML = "<p>No entries yet.</p>";
    return;
  }

  const tableRows = entries.map(entry => {
    return `
      <tr>
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptedTerms}</td>
      </tr>
    `;
  }).join("");

  const table = `
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>DOB</th>
        <th>Accepted Terms?</th>
      </tr>
      ${tableRows}
    </table>
  `;

  document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const entry = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
    acceptedTerms: document.getElementById("acceptTerms").checked
  };

  let userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
window.addEventListener("load", displayEntries);
