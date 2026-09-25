document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll("h2, p");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            if (element.tagName === "H2") {
                element.classList.add("stomp-text", "stomp");
            } else {
                typewriter(element);
            }

            observer.unobserve(element);
        });
    }, {
        threshold: 0.5,
    });

    animatedElements.forEach((element) => observer.observe(element));

    const accordionButtons = document.querySelectorAll(".accordion");

    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");

            const panel = button.nextElementSibling;
            panel.style.maxHeight = panel.style.maxHeight
                ? null
                : `${panel.scrollHeight}px`;
        });
    });
});

function typewriter(element) {
    const text = element.textContent.trim();
    let index = 0;

    element.textContent = "";

    function writeNextCharacter() {
        if (index >= text.length) {
            return;
        }

        element.textContent += text.charAt(index);
        index++;
        setTimeout(writeNextCharacter, 10);
    }

    writeNextCharacter();
}
