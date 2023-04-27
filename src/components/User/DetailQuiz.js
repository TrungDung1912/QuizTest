import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question';

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    const [index, setIndex] = useState(0)
    const [dataQuiz, setDataQuiz] = useState([])

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        let raw = res.DT
        let data = _.chain(raw)
            // Group the elements of Array based on `color` property
            .groupBy("id")
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) => {
                let answers = []
                let questionDescription, image = null
                value.forEach((item, index) => {
                    if (index === 0) {
                        questionDescription = item.description
                        image = item.image
                    }
                    item.answers.isSelected = false
                    answers.push(item.answers)
                })
                return { questionId: key, answers, questionDescription, image }
            })
            .value()
        console.log(data)
        setDataQuiz(data)
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBoxx = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-content'>
                    <Question handleCheckBoxx={handleCheckBoxx} index={index + 1} data={dataQuiz && dataQuiz.length > 0
                        ? dataQuiz[index] : []} />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' onClick={() => handleNext()}>Next</button>
                    <button className='btn btn-warning' onClick={() => handleNext()}>Finish</button>
                </div>
            </div>
            <div className='right-content'>
                Count down
            </div>
        </div>
    )
}

export default DetailQuiz