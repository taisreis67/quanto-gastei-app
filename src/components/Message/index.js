import React from 'react';

const Message = (props) => {
    const {
        textMessage,
        classMessage,
    } = props;

    return (
        <div className="row">
            <div className="col">
                <div className={`alert alert-${classMessage} alert-dismissible fade show`} role="alert">
                    {textMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Message;