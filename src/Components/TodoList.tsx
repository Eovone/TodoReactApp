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
     <Layout className='layout bg-gray-700'>
            <Content className='p-4'>
                <div className='todolist'>
                    <Row className='mb-4'>
                        <Col span={24} className="md:col-span-12 lg:col-span-8 xl:col-span-6 mx-auto">
                            <TodosForm onFormSubmit={handleFormSubmit} />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col span={24} className="md:col-span-12 lg:col-span-8 xl:col-span-6 mx-auto">
                            <TodoItems listOfTodos={allTodos} />
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;