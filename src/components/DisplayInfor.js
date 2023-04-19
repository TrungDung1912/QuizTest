import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

//stateless vs stateful
// class DisplayInfor extends React.Component {
//     render() {
//         console.log('Render')
//         //destructuring array/object
//         const { listUsers } = this.props
//         return (
//             //props => properties //render from parent to child
//             <div className="display-infor-container">
//                 {true &&
//                     <>
//                         {listUsers.map((listUser) => {
//                             return (
//                                 <div key={listUser.id} className={+listUser.age > 18 ? "green" : "red"}>
//                                     <div style={{ paddingBottom: '10px' }} >
//                                         <div>My name's {listUser?.name}</div>
//                                         <div>My age's {listUser?.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => { this.props.handleDeleteUser(listUser.id) }}>Delete</button>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => { this.props.handleFindUser(listUser.name) }}>Detail</button>
//                                     </div>
//                                     <hr />
//                                 </div>

//                             )
//                         })
//                         }

//                         {/* <div>My name's {this.props.name}</div>
//                     <div>My age's {this.props.age}</div> */}
//                         {/* <div>My name's {name}</div>
//                     <div>My age's {age}</div> */}
//                     </>
//                 }
//             </div>
//         )
//     }
// }
const DisplayInfor = (props) => {
    const { listUsers } = props
    return (
        //props => properties //render from parent to child
        <div className="display-infor-container">
            {true &&
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