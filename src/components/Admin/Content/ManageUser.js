import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { HiPlusCircle } from 'react-icons/hi'
import { useState } from "react"

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-info" onClick={() => setShowModalCreateUser(true)}><HiPlusCircle /> Add new users</button>
                </div>
                <div className="table-users-container">
                    table usersWE
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    )
}

export default ManageUser