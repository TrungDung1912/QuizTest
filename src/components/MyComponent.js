//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class they use
import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "BumBeo",
        address: "Hanoi",
        age: 20
    }

    handleClick = (event) => {
        // console.log("Click me")
        // console.log(e)
        this.setState({
            name: "BumLinhCute",
            age: Math.floor(Math.random() * 100) + 1
        })
    }

    handleOnMouseOver = (e) => {
        // console.log("Mouse Over")
        // console.log(e)
    }

    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <button onMouseOver={this.handleOnMouseOver}>Hover me!!</button>
                <button onClick={(event) => { this.handleClick(event) }}>Click me!!</button>
            </div>
        )
    }
}

export default MyComponent