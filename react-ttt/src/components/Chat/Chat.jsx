import React from 'react';

export const Chat = () => {
    return(
        <section id = "chat-main-container">
            <div id = "chat-container">
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autoComplete="off" /><button>Send</button>
            </form>
            </div>
        </section>
    )
} 