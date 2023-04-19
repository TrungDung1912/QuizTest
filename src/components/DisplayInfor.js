import React, { useState, useEffect } from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

//stateless(function) vs stateful(class)
const DisplayInfor = (props) => {
    const { listUsers } = props
    //Destructuring assignment
    const [isShowHideListUsers, setShowHideListUsers] = useState(true);

    // this.state = {
    //     isShowHideListUsers: true
    // }
    const handleShowHideListUser = () => {
        setShowHideListUsers(!isShowHideListUsers)
    }

    console.log('render')

    useEffect(() => {
        if (listUsers.length === 0) {
            alert('Empty!')
        }
        console.log('useEffect')
    }, [listUsers]); //componentDidMount + componentDidUpdate


    return (
        //props => properties //render from parent to child
        <div className="display-infor-container">
            <div>
                <span onClick={() => { handleShowHideListUser() }}>{isShowHideListUsers === true ? 'Hide list users' : 'Show list users'}</span>
            </div>
            {isShowHideListUsers &&
                <>
                    {listUsers.map((listUser) => {
                        return (
                            <div key={listUser.id} className={+listUser.age > 18 ? "green" : "red"}>
                                <div style={{ paddingBottom: '10px' }} >
                                    <div>My name's {listUser?.name}</div>
                                    <div>My age's {listUser?.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => { props.handleDeleteUser(listUser.id) }}>Delete</button>
                                </div>
                                <div>
                                    <button onClick={() => { props.handleFindUser(listUser.name) }}>Detail</button>
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

export default DisplayInfor