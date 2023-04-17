//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class
import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "Eric",
        address: "Hanoi",
        age: 20
    }

    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
            </div>
        )
    }
}

export default MyComponent