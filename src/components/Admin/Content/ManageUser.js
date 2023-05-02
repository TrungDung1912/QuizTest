import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { HiPlusCircle } from 'react-icons/hi'
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleteUser from "./ModalDeleteUser"
import TableUserPaginate from "./TableUserPaginate"
import { useTranslation } from 'react-i18next';


const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataView, setDataView] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const { t } = useTranslation()


    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user)
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const resetViewData = () => {
        setDataView({})
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                {t('manage.title1.main')}
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-info" onClick={() => setShowModalCreateUser(true)}><HiPlusCircle /> {t('manage.title1.button')}</button>
                </div>
                <div className="table-users-container">
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    fetchListUsers={fetchListUsers}
                    resetViewData={resetViewData}
                    dataView={dataView}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser