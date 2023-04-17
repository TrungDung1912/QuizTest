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
    render() {
        const myInfo = ['1', '2', '3']
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor name={"Linh"} age={"30"} />
                <hr />
                <DisplayInfor name={"Linh"} age={26} myInfo={myInfo} />
            </div>
        )
    }
}

export default MyComponent