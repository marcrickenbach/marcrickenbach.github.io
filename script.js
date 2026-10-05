const projectPreview = document.querySelector("#project-preview");
const previewImage = projectPreview.querySelector("img");
const previewCaption = projectPreview.querySelector(".preview-caption");
const projectLinks = document.querySelectorAll(".project-link");

function hideProjectPreview() {
    projectPreview.hidden = true;
    previewImage.removeAttribute("src");
    previewImage.alt = "";
    previewCaption.textContent = "";
    projectLinks.forEach((link) => link.setAttribute("aria-expanded", "false"));
}

projectLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const alreadySelected = !projectPreview.hidden && previewImage.src === link.href;
        if (alreadySelected) {
            hideProjectPreview();
            return;
        }

        previewImage.src = link.href;
        previewImage.alt = `${link.textContent.trim()} project image`;
        previewCaption.textContent = link.dataset.description;
        projectPreview.hidden = false;
        projectLinks.forEach((projectLink) => {
            projectLink.setAttribute("aria-expanded", String(projectLink === link));
        });
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !projectPreview.hidden) {
        hideProjectPreview();
    }
});
