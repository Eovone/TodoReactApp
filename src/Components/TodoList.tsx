import React, { FC } from 'react';
import {Col, Layout, message, Row } from 'antd';
import TodosForm from './TodosForm';
import { deleteTodo, getTodos, postTodo, updateTodo } from '../Services/TodoService';
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
        }
      });    
    const removeTodo = useMutation((todoId: number) => deleteTodo(todoId),{
        onSuccess: () => {
            refetch();
            message.success('Your Todo has been removed!');
        }
      });
    const editTodo = useMutation((todo: Todo) => updateTodo(todo), {
        onSuccess: () => {
            refetch();
            message.success('Your Todo has been updated!');
        }
    });

    const handleUpdateTodo = async (todo: Todo) => {
        await editTodo.mutateAsync(todo);
    }

    const handleDeleteTodo = async (todo: Todo) => {
        if (todo.id == null) return;
        await removeTodo.mutateAsync(todo.id);
    }

    const handleFormSubmit = async (todo: Todo) => {
        await addTodo.mutateAsync(todo);
    };

if (isLoading){    
    return (
        <Layout className="layout bg-gray-700 flex flex-col justify-center items-center h-screen">
            <p className="text-white text-5xl mb-4">Loading...</p>
            <div className="spinner">
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
            </div>
        </Layout>
    )
}
if (isError){
    return (
        <Layout className='layout bg-gray-700  flex flex-col justify-center items-center h-screen'>
            <div className="text-white text-5xl mb-4">Error...</div>
        </Layout>
    )
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
                            <TodoItems listOfTodos={allTodos} 
                                       handleDelete={handleDeleteTodo}
                                       handleUpdate={handleUpdateTodo}/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;