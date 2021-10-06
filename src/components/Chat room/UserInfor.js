import { Avatar, Button, Col } from 'antd';
import React, { useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';

const Userinfor = ({ user, handleLogout }) => {
    const {setVisible} = useContext(AppContext)
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id : doc.id
                }
            })
        })

    }, []);

    const handleAddRoom = () => {
        setVisible(true)
    }
    return (
        <>
            <Col span={11}>
                    <div className="username">
                    <Avatar size="small">{ user.username.substring(0,1).toUpperCase()}</Avatar>
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

            </>
    );
}

export default Userinfor;
