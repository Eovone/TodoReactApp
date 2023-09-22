import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`


export const postTodo = async (todo: { title: string; completed: boolean; description: string;}) => {   
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed,
        description: todo.description
    }).then(response => response.data);
}

export const getTodos = async () => {
    return axios.get(baseUrl)
      .then(response => response.data);
}

export const deleteTodo = async (todoId: number) => {
    return axios.delete(`${baseUrl}/${todoId}`)
        .then(response => response.status)
}

export const updateTodo = async (todo: { id?: number, title: string; completed: boolean; description: string;}) => {
    return axios.put(baseUrl, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        description: todo.description
    }).then(response => response.data);
}