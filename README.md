# nathanwallh.github.io

This repository maintains the website (`index.html` and `style.css`), the CV
(`CV/cv.tex` and `CV/cv.pdf`), and the complete list of publications with abstracts
(`LOP/lop.tex` and `LOP/lop.pdf`). The website links to the CV PDF and displays
expandable abstracts beside each publication's links. Abstract text in
`index.html` comes from `LOP/lop.tex`; keep both in sync when editing abstracts.
`publications.js` handles the toggles and loads MathJax from jsDelivr on the
first expansion to render the LaTeX equations.

## Building the documents

With a LaTeX installation that includes `latexmk`, run inside `CV/`:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error cv.tex
```

Run inside `LOP/`:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error lop.tex
```

Alternatively, build both from the repository root while keeping all output
inside each document's directory:

```sh
latexmk -cd -pdf -interaction=nonstopmode -halt-on-error CV/cv.tex LOP/lop.tex
```

Commit the updated `.tex` and `.pdf` files. LaTeX temporary files are ignored.
The CV uses the shared photograph at `Pictures/portrait.jpg`.
