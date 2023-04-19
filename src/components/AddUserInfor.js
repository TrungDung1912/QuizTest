import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: "",
//         address: "Hanoi",
//         age: ""
//     }

//     handleOnChangeInput = (e) => {
//         this.setState({
//             name: e.target.value,
//         })
//     }

//     handleOnChangeAge = (e) => {
//         //bad code: this.state.age = e.target.value
//         this.setState({
//             age: e.target.value
//         })
//     }

//     handleOnSubmit = (e) => {
//         e.preventDefault()
//         console.log(this.state)
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         })
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I'm {this.state.age}
//                 <form onSubmit={(e) => this.handleOnSubmit(e)}>
//                     <label>Your name: </label>
//                     <input
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event) => this.handleOnChangeInput(event)} />
//                     <br />
//                     <label>Your age: </label>
//                     <input
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event) => this.handleOnChangeAge(event)} />
//                     <br />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('Hanoi');
    const [age, setAge] = useState('');


    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age
        })
    }

    const handleOnChangeAge = (e) => {
        setAge(e.target.value)
    }

    const handleOnChangeInput = (e) => {
        setName(e.target.value)
    }

    return (
        <div>
            My name is {name} and I'm {age}
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <label>Your name: </label>
                <input
                    value={name}
                    type="text"
                    onChange={(event) => handleOnChangeInput(event)} />
                <br />
                <label>Your age: </label>
                <input
                    value={age}
                    type="text"
                    onChange={(event) => handleOnChangeAge(event)} />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfor