import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css'
//https://dummyjson.com/users
function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        if (Array.isArray(response.data.users)) {
          setData(response.data.users);
        } else {
          console.error("Data from the API does not contain a 'users' array.");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table className='table'>
      <thead className='thead'>
        <tr>
          <th>ID</th>
          <th>Eye Color</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>Username</th>
          <th>Password</th>
          <th>Birth Date</th>
          <th>Address</th>
          <th>Ip</th>
          <th>Company</th>
          {/* Add more headers for your data */}
        </tr>
      </thead>
      <tbody className='tbody'>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <div
                className="color-item"
                style={{ backgroundColor: item.eyeColor }}
              ></div>
            </td>
            <td><img src={item.image} className='img' alt={`Image for ${item.firstName} ${item.lastName}`} /></td>
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.birthDate}</td>
            <td>{item.address.address}, {item.address.city}, {item.address.postalCode}, {item.address.state}</td>
            <td>{item.ip}</td>
            <td>{item.company.title}, {item.company.department}, {item.company.address.address}, {item.company.address.city}, {item.company.address.postalCode}, {item.company.address.state}</td>
            {/* Add more table cells for your data */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;