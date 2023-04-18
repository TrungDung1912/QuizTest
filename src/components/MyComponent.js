//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class they use
// onClick / onChange / onSubmit / onMouseOver
import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    //JSX
    //DRY: Don't repeat yourself
    constructor(props) {
        super(props);
        this.state = {
            listUsers: [
                { id: 1, name: 'Linh', age: 15, },
                { id: 2, name: 'Dung', age: 50, },
                { id: 3, name: 'Phanh', age: 20, },
            ]
        }
    }

    handleAddNewUser = (obj) => {
        this.setState({
            listUsers: [obj, ...this.state.listUsers],
        })
        console.log(obj)
    }

    handleDeleteUser = (userID) => {
        let listUser = this.state.listUsers
        listUser = listUser.filter(user => user.id !== userID)
        this.setState({
            listUsers: listUser
        })
    }

    handleFindUser = (userName) => {
        let listUser = this.state.listUsers
        listUser = listUser.filter(user => user.name === userName)
        this.setState({
            listUsers: listUser,
        })
    }

    //<></>: React.Fragment
    render() {
        // const test = { name: 'Linh', age: 18 }
        return (
            <>
                {/* {console.log(test)} */}
                {/* {JSON.stringify(test)} */}
                <div className="a">
                    <AddUserInfor
                        handleAddNewUser={this.handleAddNewUser}
                    />
                    <br /><br />
                    <DisplayInfor
                        listUsers={this.state.listUsers}
                        handleDeleteUser={this.handleDeleteUser}
                        handleFindUser={this.handleFindUser}
                    />
                </div>
                <div className="b">

                </div>
            </>
        )
    }
}

export default MyComponent