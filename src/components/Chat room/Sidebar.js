import { Avatar, Button, Col, Row, Typography } from 'antd';
import React from 'react';
import Listroom from './ListRoom';
import { useHistory } from 'react-router';
import Userinfor from './UserInfor';

const Sidebar = (props) => {

    const user = JSON.parse(localStorage.getItem("user"))

    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location.replace(`/login`);
    }
    return (
        <>
            <Row>
                <Userinfor user={user} handleLogout={ handleLogout}/>
            </Row>

            <Row>
                <Col span={24} className="Listroom">
                    <Listroom />
                </Col>               
            </Row>

        </>
    );
}

export default Sidebar;
