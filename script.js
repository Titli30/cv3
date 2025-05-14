const startBtn = document.getElementById("startBtn");
const builderSection = document.getElementById("builderSection");
const resumeForm = document.getElementById("resumeForm");
const resumeContainer = document.getElementById("resumeContainer");
const resumeOutput = document.getElementById("resumeOutput");

let darkTheme = false;
let templateModern = false;

startBtn.addEventListener("click", () => {
  builderSection.classList.remove("hidden");
  startBtn.disabled = true;
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("theme-dark");
  darkTheme = !darkTheme;
});

document.getElementById("templateToggle").addEventListener("click", () => {
  resumeContainer.classList.toggle("template-modern");
  templateModern = !templateModern;
});

resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const guardian = document.getElementById("guardian").value;
  const company = document.getElementById("company").value;
  const project = document.getElementById("project").value;
  const skills = document.getElementById("skills").value;
  const hobbies = document.getElementById("hobbies").value;

  const imageInput = document.getElementById("imageUpload");
  const imageFile = imageInput.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    resumeContainer.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Guardian:</strong> ${guardian}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      ${project ? `<p><strong>Project:</strong> <a href="${project}" target="_blank">${project}</a></p>` : ""}
      <p><strong>Skills:</strong> ${skills}</p>
      <p><strong>Hobbies:</strong> ${hobbies}</p>
      <img src="${reader.result}" style="width:120px;height:120px;border-radius:50%;margin-top:10px;" />
    `;

    resumeOutput.style.display = "block";
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

document.getElementById("downloadPdf").addEventListener("click", () => {
  const container = document.getElementById("resumeContainer");
  const clone = container.cloneNode(true);

  // Remove image before PDF generation
  const img = clone.querySelector("img");
  if (img) img.remove();

  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(clone).save();
});
