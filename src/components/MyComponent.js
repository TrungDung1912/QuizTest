//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class they use
// onClick / onChange / onSubmit / onMouseOver
import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    //JSX
    //DRY: Don't repeat yourself
    state = {
        listUsers: [
            { id: 1, name: 'Linh', age: 15 },
            { id: 2, name: 'Dung', age: 50 },
            { id: 3, name: 'Phanh', age: 20 },
        ]
    }
    render() {
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        )
    }
}

export default MyComponent