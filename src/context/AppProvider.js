import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useFireStore } from '../hooks/useFirestore';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [inviteModalVisible, setInviteModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [selectedRoomID, setSelectedRoomID] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    let userID;
    if (user) {
        userID = user.userID
    } else {
        userID = ""
    }

    let roomCondition = useMemo(() => {
        return {
            fieldValue: "members",
            operator: "array-contains",
            compareValue: userID
        }
    }, [])


    const rooms = useFireStore("rooms", roomCondition);


    const selectedRoom = rooms.find((room) => {
        return room.id === selectedRoomID
    })

    // const members = useFireStore("users", {
    //     fieldValue: "id",
    //     operator: "in",
    //     compareValue : selectedRoom.members
    // })

    // console.log("members" , members)

    return (
        <AppContext.Provider value={{ user, registerModalVisible, setRegisterModalVisible, inviteModalVisible, setInviteModalVisible, rooms, visible, setVisible, selectedRoomID, setSelectedRoomID, selectedRoom }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
