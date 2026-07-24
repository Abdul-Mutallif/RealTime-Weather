import { useState } from 'react';

export default function SearchBar({ onSearch, loading = false, inputRef }) {
  const [city, setCity] = useState('Kanpur');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && onSearch && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city... (Ctrl+K)"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </>
          ) : (
            <>
              <i className="fas fa-search"></i> Search
            </>
          )}
        </button>
      </form>
    </div>
  );
}

