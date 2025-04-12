import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [regions, setRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    axios.get('https://countries-api-abhishek.vercel.app/countries')
      .then(res => {
        const data = res.data.data;
        setCountries(data);
        setFilteredCountries(data);

        const uniqueRegions = Array.from(new Set(data.map(country => country.region))).filter(Boolean);
        setRegions(uniqueRegions);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    const result = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === 'all' || country.region === filter)
    );
    setFilteredCountries(result);
    setSearchPerformed(true);

    if (result.length === 1) {
      setSelectedCountry(result[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    const result = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (value === 'all' || country.region === value)
    );
    setFilteredCountries(result);
  };

  const handleBack = () => {
    setSelectedCountry(null);
    setSearchTerm('');
    setFilteredCountries(countries);
    setSearchPerformed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCountryDetails = (country) => (
    <div
      style={{
        marginTop: '20px',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        fontSize: '16px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <h2>{country.name}</h2>
      <img src={country.flag} alt={country.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Coordinates:</strong> Lat {country.coordinates.latitude}, Lng {country.coordinates.longitude}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Currency:</strong> {country.currency}</p>
      <p><strong>Languages:</strong> {country.languages.join(', ')}</p>
      <p><strong>Borders:</strong> {country.borders.length > 0 ? country.borders.map((code, i) => <span key={i} style={{ marginRight: '5px', backgroundColor: '#4CAF50', padding: '4px 8px', borderRadius: '5px' }}>{code}</span>) : 'None'}</p>

      <button onClick={handleBack} style={{
        marginTop: '20px',
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px'
      }}>⬅ Back</button>
    </div>
  );

  return (
    <div style={{ padding: 0, backgroundColor: '#181818', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
      <header style={{ backgroundColor: '#212121', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', margin: 0, color: '#fff' }}>Country Display by JC</h1>
        <nav>
          <button onClick={() => setCurrentPage('home')} style={{ margin: '0 10px', padding: '8px 16px', borderRadius: '8px', backgroundColor: '#4CAF50', border: 'none', color: '#fff', cursor: 'pointer' }}>Home</button>
          <button onClick={() => setCurrentPage('about')} style={{ margin: '0 10px', padding: '8px 16px', borderRadius: '8px', backgroundColor: '#4CAF50', border: 'none', color: '#fff', cursor: 'pointer' }}>About Us</button>
        </nav>
      </header>

      {currentPage === 'about' ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>About Us</h2>
          <p>This project was built to provide details or information about the different countries in the World.</p>
        </div>
      ) : selectedCountry ? (
        renderCountryDetails(selectedCountry)
      ) : (
        <>
          <div style={{ textAlign: 'center', margin: '20px 0', padding: '0 10px' }}>
            <input
              type="text"
              placeholder="Search countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                width: '250px',
                maxWidth: '100%',
                marginRight: '10px',
                borderRadius: '8px',
                border: '2px solid #4CAF50',
                fontSize: '16px',
                color: '#333',
              }}
            />
            <button onClick={handleSearch} style={{
              padding: '10px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              fontSize: '16px'
            }}>
              Search
            </button>

            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              style={{
                marginLeft: '10px',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #4CAF50',
                fontSize: '16px',
                backgroundColor: '#212121',
                color: '#fff'
              }}
            >
              <option value="all">All Regions</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>

            {searchPerformed && (
              <button onClick={handleBack} style={{
                marginLeft: '10px',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                fontSize: '16px'
              }}>
                ⬅ Back
              </button>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            padding: '0 20px'
          }}>
            {filteredCountries.map((country, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedCountry(country);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#212121',
                  color: '#fff',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  textAlign: 'center',
                }}
              >
                <h2>{country.name}</h2>
                <img src={country.flag} alt={country.name} style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }} />
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Region:</strong> {country.region}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#212121',
        color: 'white',
        fontSize: '16px',
      }}>
        © JC Country Explorer !
      </footer>
    </div>
  );
};

export default App;
