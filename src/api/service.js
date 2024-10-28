  const EmployeeAPI = {
    employees: [
    { id: 1, name: "John Doe", job: "Developer", email: "tyt123@mail.ru" },
    { id: 2, name: "Jane Smith", job: "Designer", email: "bobi37@gmail.com" }
  ],
  

  all: function () {
    return this.employees;
  },
  get: function (id) {
    const isEmployee = (p) => p.id === id;
    return this.employees.find(isEmployee);
  },
  delete: function (id) {
    const isNotDelEmployee = (p) => p.id !== id;
    this.employees = this.employees.filter(isNotDelEmployee);
    return true;
  },
  add: function (employee) {
    if (!employee.id)
      employee = {
        ...employee,
        id:
          this.employees.reduce((prev, current) => {
            return prev.id > current.id ? prev : current;
          }, 0).id + 1,
      };
    this.employees = [...this.employees, employee];
    return employee;
  },
  update: function (employee) {
    this.get();
    this.employees.shift(employee);
    return employee;
  },
};
  
  export default EmployeeAPI;
  