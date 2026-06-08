
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

const students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    studentList.innerHTML = "<li class='student-list__empty'>Nenhum aluno cadastrado ainda.</li>";
    return;
  }

  students.forEach((student, index) => {
    const item = document.createElement("li");
    item.className = "student-list__item";
    item.innerHTML = `
      <strong>${student.name}</strong>
      <span>Idade: ${student.age}</span>
      <span>Série: ${student.grade}</span>
      <button type="button" class="student-list__remove" data-index="${index}">Remover</button>
    `;
    studentList.appendChild(item);
  });
}

function clearForm() {
  studentForm.reset();
  document.getElementById("name").focus();
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = studentForm.name.value.trim();
  const age = studentForm.age.value.trim();
  const grade = studentForm.grade.value.trim();

  if (!name || !age || !grade) {
    return;
  }

  students.push({ name, age, grade });
  saveStudents();
  renderStudents();
  clearForm();
});

studentList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;

  const index = Number(button.dataset.index);
  students.splice(index, 1);
  saveStudents();
  renderStudents();
});

renderStudents();