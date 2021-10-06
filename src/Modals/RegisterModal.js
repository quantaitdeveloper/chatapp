import { Modal, Form, Input } from 'antd';

import React, { useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../context/AppProvider';
import { addDocument } from '../firebase/services';
import { v4 } from 'uuid';
import axios from 'axios';
import { showMessageError, showMessageSuccess } from '../helper/function';
import { URL_CONFIG } from '../constant';


const RegisterModal = () => {

    const { registerModalVisible, setRegisterModalVisible } = useContext(AppContext)

    const [form] = Form.useForm();


    const handleOk = async () => {
        const data = { ...form.getFieldValue(), userID: v4() }

        const listUser = await axios.get(URL_CONFIG);

        const list = listUser.data;
        for (let index = 0; index < list.length; index++) {
            if (list[index].username === data.username) {
                showMessageError("Tài khoản đã tồn tại")
                return;
            }
        }

        const result = await axios.post(URL_CONFIG, data);

        if (result) {
            showMessageSuccess("Đăng ký thành công")
        }


        setRegisterModalVisible(false)

        form.resetFields()
    }
    const handleCancel = () => {
        setRegisterModalVisible(false)
        form.resetFields()
    }
    return (
        <>
            <Modal

                title="Đăng ký"
                visible={registerModalVisible}
                onOk={
                    handleOk
                }
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    form={form}
                >
                    <Form.Item label="Tên đăng nhập" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password">
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default RegisterModal;
