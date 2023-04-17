import React from "react";

class DisplayInfor extends React.Component {
    render() {
        //destructuring array/object
        const { age, name } = this.props
        return (
            //props => properties //render from parent to child
            <div >
                <div>My name's {this.props.name}</div>
                <div>My age's {this.props.age}</div>
                <div>My name's {name}</div>
                <div>My age's {age}</div>
            </div>
        )
    }
}

export default DisplayInfor