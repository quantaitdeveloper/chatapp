import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { FunctionComponent } from "react";
import { Spin } from "antd";

export const showMessageError = (msg , onOK) => {
    Modal.error({
        content: msg,
        onOk: onOK || null,
    });
};

export const showMessageSuccess = (msg , onOK) => {
    Modal.success({
        content: msg,
        onOk: onOK || null,
    });
};

export const showMessageInfo = (msg) => {
    message.info(msg);
};

export const GetListUser = (collection) => {
    const [listData, setListData] = useState([]);
    useEffect(() => {
        db.collection(collection).onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id : doc.id
                }
            })
            setListData([...data])
        })

    }, []);
    return listData
}



export const Loading = (props) => {
    if (props.isLoading === false) {
        return null;
    }

    return (
        <div className="loading">
            <Spin tip="Loading..." size="large" className="spinner" />
        </div>
    );
};

