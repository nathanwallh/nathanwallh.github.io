let mathJaxReady;
const abstractTypesetting = new WeakMap();

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

function typesetAbstract(abstract) {
    if (!abstractTypesetting.has(abstract)) {
        const ready = loadMathJax()
            .then((mathJax) => {
                if (abstract.hidden) {
                    abstractTypesetting.delete(abstract);
                    return;
                }

                return mathJax.typesetPromise([abstract]);
            })
            .catch((error) => {
                abstractTypesetting.delete(abstract);
                throw error;
            });
        abstractTypesetting.set(abstract, ready);
    }

    return abstractTypesetting.get(abstract);
}

document.querySelectorAll(".abstract-toggle").forEach((button) => {
    const abstract = document.getElementById(button.getAttribute("aria-controls"));

    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        abstract.hidden = expanded;

        if (!expanded) {
            typesetAbstract(abstract)
                .catch((error) => console.warn("The abstract is available, but its equations could not be typeset.", error));
        }
    });
});

// Warm up the renderer before the first expansion; a failed download is retried on click.
loadMathJax().catch(() => {});
