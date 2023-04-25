import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { HiPlusCircle } from 'react-icons/hi'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser"

const ManageUser = (props) => {
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

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
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}

export default ManageUser