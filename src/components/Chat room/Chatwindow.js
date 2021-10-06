import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip , Form, Input, Row, Col, message } from 'antd';
import _ from 'lodash';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from "styled-components"
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';
import { addDocument } from '../../firebase/services';
import { useFireStore } from '../../hooks/useFirestore';
import Message from './Message';

const ContentStyled = styled.div``;

    
const Chatwindow = () => {
    const { selectedRoom, setInviteModalVisible } = useContext(AppContext);
    const { user } = useContext(AppContext);
    const [members, setMembers] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id : doc.id
                }
            })
            setListUser(data)
        })

        db.collection("messages").onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id : doc.id
                }
            })
            setMessages(data)
        })
        if (selectedRoom) {
            setMembers(selectedRoom.members)
        }
    }, [selectedRoom]);

    const renderListUser = () => {
        const arrtmp = [];
        for (let i = 0; i < listUser.length; i++) {
            for (let j = 0; j < members.length; j++) {
                if (listUser[i].userID === members[j]) {
                    arrtmp.push(listUser[i])
                }   
            }       
        }
        if (arrtmp) {
            return arrtmp.map((item , index) => {
                return <Tooltip title={item.username} key={index}>
                    <Avatar>{item.username.substring(0,1).toUpperCase()}</Avatar>
                    </Tooltip>
            })
        }
    }

    const handleChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument("messages", {
            text: inputValue,
            userID : user.userID,
            roomID: selectedRoom.id,
            username: user.username
        })

        form.resetFields();
    }


    const renderMessage = () => {
        if (selectedRoom) {
            const listMessages = messages.filter((message) => {
                return message.roomID === selectedRoom.id
            })

            const newList = _.orderBy(listMessages, "createAt.seconds" , "asc")
            return newList.map((item) => {
              
                if (item.createAt) {
                    return <Message userID={item.userID} text={item.text} createAt={item.createAt.seconds } displayName={item.username} photoUrl={null} />
                } else {
                    return <Message text={item.text} createAt="" displayName={item.username} photoUrl={null} /> 
                }
            })
        }
        return null
    }

    if (selectedRoom) {
        return (
            <div className="wrapper_content">
                <div className="header">
                    <div className="header__infor">
                        <p className="header__title">{selectedRoom.name}</p>
                        <span className="header__description">{selectedRoom.description}</span>
                    </div>
                    <div>
                        
                        <Avatar.Group size="small" maxCount={2}>
                                {renderListUser()}
                            
                        </Avatar.Group>
                        <Button icon={<UserAddOutlined />} onClick={()=> setInviteModalVisible(true)}>Mời</Button>
                    </div>
                </div>
                <div className="message_content">
                    <div className="list_message">
                       {renderMessage()}
        
                    </div>
                    <Form form={form}>
                        <Row>
                            <Col span={22}>
                                <Form.Item name="message">
                                    <Input placeholder="Nhập tin nhắn" autoComplete="off" onChange={handleChangeInput} onPressEnter={ handleOnSubmit} />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Button onClick={handleOnSubmit}>Gửi</Button>
                            </Col>
         
                        </Row>
                    </Form>
                </div>
            </div>
        );
     
    }
    return null;
}

export default Chatwindow;
