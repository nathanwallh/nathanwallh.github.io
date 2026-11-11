let mathJaxReady;

function loadMathJax() {
    if (!mathJaxReady) {
        mathJaxReady = new Promise((resolve, reject) => {
            window.MathJax = { startup: { typeset: false } };

            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@4.0.0/tex-chtml.js";
            script.async = true;
            script.onload = () => window.MathJax.startup.promise.then(() => resolve(window.MathJax), reject);
            script.onerror = () => {
                script.remove();
                reject(new Error("MathJax could not be loaded."));
            };
            document.head.append(script);
        }).catch((error) => {
            mathJaxReady = undefined;
            throw error;
        });
    }

    return mathJaxReady;
}

document.querySelectorAll(".abstract-toggle").forEach((button) => {
    const abstract = document.getElementById(button.getAttribute("aria-controls"));

    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        abstract.hidden = expanded;

        if (!expanded) {
            loadMathJax()
                .then((mathJax) => mathJax.typesetPromise([abstract]))
                .catch((error) => console.warn("The abstract is available, but its equations could not be typeset.", error));
        }
    });
});
