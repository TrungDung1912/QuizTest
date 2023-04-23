import ModalCreateUser from "./ModalCreateUser"

const ManageUser = (props) => {
    return (
        <div classNameName="mange-user-container">
            <div classNameName="title">
                Manage User
            </div>
            <div classNameName="users-content">
                <div>
                    <button>Add new users</button>
                </div>
                <div>
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser