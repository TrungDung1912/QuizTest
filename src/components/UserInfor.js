import React from "react";

class UserInfor extends React.Component {
    state = {
        name: "BumBeo",
        address: "Hanoi",
        age: 20
    }

    handleOnChangeInput = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleOnChangeAge = (e) => {
        //bad code: this.state.age = e.target.value
        this.setState({
            age: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <label>Your name: </label>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)} />
                    <br />
                    <label>Your age: </label>
                    <input
                        value={this.state.age}
                        type="text"
                        onChange={(event) => this.handleOnChangeAge(event)} />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor