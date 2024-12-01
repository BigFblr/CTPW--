const API_BASE_URL = 'http://localhost:8088';

export const signIn = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username , password }),
        });

        if (!response.ok) {
            throw new Error('Ошибка аутентификации');
        }

        const data = await response.json();
        return data.token;  
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fetchEmployees = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch employees: ' + response.statusText);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const addEmployee = async (token, employee) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employees/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(employee),
        });
        if (!response.ok) {
            throw new Error('Failed to add employee: ' + response.statusText);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (token, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employees/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete employee: ' + response.statusText);
        }
        return true;  
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};