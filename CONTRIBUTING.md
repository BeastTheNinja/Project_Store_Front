# Contributing to Project Store Front

Thank you for considering contributing to this project! Your help is appreciated—whether you’re reporting a bug, suggesting an enhancement, or submitting code.

---

## Getting Started

1. **Fork the repository** and clone it to your local machine.
2. **Create a new branch** for your change:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Edit JavaScript in the `js/` directory using ES6 module syntax.
   - Edit styles in the `scss/` directory, following the 7-1 architecture.
   - Test your changes locally (see instructions in README).

4. **Commit your changes** with clear, descriptive messages.
5. **Push to your fork** and open a Pull Request (PR) on the main repo.
6. **Describe your PR**: Explain what you changed and why.

---

## Code Style Guidelines

- **JavaScript**:  
  - Use ES6+ features (arrow functions, modules, `const`/`let`)
  - One module per file in `js/`
  - Prefer descriptive variable and function names
  - Keep functions small and focused

- **SCSS**:  
  - Follow the [7-1 architecture](https://sass-guidelin.es/#the-7-1-pattern)
  - Use variables and mixins from `abstracts/`
  - Place component styles in `components/`, page-specific in `pages/`
  - Use BEM or similar naming for classes

- **HTML**:  
  - Keep markup semantic and accessible (use ARIA and alt tags where necessary)
  - Use proper heading order

---

## Commit Message Format

- Use descriptive messages, e.g.:
  ```
  feat: add product search bar
  fix: correct cart item counter bug
  docs: update README with new setup instructions
  ```
- Use English for all commit messages.

---

## Pull Request Process

1. Ensure your code builds and works as expected.
2. Reference related issues in your PR description (e.g., `Closes #10`).
3. Wait for code review, respond to feedback, and make necessary changes.

---

## Manual QA Checklist

Before opening your PR, make sure you:

- [ ] Test on desktop and mobile
- [ ] Add/remove items from cart
- [ ] Complete a purchase flow
- [ ] Check responsive layout and accessibility

---

## Reporting Bugs & Requesting Features

- **Bugs**: Please open an issue with steps to reproduce, expected/actual behavior, and screenshots if applicable.
- **Features**: Open an issue describing your idea, why it’s needed, and how it would benefit users.

---

## Resources

- [Project Wiki](https://github.com/BeastTheNinja/Project_Store_Front/wiki)
- [SCSS 7-1 Architecture Guide](https://sass-guidelin.es/#the-7-1-pattern)
- [DummyJSON API](https://dummyjson.com/docs/products)

---

Thank you for helping make this project better!
