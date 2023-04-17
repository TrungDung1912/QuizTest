//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class they use
// onClick / onChange / onSubmit / onMouseOver
import React from "react";
import UserInfor from "./UserInfor";

class MyComponent extends React.Component {
    //JSX
    render() {
        return (
            <div>
                <UserInfor />
            </div>
        )
    }
}

export default MyComponent