import { Dispatch, SetStateAction, FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

interface SearchBarProps {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ search, setSearch }) => (
  <div className="search-bar">
    <Form.Control
      name="search"
      value={search}
      placeholder="Search a service"
      onChange={(e) => setSearch(e.target.value)}
    />
    <Search id="search-magnifying-glass" />
  </div>
);

export default SearchBar;
