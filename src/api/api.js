import axios from 'axios';

const API_BASE_URL = 'http://localhost:8088';

export const signIn = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/sign_in`, {
            username,
            password,
        });

        return response.data.token;  
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка аутентификации');
    }
};

// export const signUp = async (username, password, email) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/users/sign_up`, {
//             username,
//             password,
//         });

//         return response.data; 
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Ошибка регистрации'); 
//     }
// };

export const fetchEmployees = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employees`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch employees');
    }
};

export const addEmployee = async (token, employee) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/employees/create`, employee, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error adding employee:', error);
        throw new Error(error.response?.data?.message || 'Failed to add employee');
    }
};

export const deleteEmployee = async (token, id) => {
    try {
        await axios.delete(`${API_BASE_URL}/employees/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return true;  
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete employee');
    }
};