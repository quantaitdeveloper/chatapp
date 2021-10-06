import { Button, Collapse } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../context/AppProvider';


const { Panel } = Collapse;

const Listroom = () => {


    const { rooms, setSelectedRoomID } = useContext(AppContext)

    const handleSelectRoom = (id) => {
        setSelectedRoomID(id)
    }

    const renderRooms = () => {
        const orderListRoom = _.orderBy(rooms, "createAt", "asc");
        return orderListRoom.map((room, index) => {
            return <NavLink
                key={index}
                to="/chat"
                activeClassName="selected"
                onClick={() => handleSelectRoom(room.id)}
            >
                <p >{room.name}</p>
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
