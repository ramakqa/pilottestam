export const ThemeSwitcher = ({ }) => (
    <div className="absolute top-8 right-6">
        <select className="outline-0" data-choose-theme>
        <option value="">Default</option>
        <option value="dark">Dark</option>
        <option value="retro">Retro</option>
        </select>
    </div>
  );