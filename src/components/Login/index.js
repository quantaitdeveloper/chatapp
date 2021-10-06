import { Input , Form, Button, Modal, Spin  } from 'antd';
import React, { useContext, useState } from 'react';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'
import firebase, { auth, db } from '../../firebase/config';
import axios  from 'axios';
import { Loading, showMessageError, showMessageInfo } from '../../helper/function';
import { Redirect } from 'react-router';
import { addDocument } from '../../firebase/services';
import { AppContext } from '../../context/AppProvider';

const fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = (props) => {
    const { history } = props;
    const onFinishFailed = (errorInfo) => { };
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleFacebookLogin = () => {
        auth.signInWithPopup(fbProvider);
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        const result = await axios.get("https://607e8b3402a23c0017e8b875.mockapi.io/users")
        if (result) {
            const listUser = result.data;
            const author = listUser.find((item) => {
                return item.username === values.username && item.password === values.password
            })
            
            if (author) {
                localStorage.setItem("user", JSON.stringify(author))
                setUser(author)
                history.push("/chat-room", { user: author })
            } else {
                showMessageError("Tài khoản không đúng")
            }
        }
        setIsLoading(false);
    }

    console.log(isLoading)

    return (
        localStorage.getItem("user") ? <Redirect to={{
            pathname: "/chat-room",
            state: { user: user }
        }} />
            : (
                <>
                    <div className="example">
                        <Spin spinning={ isLoading}/>
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
                        </Form.Item>
                        <Form.Item>
                            <Button

                                className="gx-mb-0"
                                htmlType="submit"
                                onClick = {handleFacebookLogin}
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
                    </>
            )
    );
}

export default Login;

