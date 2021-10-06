import { Avatar, Button, Col, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';
import { addDocument } from '../../firebase/services';

const Userinfor = ({ user, handleLogout }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        })

    }, []);

    const handleAddRoom = () => {
        setVisible(true)
    }

    const [form] = Form.useForm();


    const handleOk = () => {
        const data = form.getFieldValue();
        // console.log({ ...data, members: [user.userID] })
        addDocument("rooms", { ...data, members: [user.userID] })
        setVisible(false)

        form.resetFields()
    }
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }
    return (
        <>
            <Col span={11}>
                <div className="username">
                    <Avatar size="small">{user.username.substring(0, 1).toUpperCase()}</Avatar>
                    <h1>
                        {user.username}
                    </h1>
                </div>
            </Col>
            <Col span={6}>
                <Button type="primary" onClick={handleLogout} ghost>
                    Đăng xuất
                </Button>
            </Col>
            <Col span={6}>
                <Button type="primary" ghost onClick={handleAddRoom}>Thêm phòng</Button>
            </Col>
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
                    <Form.Item label="Tên phòng" name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tiêu đề",
                            },

                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description" rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tiêu đề",
                        },

                    ]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password" rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tiêu đề",
                        },

                    ]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Userinfor;
