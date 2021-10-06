import { Input, Form, Button, Modal, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'
import firebase, { auth, db } from '../../firebase/config';
import axios from 'axios';
import { showMessageError, showMessageSuccess, } from '../../helper/function';
import { Redirect } from 'react-router';
import { AppContext } from '../../context/AppProvider';
import { URL, URL_CONFIG } from '../../constant';
import _ from 'lodash';
import { addDocument } from '../../firebase/services';
import { v4 } from 'uuid';

const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = (props) => {
    const { history } = props;
    const onFinishFailed = (errorInfo) => { };
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleFacebookLogin = () => {
        auth.signInWithPopup(fbProvider);
    }

    const [form] = Form.useForm();
    const [listUser, setListUser] = useState([]);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setListUser(data)
        })
    }, []);

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

    const onFinish = async (values) => {

        setIsLoading(true);

        const result = await axios.get(URL_CONFIG)
        if (result) {
            const listUser = result.data;
            const author = listUser.find((item) => {
                return item.username === values.username && item.password === values.password
            })

            if (author) {
                console.log("listuser", listUser)
                const contains = _.find(listUser, { username: author.username });

                if (!contains) {
                    addDocument("users", author)
                }
                localStorage.setItem("user", JSON.stringify(author))
                setUser(author)
                history.push("/chat", { user: author })
            } else {
                showMessageError("Tài khoản không đúng")
            }
        }
        setIsLoading(false);
    }

    const handleRegister = () => {
        setRegisterModalVisible(true)
    }


    return (
        localStorage.getItem("user") ? <Redirect to={{
            pathname: "/chat",
            state: { user: user }
        }} />
            : (
                <>
                    <div className="example">
                        <Spin spinning={isLoading} />
                    </div>,
                    <div className="gx-app-login-wrap">
                        <div className="gx-app-login-container">
                            <div className="gx-app-login-main-content">
                                <div className="gx-app-logo-content">
                                    <div className="gx-app-logo-content-bg">
                                        <img src="" alt="Neature" />
                                    </div>
                                    <div className="gx-app-logo-wid"></div>
                                    <div className="gx-app-logo">
                                        {/* <img src={Images.logo_white} alt="Logo" /> */}
                                    </div>
                                </div>
                                <div className="gx-app-login-content">
                                    <Form
                                        initialValues={{ remember: true }}
                                        name="basic"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        className="gx-signin-form gx-form-row0"
                                    >
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập đúng email!",
                                                },
                                            ]}
                                            name="username"
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập password",
                                                },
                                            ]}
                                            name="password"
                                        >
                                            <Input type="password" placeholder="Password" />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                className="gx-mb-0"
                                                htmlType="submit"
                                            >
                                                Đăng nhập
                                            </Button>

                                            <Button
                                                type="primary"
                                                className="gx-mb-0"
                                                onClick={handleRegister}
                                            >
                                                Đăng ký
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button

                                                className="gx-mb-0"
                                                htmlType="submit"
                                                onClick={handleFacebookLogin}
                                            >
                                                <FacebookOutlined />
                                            </Button>
                                            <Button
                                                className="gx-mb-0"
                                                htmlType="submit"
                                            >
                                                <GoogleOutlined />
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
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
            )
    );
}

export default Login;

