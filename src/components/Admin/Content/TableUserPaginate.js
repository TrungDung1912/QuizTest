import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
    const { listUsers, fetchListUsersWithPaginate, pageCount, currentPage, setCurrentPage } = props
    const { t } = useTranslation()

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
            <table className="table table-hover table-dark table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{t('table.title1.id')}</th>
                        <th scope="col">{t('table.title1.username')}</th>
                        <th scope="col">{t('table.title1.email')}</th>
                        <th scope="col">{t('table.title1.role')}</th>
                        <th scope="col">{t('table.title1.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(user)}>{t('table.title2.view')}</button>
                                        <button className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(user)}>{t('table.title2.update')}</button>
                                        <button className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(user)}>{t('table.title2.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>{t('table.title3.data')}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="user-pagination d-flex justify-content-center">
                <ReactPaginate
                    nextLabel={t('table.title3.next')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={t('table.title3.prev')}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate