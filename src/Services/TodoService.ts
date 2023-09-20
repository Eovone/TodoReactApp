import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`


export const postTodo = (todo: { title: string; completed: boolean; description: string;}) => {   
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed,
        description: todo.description
    }).then(response => response.data);
}

export const getTodos = (limit: number) => {
    return axios.get(`${baseUrl}/GetAllTodos?limit=${limit}`)
      .then(response => response.data);
}