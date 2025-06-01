import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterTable from './components/CharacterTable.jsx';
import Filters from './components/Filters.jsx';
import CharacterCard from './components/CharacterCard.jsx';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ name: '', status: '', gender: '' });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let all = [];
        for (let i = 1; i <= 10; i++) {
          const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${i}`);
          all = [...all, ...res.data.results];
        }
        setCharacters(all);
        setFilteredData(all);
      } catch (err) {
        setError('Veri alınamadı.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = characters.filter(char =>
      char.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.status ? char.status === filters.status : true) &&
      (filters.gender ? char.gender === filters.gender : true)
    );
    if (sortOrder === 'asc') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredData(data);
    setCurrentPage(0);
  }, [filters, characters, sortOrder]);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const clearFilters = () => {
    setFilters({ name: '', status: '', gender: '' });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Rick and Morty Characters</h1>

      <Filters
        filters={filters}
        setFilters={setFilters}
        setItemsPerPage={setItemsPerPage}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        clearFilters={clearFilters}
      />

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <p className="no-results">No results found.</p>
          ) : (
            <>
              <div className="pagination-top">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}>Previous</button>
                <span>Page {currentPage + 1}</span>
                <button
                  onClick={() =>
                    setCurrentPage(prev =>
                      (prev + 1) * itemsPerPage < filteredData.length ? prev + 1 : prev
                    )
                  }
                >Next</button>
              </div>
              <CharacterTable
                data={paginatedData}
                onSelect={setSelectedCharacter}
                selectedCharacter={selectedCharacter}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;