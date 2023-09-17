import React, { FC, useCallback, useEffect, useState } from 'react';
import {Col, Layout, message, Row, Tabs } from 'antd';
import TodosForm from './TodosForm';
import { postTodo } from '../Services/TodoService';
import { Todo } from '../Models/Todo';

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList: FC = () => {
    const [refreshing, setRefreshing] = useState(false);

    const handleFormSubmit = async (todo : Todo) => {
        await postTodo(todo);
        onRefresh();
        message.success('Your Todo has been added!');
    }

    const onRefresh = useCallback( async () => {
        setRefreshing(true);

        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {

    }, [onRefresh])

return(
    <Layout className='layout'>
        <Content className='p-4'>
            <div className='todolist'>
                <Row>
                    <Col span={15} offset={5}>                        
                            <TodosForm onFormSubmit={handleFormSubmit} />
                        <br/>
                        <Tabs defaultActiveKey='all'>
                            <TabPane tab="All" key="all">

                            </TabPane>  
                            <TabPane tab="In Progress" key="active">

                            </TabPane>
                            <TabPane tab="Completed" key="complete">

                            </TabPane>                        
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
)
}

export default TodoList;