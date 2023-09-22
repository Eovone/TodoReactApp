import React, { FC } from 'react';
import {Col, Layout, message, Row } from 'antd';
import TodosForm from './TodosForm';
import { deleteTodo, getTodos, postTodo } from '../Services/TodoService';
import { Todo } from '../Models/Todo';
import TodoItems from './TodoItems';
import { useQuery, useMutation } from '@tanstack/react-query';

const { Content } = Layout;

const TodoList: FC = () => {  
    const { data: allTodos, isLoading, isError, refetch } = useQuery(['todos'], () => getTodos());
    
    const addTodo = useMutation((todo: Todo) => postTodo(todo), {
        onSuccess: () => {
          refetch();
          message.success('Your Todo has been added!');
        },
      });
    
    const removeTodo = useMutation((todoId: number) => deleteTodo(todoId),{
        onSuccess: () => {
            refetch();
            message.success('Your Todo has been removed!');
        },
      });

    const handleDeleteTodo = async (todo: Todo) => {
        if (todo.id == null) return;
        await removeTodo.mutateAsync(todo.id);
    }

    const handleFormSubmit = async (todo: Todo) => {
        await addTodo.mutateAsync(todo);
    };

if (isLoading){
    return <div>Loading...</div>
}
if (isError){
    return <div>Error...</div>
}
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
                            <TodoItems listOfTodos={allTodos} handleDelete={handleDeleteTodo}/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;