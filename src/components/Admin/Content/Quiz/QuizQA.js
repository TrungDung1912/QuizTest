import { useEffect, useState } from "react";
import Select from "react-select"
import './QuizQA.scss'
import { RiImageAddFill } from 'react-icons/ri'
import { HiMinusSm, HiPlusSm, HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import Lightbox from 'react-awesome-lightbox'
import {
    getAllQuizForAdmin, getQuizWithQA, postUpsertQA
} from "../../../../services/apiService"
import { toast } from 'react-toastify';

const QuizQA = (props) => {
    const initQuestions = [
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

    const [questions, setQuestions] = useState(initQuestions)

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

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz])

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const fetchQuizWithQA = async () => {
        let rs = await getQuizWithQA(selectedQuiz.value)
        if (rs && rs.EC === 0) {
            //convert base 64 to file object 
            let newQA = []
            for (let i = 0; i < rs.DT.qa.length; i++) {
                let q = rs.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q)
            }
            setQuestions(newQA)
            console.log(rs)
        }
    }

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
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a quiz")
            return;
        }

        //validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j
                    break
                }
            }
            indexQ = i
            if (isValidAnswer === false) {
                break
            }
        }

        if (isValidAnswer === false) {
            toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        //validate question
        let isValidQuestion = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ1 = i
                break;
            }
        }

        if (isValidQuestion === false) {
            toast.error(`Not Empty Description for Question ${indexQ1 + 1}`)
            return;
        }


        //submit question
        let questionsClone = _.cloneDeep(questions)
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile =
                    await toBase64(questionsClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA()
        }
        // toast.success('Create Question and Answer success!!!')
        // setQuestions(initQuestions)
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <div className="questions-container">
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

export default QuizQA