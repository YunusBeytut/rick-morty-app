import './Filters.css';

//Filtering tasks, Cleaning and Selection
function Filters({ filters, setFilters, setItemsPerPage, sortOrder, setSortOrder, clearFilters }) {
    return (
        <div className="filters-container">
            <input
                type="text"
                placeholder="Search name"
                value={filters.name}
                onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                className="filter-input"
            />
            <select
                value={filters.status}
                onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                className="filter-select"
            >
                <option value="">Status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <select
                value={filters.gender}
                onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
                className="filter-select"
            >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            <select onChange={e => setItemsPerPage(Number(e.target.value))} className="filter-select">
                <option value={10}>10 Result</option>
                <option value={20}>20 Result</option>
                <option value={50}>50 Result</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="filter-select">
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
            </select>
            <button onClick={clearFilters} className="clear-button">Clear filters
            </button>
        </div>
    );
}

export default Filters;