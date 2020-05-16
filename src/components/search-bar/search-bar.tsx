import * as React from 'react';

type Props = {
  onSearchBarChahge: (value: string) => void,
  searchInputValue: string,
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const {
    onSearchBarChahge, searchInputValue,
  } = props;
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand font-weight-bold">Contacts</span>
      <form
        className="form-inline"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchInputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSearchBarChahge(e.target.value);
          }}
        />
      </form>
    </nav>
  );
};

export default SearchBar;
