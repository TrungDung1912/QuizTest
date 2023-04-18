import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

class DisplayInfor extends React.Component {

    constructor(props) {
        console.log('Constructor')
        super(props);
        //babel compiler
        this.state = {
            isShowListUser: true
        }
    }
    // state = {
    //     isShowListUser: true
    // }

    componentDidMount() {
        console.log('componentDidMount')
        setTimeout(() => {
            document.title = 'DungBum'
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', this.props, prevProps)
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert('You got 5 users')
            }
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {
        console.log('Render')
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
                    <>
                        {listUsers.map((listUser) => {
                            return (
                                <div key={listUser.id} className={+listUser.age > 18 ? "green" : "red"}>
                                    <div style={{ paddingBottom: '10px' }} >
                                        <div>My name's {listUser?.name}</div>
                                        <div>My age's {listUser?.age}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => { this.props.handleDeleteUser(listUser.id) }}>Delete</button>
                                    </div>
                                    <div>
                                        <button onClick={() => { this.props.handleFindUser(listUser.name) }}>Detail</button>
                                    </div>
                                    <hr />
                                </div>

                            )
                        })
                        }

                        {/* <div>My name's {this.props.name}</div>
                    <div>My age's {this.props.age}</div> */}
                        {/* <div>My name's {name}</div>
                    <div>My age's {age}</div> */}
                    </>
                }
            </div>
        )
    }
}

export default DisplayInfor