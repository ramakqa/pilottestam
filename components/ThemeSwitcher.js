export const ThemeSwitcher = ({ }) => (
    <div className="relative text-right pt-1 pr-1 top-1 text-sm right-1 sm:absolute sm:top-8 sm:right-6 sm:text-base">
        <select className="select select-bordered focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" data-choose-theme>
            <option value="">Default</option>
            <option value="dark">Dark</option>
            <option value="retro">Retro</option>
        </select>
    </div>
  );