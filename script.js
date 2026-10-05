const projectPreview = document.querySelector("#project-preview");
const previewImage = projectPreview.querySelector("img");
const previewCaption = projectPreview.querySelector(".preview-caption");
const projectLinks = document.querySelectorAll(".project-link");
const projectLightbox = document.querySelector("#project-lightbox");
const lightboxImage = projectLightbox.querySelector("img");
const lightboxCaption = projectLightbox.querySelector(".preview-caption");
const mobileViewport = window.matchMedia("(max-width: 700px)");

function hideProjectPreview() {
    if (projectLightbox.open) {
        projectLightbox.close();
    }
    projectPreview.hidden = true;
    previewImage.removeAttribute("src");
    previewImage.alt = "";
    previewCaption.textContent = "";
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    projectLinks.forEach((link) => link.setAttribute("aria-expanded", "false"));
}

projectLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const alreadySelected = (!projectPreview.hidden && previewImage.src === link.href)
            || (projectLightbox.open && lightboxImage.src === link.href);
        if (alreadySelected) {
            hideProjectPreview();
            return;
        }

        if (mobileViewport.matches) {
            lightboxImage.src = link.href;
            lightboxImage.alt = `${link.textContent.trim()} project image`;
            lightboxCaption.textContent = link.dataset.description;
            projectLightbox.showModal();
        } else {
            previewImage.src = link.href;
            previewImage.alt = `${link.textContent.trim()} project image`;
            previewCaption.textContent = link.dataset.description;
            projectPreview.hidden = false;
        }
        projectLinks.forEach((projectLink) => {
            projectLink.setAttribute("aria-expanded", String(projectLink === link));
        });
    });
});

projectLightbox.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", hideProjectPreview);
});

projectLightbox.addEventListener("click", (event) => {
    if (event.target !== projectLightbox) return;
    const bounds = projectLightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        hideProjectPreview();
    }
});

projectLightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    hideProjectPreview();
});

function updatePreviewTarget() {
    projectLinks.forEach((link) => {
        link.setAttribute("aria-controls", mobileViewport.matches ? "project-lightbox" : "project-preview");
    });
}

updatePreviewTarget();
mobileViewport.addEventListener("change", () => {
    hideProjectPreview();
    updatePreviewTarget();
});

document.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");
    if (clickedLink && !clickedLink.classList.contains("project-link")) {
        hideProjectPreview();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && (!projectPreview.hidden || projectLightbox.open)) {
        event.preventDefault();
        hideProjectPreview();
    }
});
