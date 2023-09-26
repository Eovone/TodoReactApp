import { Button, Col, Form, Input, Row, Switch } from 'antd';
import { FC } from 'react';
import { Todo } from '../Models/Todo';

interface TodosFormProps{
    onFormSubmit: (todo: Todo) => void;
}

const TodosForm: FC<TodosFormProps> = (props) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),            
            completed: form.getFieldValue('completed'),
            description: form.getFieldValue('description'),
        };             
        props.onFormSubmit(todo);
        form.resetFields();        
    }    

    return(
        <div className="bg-gray-500 p-4 rounded shadow-lg text-white">
            <Form form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  className="todo-form">
                <Row gutter={20}>

                    <Col className='w-full'>
                        <Form.Item name="title"
                                   rules={[{ required: true, message: 'Please enter a Title' }]}>
                        <Input placeholder="Title of your Todo" 
                               className="text-gray-500" />
                        </Form.Item>
                    </Col>
  
                    <Col className='w-full'>
                        <Form.Item name="description"
                                   rules={[{ required: true, message: 'Please Enter what you need to do' }]}>
                        <Input placeholder="What do you need to do?"
                               className="text-gray-500" />
                        </Form.Item>
                        <p className="text-white">Is this Todo already done?</p>
                        <Form.Item name="completed"
                                   valuePropName="checked"
                                   initialValue={false}>
                                    <div className='flex justify-center items-center'>
                                        <p className='p-1 text-red-400'>No</p>
                                        <Switch className='p-1 bg-black'/>
                                        <p className='p-1 text-green-400'>Yes</p>
                                    </div>
                        </Form.Item>
                    </Col>
  
                    <Col className='w-full'>
                        <Button className="bg-gray-600 hover:bg-gray-700"
                                type="primary"
                                htmlType="submit"
                                block>
                                Add Todo
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
  };

export default TodosForm;