import React from 'react';

const Table = ({ employees, delEmployee }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            return (
              <tr key={index}>
                <th>{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.job}</td>
                <td>
                  <button onClick={() => delEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
  export default Table;