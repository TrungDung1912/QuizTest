import { useState } from "react"
import { useEffect } from "react"
import { getQuizByUser } from "../../services/apiService"
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate()
    const { t } = useTranslation()


    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let data = await getQuizByUser()
        console.log(data)
        if (data && data.EC === 0) {
            setArrQuiz(data.DT)
        }
    }

    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/png;base64, ${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })} className="btn btn-primary">{t('listquiz.title1.start')}</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    {t('listquiz.title1.warning')}
                </div>
            }
        </div>
    )
}

export default ListQuiz