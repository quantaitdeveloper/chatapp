import { Button, Collapse } from 'antd';
import React, { useMemo , useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';
import { useFireStore } from '../../hooks/useFirestore';

const { Panel } = Collapse;

const Listroom = () => {
    

    const { rooms, setSelectedRoomID } = useContext(AppContext)
    
    const handleSelectRoom = (id) => {
        setSelectedRoomID(id)
    }

    const renderRooms = () => {
        return rooms.map((room , index) => {
            return <NavLink
                key={index}
                to ="/chat-room"
                activeClassName="selected"
                onClick={() => handleSelectRoom (room.id)}
                    >
                <p >{ room.name}</p>
                </NavLink>
            
        })
    }

    return (
        <div>
            <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="Chat" key="1" showArrow={false}>
                    {renderRooms()}
                </Panel>
            </Collapse>
            
        </div>
    );
}

export default Listroom;
