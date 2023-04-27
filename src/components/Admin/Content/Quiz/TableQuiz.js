import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService"

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    return (
        <>
            <div>List_Quiz:</div>
            <table className="table table-hover table-dark table-bordered mt-2">
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
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((quiz, index) => {
                            return (
                                <tr key={`table-quizs-${index}`}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td style={{ display: "flex", gap: "5px" }}>
                                        <button className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(quiz)}>Update</button>
                                        <button className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(quiz)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>Empty Data!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz