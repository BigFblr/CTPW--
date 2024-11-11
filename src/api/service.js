const EmployeeAPI = {
  employees: [
    { id: 0, name: "John Doe", job: "Developer", email: "tyt123@mail.ru" },
    { id: 1, name: "Jane Smith", job: "Designer", email: "bobi37@gmail.com" }
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
    // Проверка на существующий id
    if (employee.id !== undefined && this.employees.some(e => e.id === employee.id)) {
      throw new Error(`Employee with id ${employee.id} already exists.`);
    }

    // Генерация нового id, если не передан
    if (employee.id === undefined) {
      employee.id = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 0;
    }

    this.employees = [...this.employees, employee];
    return employee;
  },

  update: function (employee) {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee; // Обновляем существующего сотрудника
    }
    return employee;
  },
};

export default EmployeeAPI;