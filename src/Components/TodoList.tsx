import { FC, useEffect, useState } from 'react';
import {Col, Layout, message, Row } from 'antd';
import TodosForm from './TodosForm';
import { deleteTodo, getTodos, postTodo, updateTodo } from '../Services/TodoService';
import { Todo } from '../Models/Todo';
import TodoItems from './TodoItems';
import { useQuery, useMutation } from '@tanstack/react-query';
import FilterBar from './FilterBar';

const { Content } = Layout;

const TodoList: FC = () => {  
    const [filter, setFilter] = useState<string>("all");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [disableNextPage, setDisableNextPage] = useState<boolean>(false);

    const { data: allTodos, isLoading, isError, isPreviousData, refetch } = 
    useQuery(['todos', pageNumber, filter], () => getTodos(pageNumber, 3, filter),
    {
        onSuccess: (data) => {
            if (data.length < 3){
                setDisableNextPage(true);
            }
            else {
                setDisableNextPage(false);
            }
        }
    });  

    useEffect(() => {
      setPageNumber(1);
    }, [filter]);    
   
    const addTodo = useMutation((todo: Todo) => postTodo(todo), {
        onSuccess: () => {
          refetch();
          message.success('Your Todo has been added!');
        },
        onError: () => {
            message.error('Your Todo Failed to be added!')
        }
      });    
    const removeTodo = useMutation((todoId: number) => deleteTodo(todoId),{
        onSuccess: () => {
            refetch();
            message.success('Your Todo has been removed!');
        },
        onError: () => {
            message.error('Your Todo Failed to be removed!')
        }
      });
    const editTodo = useMutation((todo: Todo) => updateTodo(todo), {
        onSuccess: () => {
            refetch();
            message.success('Your Todo has been updated!');
        },
        onError: () => {
            message.error('Your Todo Failed to be updated!')
        }
    });

    const handleUpdateTodo = async (todo: Todo) => {
        await editTodo.mutateAsync(todo);
    };
    const handleDeleteTodo = async (todo: Todo) => {
        if (todo.id == null) return;
        await removeTodo.mutateAsync(todo.id);
    };
    const handleAddTodo = async (todo: Todo) => {
        await addTodo.mutateAsync(todo);
    };

if (isLoading || isPreviousData){    
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
                        <Col className="md:col-span-12 lg:col-span-8 xl:col-span-6 mx-auto">
                            <TodosForm onFormSubmit={handleAddTodo} />
                        </Col>
                    </Row>  

                    <FilterBar filterState={filter} 
                               setFilterState={setFilter}/>
                   
                    <Row className='mb-4 flex justify-center'>
                        <TodoItems listOfTodos={allTodos} 
                                   handleDelete={handleDeleteTodo}
                                   handleUpdate={handleUpdateTodo}/>                     
                    </Row>

                    <Row className='flex justify-center'>
                        <div className='w-3/5 space-x-4'>

                            <button onClick={() => setPageNumber(pageNumber -1)}
                                    disabled={pageNumber == 1}
                                    hidden={pageNumber == 1}
                                    className='w-1/5 px-4 py-2 text-white bg-gray-500 transition-transform transform hover:scale-105 focus:outline-none rounded-md'
                                    >{pageNumber-1}</button>

                            <button className='border-2 border-yellow-400 w-1/5 px-4 py-2 text-white bg-gray-500 transition-transform transform hover:scale-105 focus:outline-none rounded-md '
                                    disabled={true}
                                    >{pageNumber}</button>

                            <button onClick={() => setPageNumber(pageNumber +1)}
                                    className='w-1/5 px-4 py-2 text-white bg-gray-500 transition-transform transform hover:scale-105 focus:outline-none rounded-md'
                                    disabled={disableNextPage}
                                    >{pageNumber+1}</button>

                        </div>                        
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;