import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { showMessageError } from '../../helper/function';
import Chatwindow from './Chatwindow';
import Sidebar from './Sidebar';
import AppProvider from '../../context/AppProvider';

const ChatRoom = (props) => {
    const [state, setState] = useState(0);

    useEffect(() => {
        handleReload();
    }, []);

    const handleReload = () => {
        setState(1)
    }

    return (
        <AppProvider>
            <Row>
                <Col span={6} className="sidebar">
                    <Sidebar />
                </Col>
                <Col span={18} className="chatwindow">
                    <Chatwindow />
                </Col>
            </Row>
        </AppProvider>
    );
}

export default ChatRoom;
