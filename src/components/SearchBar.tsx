import SearchIconIcon from "../assets/search.svg";
import "../styles/searchbar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <img
        src={SearchIconIcon}
        className="search-bar__icon"
        alt="Search Icon"
      />
      <input
        type="text"
        placeholder="Поиск по названию статьи"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
    </div>
  );
};

export default SearchBar;
