import React, { useState, useEffect } from 'react';
import './App.css'
const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const recordsPerPage = 20;
  useEffect(() => {
    fetch('http://localhost:5000/api/data') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setData(result);
        setFilteredData(result);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  };

  // Filter data based on search term
  const filterData = (term) => {
    const filtered = data.filter((item) =>
      item.customerName.toLowerCase().includes(term.toLowerCase()) ||
      item.location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const sortData = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = new Date(a.created_at);
      const bValue = new Date(b.created_at);

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setFilteredData(sorted);
  };

  // Paginate data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        className='search'
        placeholder="Search "
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <p> Search based on customer name or location</p>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th className='sort' onClick={sortData}>
              Date {sortOrder === 'asc' ? '▼' : '▲'}
            </th>
            <th className='sort' onClick={sortData}>
              Time {sortOrder === 'asc' ? '▼' : '▲'}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.sno}>
              <td>{record.sno}</td>
              <td>{record.customerName}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{new Date(record.created_at).toLocaleDateString()}</td>
              <td>{new Date(record.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {/* Pagination */}
        {Array.from({ length: Math.ceil(filteredData.length / recordsPerPage) }).map(
          (_, index) => (
            <button className='btn' key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;
