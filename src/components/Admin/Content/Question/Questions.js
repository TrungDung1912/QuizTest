import { useEffect, useState } from "react";
import Select from "react-select"
import './Questions.scss'
import { RiImageAddFill } from 'react-icons/ri'
import { HiMinusSm, HiPlusSm, HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import Lightbox from 'react-awesome-lightbox'
import { getAllQuizForAdmin } from "../../../../services/apiService"
import { postCreateNewAnswerForQuiz, postCreateNewQuestionForQuiz } from "../../../../services/apiService";

const Questions = (props) => {
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
        ]
    )

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log()
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }

        }
    }

    const handleOnChangeFileQuestion = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionsClone[index].imageFile = e.target.files[0]
            questionsClone[index].imageName = e.target.files[0].name
            setQuestions(questionsClone)
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(questionsClone)
        }

    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            })
            setIsPreviewImage(true)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate


        //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            );
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuiz(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3 mb-2">
                    Add Questions:
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="qmain mb-5">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="ex: nive"
                                            value={question.description}
                                            onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)} />
                                        <label >Question {index + 1} Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`} className="label-upload"><RiImageAddFill style={{ color: "white" }} /></label>
                                        <input id={`${question.id}`} onChange={(e) => handleOnChangeFileQuestion(question.id, e)} type="file" hidden></input>
                                        <span>
                                            {
                                                question.imageName ? <span style={{ cursor: "pointer", maxWidth: "100px" }} onClick={() => handlePreviewImage(question.id)}> {question.imageName} </span> : '0 file is upload '
                                            }
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}><HiPlusSm className="icon-add" /></span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)} > <HiMinusSm className="icon-remove" /></span>
                                        }
                                    </div>
                                </div>

                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answer-content">
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating description answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="ex: nive"
                                                        value={answer.description}
                                                        onChange={(e) => handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value)}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}><HiOutlinePlusCircle className="icon-add" /></span>
                                                    {
                                                        question.answers.length > 1 && <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><HiOutlineMinusCircle className="icon-remove" /></span>
                                                    }
                                                </div>
                                            </div>
                                        )

                                    })
                                }

                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button style={{ boxShadow: "3px 5px #ccc", border: "1px solid yellow" }}
                            onClick={() => { handleSubmitQuestionForQuiz() }}
                            className="btn btn-warning"
                        >Save Question
                        </button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox
                        onClose={() => setIsPreviewImage(false)}
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}>
                    </Lightbox>
                }

            </div>
        </div >
    )
}

export default Questions