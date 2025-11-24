# Vedant Shinde — Portfolio (Scaffold)

This is a lightweight Vite + React + TypeScript scaffold for a modern animated portfolio for Vedant Shinde. It includes Tailwind CSS with HSL theme variables, a ThemeProvider (dark/light with localStorage), Framer Motion animations, and modular sections/components.

## Install

Open a terminal in the project root and run:

```powershell
npm install
npm run dev
```

## Notes

- Tailwind is configured to use CSS HSL variables. Edit the variables in `src/index.css` for theme tuning.
- The site uses simple UI components implemented in `src/components/ui/*` (Button, Card, Badge, Input, Textarea, ThemeToggle). If you want to integrate the official `shadcn/ui` library, install its packages and swap components.
- The contact form is a stub — no backend integration included.

## Next steps

- Add assets (profile image, CV file at `/Vedant_Shinde_CV.pdf`).
- Optionally replace simple UI components with `shadcn/ui` components.
- Run `npm run build` to create a production build.
