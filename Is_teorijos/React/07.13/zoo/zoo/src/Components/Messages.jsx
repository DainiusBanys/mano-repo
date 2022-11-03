import { useContext } from "react";
import DataContext from "./DataContext";

function Messages() {

    const { messages } = useContext(DataContext);

    if (messages.count === 0) {
        return null;
    }

    return (
        <div className="messages-bin">
            {
                messages.map(m => (<div key={m.id} className={'alert alert-' + m.type} role="alert">
                    {m.text}
                </div>))
            }
        </div>
    )
}

export default Messages;