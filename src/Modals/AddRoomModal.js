import { Modal ,Form, Input } from 'antd';

import React, { useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../context/AppProvider';
import { addDocument } from '../firebase/services';

const AddRoomModal = () => {
    
    const {user , visible, setVisible} = useContext(AppContext)

    const [form] = Form.useForm();


    const handleOk = () => {
        const data = form.getFieldValue();

        addDocument("rooms" , {...data , members : [user.id]})
        setVisible(false)

        form.resetFields()
    }
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }
    return (
        <>
            <Modal
                
                title="Tạp phòng"
                visible={visible}
                onOk={
                    handleOk
                }
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    form={form}
                >
                    <Form.Item label="Tên phòng" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password">
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddRoomModal;
