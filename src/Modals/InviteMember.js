import { Modal ,Form, Input, Select, Avatar } from 'antd';
import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../context/AppProvider';
import { db } from '../firebase/config';
import { addDocument } from '../firebase/services';

const InviteMember = () => {
    
    const {user ,selectedRoomID ,inviteModalVisible, setInviteModalVisible , selectedRoom} = useContext(AppContext)

    const [form] = Form.useForm();

    const [members, setMembers] = useState([]);
    const [listUser, setListUser] = useState([]);
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
        if (selectedRoom) {
            setMembers(selectedRoom.members)
        }
    }, [selectedRoom]);

    const handleOk = () => {
        const data = form.getFieldValue();

        const roomRef = db.collection("rooms").doc(selectedRoomID);

        const newMember = [...selectedRoom.members];

        newMember.push(data.userID)
       
        roomRef.update({
            members: [...newMember]
        })
        setInviteModalVisible(false)
        form.resetFields()
    }
    const handleCancel = () => {
        setInviteModalVisible(false)
        form.resetFields()
    }

    const renderSelect = () => {
        const arrtmp = [];
        for (let i = 0; i < listUser.length; i++) {
            for (let j = 0; j < members.length; j++) {
                if (listUser[i].userID === members[j]) {
                    arrtmp.push(listUser[i])
                }   
            }       
        }
        

        const newArr = _.difference(listUser, arrtmp);
        
        if (newArr) {
            return newArr.map((item) => {
                return <Select.Option value={item.userID}>
                    {item.username}
                </Select.Option>
            })
        }

    }
    return (
        <>
            <Modal
                
                title="Mời thêm thành viên"
                visible={inviteModalVisible}
                onOk={
                    handleOk
                }
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    form={form}
                >
                    <Form.Item label="Tên phòng" name="userID">
                        <Select placeholder="Chọn thành viên">
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default InviteMember;
