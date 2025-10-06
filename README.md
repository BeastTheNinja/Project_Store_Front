# Project Store Front

**School project (production) for a store front**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Usage](#setup--usage)
- [SCSS 7-1 Architecture](#scss-7-1-architecture)
- [Contributing](#contributing)
- [Wiki & Documentation](#wiki--documentation)
- [License](#license)

---

## About

A modern, responsive storefront built as a school project using the DummyJSON API, modular JavaScript (ES6), and structured SCSS for scalable styling.

## Features

- Dynamic product listing from DummyJSON API
- Add to cart and purchase flow (with localStorage)
- Responsive design for mobile/tablet/desktop
- Category navigation, product search, and dropdowns
- Animated, accessible UI (keyboard navigation, ARIA)
- Modular codebase (ES6 modules, SCSS 7-1)

## Tech Stack

- **JavaScript** (ES6 Modules)
- **HTML5**
- **SCSS** (7-1 Architecture)
- [DummyJSON API](https://dummyjson.com/docs/products)

## Folder Structure

```
├── js/
│   ├── api.js
│   ├── cart.js
│   ├── main.js
│   └── view.js
├── scss/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── themes/
│   ├── vendors/
│   └── style.scss
├── index.html
├── README.md
└── ...
```

## Setup & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BeastTheNinja/Project_Store_Front.git
   cd Project_Store_Front
   ```
2. **Open `index.html` in your browser.**  
   _No build step required for vanilla HTML/JS/SCSS. Use Live Server or similar for hot reload._

3. **Development**
   - Edit SCSS files in the `scss/` directory. Compile using your preferred SASS compiler.
   - JavaScript modules live in the `js/` directory.

## SCSS 7-1 Architecture

- `abstracts/`: variables, mixins, functions
- `base/`: reset, typography, base styles
- `components/`: reusable UI pieces (product card, buttons, etc.)
- `layout/`: header, footer, nav, grid
- `pages/`: page-specific styles
- `themes/`: color themes
- `vendors/`: third-party styles

## Contributing

1. Fork the repo and create a new branch:  
   `git checkout -b feature/my-feature`
2. Commit your changes with clear messages.
3. Open a pull request and describe your changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Wiki](#wiki--documentation) for code style and architectural guidelines.

## Wiki & Documentation

- [Project Wiki](https://github.com/BeastTheNinja/Project_Store_Front/wiki)
- [Open Issues](https://github.com/BeastTheNinja/Project_Store_Front/issues)

## License

[MIT](LICENSE)  
(C) BeastTheNinja
