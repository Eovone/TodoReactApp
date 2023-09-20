import React, { FC, useEffect, useState } from 'react';
import {Col, Layout, message, Row } from 'antd';
import TodosForm from './TodosForm';
import { getTodos, postTodo } from '../Services/TodoService';
import { Todo } from '../Models/Todo';
import TodoItems from './TodoItems';

const { Content } = Layout;

const TodoList: FC = () => {  
    const [allTodos, setAllTodos] = useState<Todo[]>([]);   

    const fetchTodos = async () => {    
        const response = await getTodos(0);
        setAllTodos(response);
    } 
    
    const updatePage = async () => await fetchTodos();   

    const handleFormSubmit = async (todo : Todo) => {
        await postTodo(todo);
        updatePage();
        message.success('Your Todo has been added!');
    }    

    useEffect(() => {          
        fetchTodos();
    }, [])
   
return(
    <Layout className='layout'>
        <Content className='p-4'>
            <div className='todolist'>
                <Row className='mb-2'>
                    <Col span={15} offset={5}>                        
                        <TodosForm onFormSubmit={handleFormSubmit} />                   
                    </Col>                    
                </Row>
                <Row className='flex justify-center'>
                    <TodoItems listOfTodos={allTodos} />
                </Row>
            </div>
        </Content>
    </Layout>
)
}

export default TodoList;