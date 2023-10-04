import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todo`


export const postTodo = async (todo: { title: string; completed: boolean; description: string; deadline: string;}) => {   
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed,
        description: todo.description,
        deadline: todo.deadline,
    }).then(response => response.data);
}

export const getTodos = async (pageNumber:number, pageSize:number, filter:string) => {
    return axios.get(`${baseUrl}?page=${pageNumber}&pageSize=${pageSize}&filter=${filter}`)
      .then(response => response.data);
}

export const deleteTodo = async (todoId: number) => {
    return axios.delete(`${baseUrl}/${todoId}`)
        .then(response => response.status)
}

export const updateTodo = async (todo: { id?: number, title: string; completed: boolean; description: string; deadline: string;}) => {
    return axios.put(baseUrl, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        description: todo.description,
        deadline: todo.deadline,
    }).then(response => response.data);
}