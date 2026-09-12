import { ThemeToggle } from "./components/ThemeToggle";
import { DemoContent } from "./components/DemoContent";

export default function App() {
  return (
    <div data-theme-transition className="min-h-screen bg-bg px-6 py-8 text-fg">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Theme Switcher &amp; Persistence
          </h1>
          <ThemeToggle />
        </header>
        <DemoContent />
      </div>
    </div>
  );
}
