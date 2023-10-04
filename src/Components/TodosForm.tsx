import { Button, Col, Form, Input, Row, Switch, DatePicker } from 'antd';
import { FC, useState } from 'react';
import { Todo } from '../Models/Todo';
import { convertToDateTime } from '../Services/TodoCalculations';
import '../Styles/DatePickerCustom.scss';


interface TodosFormProps{
    onFormSubmit: (todo: Todo) => void;
}

const TodosForm: FC<TodosFormProps> = (props) => {
    const [form] = Form.useForm();
    const [completed, setCompleted] = useState<boolean>(false);
    const [deadline, setDeadline] = useState<string>('');

    const handleSubmit = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),            
            completed: completed,
            description: form.getFieldValue('description'),
            deadline: deadline,
        };             
        props.onFormSubmit(todo);
        form.resetFields();
        form.setFieldsValue({ deadline: '' });
        setDeadline('');      
    }  

    const onDatePickerOk = (value: any) => {
        const date = new Date(value);
        let formattedDate = convertToDateTime(date);
        setDeadline(formattedDate);
    };    

    return(
        <div className="bg-gray-500 p-4 rounded shadow-lg text-white">
            <Form form={form}
                  onFinish={handleSubmit}
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
                        
                        <p className='text-white mb-1'>Deadline</p>
                        <Form.Item name='deadline' rules={[{ required: true, message: 'Please Enter the Deadline' }]}>
                            <DatePicker name='deadline'
                                        showTime
                                        format="YYYY-MM-DD HH:mm"
                                        onOk={onDatePickerOk}
                                        className='ant-picker-panel'              
                                        />
                        </Form.Item>

                        <p className="text-white">Is this Todo already done?</p>
                        <Form.Item name="completed"
                                   valuePropName="checked">
                            <div className='flex justify-center items-center'>
                                <p className='p-1 text-red-400'>No</p>
                                <Switch className='p-1 bg-black'
                                        checked={completed}
                                        onChange={(value) => setCompleted(value)}/>
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