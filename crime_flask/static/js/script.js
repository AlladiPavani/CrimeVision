document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const dropZone = document.querySelector(".drop-zone");
    const preview = document.querySelector(".preview-img");

    // ✅ Preview selected file
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });
    }

    // ✅ Drag & Drop support
    if (dropZone) {
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add("drag-over");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("drag-over");
        });

        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("drag-over");

            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                const reader = new FileReader();
                reader.onload = function (event) {
                    preview.src = event.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });
    }

    // ✅ Scroll animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on page load
});
