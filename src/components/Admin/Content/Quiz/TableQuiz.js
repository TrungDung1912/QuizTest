import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService"
import ModalDeleteQuiz from "./ModalDeleteQuiz"
import ModalUpdateQuiz from "./ModalUpdateQuiz"

const TableQuiz = (props) => {
    const { listQuizz, setListQuizz } = props
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})

    useEffect(() => {
        setDataUpdate({})
        setDataDelete({})
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuizz(res.DT)
        }
    }

    const handleClickBtnDelete = (quiz) => {
        setDataDelete(quiz)
        setShowModalDelete(true)
    }

    const handleClickBtnUpdate = (quiz) => {
        setDataUpdate(quiz)
        setShowModalUpdate(true)
    }

    return (
        <>
            <div>List_Quiz:</div>
            <table className="table table-hover table-dark table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#212529" }}>
                    {listQuizz && listQuizz.length > 0 &&
                        listQuizz.map((quiz, index) => {
                            return (
                                <tr key={`table-quizs-${index}`}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td style={{ display: "flex", gap: "5px" }}>
                                        <button className="btn btn-warning mx-3"
                                            onClick={() => handleClickBtnUpdate(quiz)}>Update</button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(quiz)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuizz && listQuizz.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>Empty Data!</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModalDeleteQuiz
                setShow={setShowModalDelete}
                show={showModalDelete}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchQuiz={fetchQuiz}
            />
            <ModalUpdateQuiz
                setShow={setShowModalUpdate}
                show={showModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz