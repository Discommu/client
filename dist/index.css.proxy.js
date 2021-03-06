// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@tailwind base;\n@tailwind utilities;\n@tailwind components;\n\n@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto&display=swap');\n\nhtml {\n    scrollbar-width: thin;\n    overflow-x: hidden;\n}\n\n::-webkit-scrollbar {\n    width: 6px;\n}\n\n::-webkit-scrollbar-track {\n    background: #2a2626;\n}\n\n::-webkit-scrollbar-thumb {\n    border-radius: 5px;\n    background: #858585;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}