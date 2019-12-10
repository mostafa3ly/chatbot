import React from 'react';

const Message = (props) => (
    <div>
        <div className={`message ${props.sender}`}>
            {props.content}
        </div>
    </div>
);


export default Message;