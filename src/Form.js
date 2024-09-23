import { useState } from "react";

function Form({ handleSubmit, inEmployee }) {
  const [employee, setEmployee] = useState(inEmployee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(employee);
    setEmployee(inEmployee);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="job">Job</label>
        <input
          type="text"
          id="job"
          name="job"
          value={employee.job}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default Form;
