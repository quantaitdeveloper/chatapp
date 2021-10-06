
import { Avatar, Spin, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

const formatDate = (seconds) => {
    let formattedDate = "";

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        // eslint-disable-next-line no-unused-expressions
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    }
    return formattedDate
}

const Message = (props) => {
    const { user } = useContext(AppContext);

    return props.userID === user.userID ?
        <>
            <div className="wrapper_style" style={{ background: "#e5e5e5" }} >
                <p style={{ textAlign: "left" }}>
                    <div>
                        <Avatar size="small" src={props.photoUrl}>{props.displayName.charAt(0).toUpperCase()}</Avatar>
                        <Typography.Text className="author">{props.displayName}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className="content">{props.text}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className="date">{formatDate(props.createAt)}</Typography.Text>
                    </div>
                </p>
            </div>
        </> : <>
            <div className="wrapper_style">
                <p style={{ textAlign: "left" }}>
                    <div>
                        <Avatar size="small" src={props.photoUrl}>{props.displayName.charAt(0).toUpperCase()}</Avatar>
                        <Typography.Text className="author">{props.displayName}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className="content">{props.text}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className="date">{formatDate(props.createAt)}</Typography.Text>
                    </div>
                </p>
            </div>
        </>

}

export default Message;
