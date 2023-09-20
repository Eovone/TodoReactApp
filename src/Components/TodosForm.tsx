import { Button, Col, Form, Input, Row, Switch } from 'antd';
import React, { FC, } from 'react';
import { Todo } from '../Models/Todo';
import { TodosFormsProps } from '../Models/TodosFormsProps';

const TodosForm: FC<TodosFormsProps> = (props) => {

    const [form] = Form.useForm();
    const { onFormSubmit } = props;

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),            
            completed: form.getFieldValue('completed'),
            description: form.getFieldValue('description'),
        };
        onFormSubmit(todo);
        form.resetFields();
    }

    return(
        <div>
            <Form 
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="todo-form">
                    <Row gutter={20}>

                        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                            <Form.Item name="title"
                                        rules={[{required: true, message: 'Please enter a Title'}]}>
                                <Input placeholder='Title of your Todo'/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                            <Form.Item name="description"
                                        rules={[{required: true, message: 'Please Enter what you need to do'}]}>
                                <Input placeholder='What do you need to do?'/>
                            </Form.Item>
                            <p>Is this Todo already done?</p>
                            <Form.Item name="completed" 
                                       valuePropName="checked" 
                                       initialValue={false}
                                       >
                                <Switch className=''/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                            <Button className='bg-gray-600' type='primary' htmlType='submit' block>
                                Add Todo
                            </Button>
                        </Col>

                    </Row>
            </Form>
        </div>
    )
}

export default TodosForm;