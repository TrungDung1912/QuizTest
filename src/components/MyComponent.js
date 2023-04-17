//class component
//function component

// . Present folder
// .. Parent folder
// 'this' is represent for class they use
// onClick / onChange / onSubmit / onMouseOver
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

    handleOnChangeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default MyComponent