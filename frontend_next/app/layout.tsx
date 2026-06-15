import type { Metadata } from "next";
import { ThemeProvider } from "../src/context/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jay Kapade — Portfolio",
  description:
    "Portfolio of Jay Kapade — Full Stack Web Developer, UI/UX Designer, and 3D Artist.",
  icons: {
    icon: "/favicon.ico",
  },
};

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body cz-shortcut-listen="true">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
