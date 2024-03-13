import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HomePage.css";

const options = [
    { id: 1, label: 'New York', value: 'new_york' },
    { id: 2, label: 'Los Angeles', value: 'los_angeles' },
    { id: 3, label: 'Chicago', value: 'chicago' },
    { id: 4, label: 'Houston', value: 'houston' },
    // Add more locations as needed
  ];
const YourComponent = () => {
  const [name, setName] = useState('');
  const [locationOptions, setLocationOptions] = useState(options);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch location options
    setLocationOptions(locationOptions);
  }, []);

  //Mockup api code 
 /*  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

      try {
        const response = await axios.get('YOUR_API_ENDPOINT');
        setLocationOptions(locationOptions);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); */
  const handleNameChange = async (e) => {
    const newName = e.target.value;
    setError("");
    // Allow only alphabets
    if (/^[a-zA-Z]*$/.test(newName) || newName === '') {
      setName(newName);
      setNameError('');
    }else{
        setNameError("please enter valid name");
    }
  };

  const handleLocationChange = (e) => {
    setError("");
    setSelectedLocation(e.target.value);
  };

  const handleAdd = () => {
    if (name && selectedLocation && nameError==="") {
      setData([...data, { name, location: selectedLocation }]);
      // Clear input fields after adding data
      setName('');
      setSelectedLocation('');
    }else if(name && !selectedLocation){
        setError("please select the location")
    }else if(!name && selectedLocation){
        setError("please Enter the name");
    }else if(!name && !selectedLocation){
        setError("please enter name and location");
    }

  };
  const handleNameBlur = async () => {
    if (name && data.some((item) => item.name === name)) {
      setNameError('This name already exists');
    } else {
      setNameError('');
    }
  };
  const handleClear= () => {
    setName("");
    setNameError('');
    setSelectedLocation("");
    setData([]);
  }
  return (
<div className="container" style={{ overflow: 'auto' }}>
    <form>
        <div className="form-group" style={{marginBottom:"2%",marginTop:"2%"}}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className={`form-control ${nameError ? 'is-invalid' : ''}`}
            id="name"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
          {!isNameAvailable && <div className="invalid-feedback">This name is already taken</div>}
        </div>
        <div className="form-group" style={{marginBottom:"2%"}}>
          <label htmlFor="location">Location:</label>
          <select
            className="form-control"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">Select Location</option>
            {locationOptions.map((location) => (
              <option key={location.id} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>
        <div className='actionButtons'>
        <button type="button" className="btn btn-primary" style={{marginBottom:"2%",marginRight:"2%"}} onClick={handleClear}>
          Clear
        </button>
        <button type="button" className="btn btn-primary" style={{marginBottom:"2%"}} onClick={handleAdd}>
          Add
        </button>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}

      </form>

      <h2>Added Data</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: "82%",
    margin: "0% auto" }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
