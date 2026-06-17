type SearchBarProps = {
    searchText: string;
    setSearchText: (value: string) => void;
  };
  
  function SearchBar({ searchText, setSearchText }: SearchBarProps) {
    return (
      <input
        className="search-input"
        type="text"
        placeholder="Search by task or module..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    );
  }
  
  export default SearchBar;