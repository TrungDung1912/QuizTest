import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

class DisplayInfor extends React.Component {
    state = {
        isShowListUser: true
    }

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {
        //destructuring array/object
        // const { age, name } = this.props
        const { listUsers } = this.props
        // console.log(listUsers)
        // console.table(listUsers)
        return (
            //props => properties //render from parent to child
            <div className="display-infor-container">
                <img src={logo} />
                <div>
                    <span onClick={() => this.handleShowHide()}>{this.state.isShowListUser === true ? "Hide list users: " : "Show list users: "}</span>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((listUser) => {
                            return (
                                <div style={{ paddingBottom: '10px' }} key={listUser.id} className={+listUser.age > 18 ? "green" : "red"}>
                                    <div>My name's {listUser?.name}</div>
                                    <div>My age's {listUser?.age}</div>
                                    <hr />
                                </div>
                            )
                        })
                        }
                        {/* <div>My name's {this.props.name}</div>
                    <div>My age's {this.props.age}</div> */}
                        {/* <div>My name's {name}</div>
                    <div>My age's {age}</div> */}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor