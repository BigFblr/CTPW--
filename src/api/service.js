let employees = [
    { id: 1, name: "John Doe", job: "Developer" },
    { id: 2, name: "Jane Smith", job: "Designer" },

  ];
  
  const EmployeeAPI = {
    all: () => employees,
  
    add: (employee) => {
      const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
      const newEmployee = { id: newId, ...employee };
      employees.push(newEmployee);
      return newEmployee;
    },
  
    delete: (id) => {
      const index = employees.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        employees.splice(index, 1);
        return true;
      }
      return false;
    },
  };
  
  export default EmployeeAPI;
  