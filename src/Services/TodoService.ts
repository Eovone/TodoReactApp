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

 export const calculateRemainingTime = (nowDate: string, deadlineDate: string): { years: number, months: number, days: number, hours: number, minutes: number, seconds: number } =>
  {
    const now = new Date(nowDate);
    const deadline = new Date(deadlineDate);  
  
    const timeDifference = deadline.getTime() - now.getTime();
  
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor((timeDifference % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    const days = Math.floor((timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  
    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }