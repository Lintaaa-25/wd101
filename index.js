let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
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

function setDobRange() {
  const today = new Date();
  const currentYear = today.getFullYear();

  const minYear = currentYear - 55;
  const maxYear = currentYear - 18;

  const minDate = new Date(minYear, 0, 1);     // Jan 1
  const maxDate = new Date(maxYear, 11, 31);   // Dec 31

  const formatDate = (date) => date.toISOString().split("T")[0];

  const dobInput = document.getElementById("dob");
  dobInput.min = formatDate(minDate);
  dobInput.max = formatDate(maxDate);
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

userForm.addEventListener("submit", saveUserForm);

window.addEventListener("DOMContentLoaded", () => {
  displayEntries();
  setDobRange();
});

