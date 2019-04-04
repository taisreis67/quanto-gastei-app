import React from 'react';

const Message = (props) => {
    const {
        textMessage,
        classMessage,
    } = props;

    return (
        <div className="row">
            <div className="col">
                <div className={`alert alert-${classMessage}`} role="alert">
                    {textMessage}
                </div>
            </div>
        </div>
    );
}

export default Message;