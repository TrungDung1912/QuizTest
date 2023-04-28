import './ManageQuiz.scss'
import Select from 'react-select'
import { HiPlusCircle } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [listQuiz, setListQuiz] = useState([])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
            console.log(res.DT)
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            await fetchQuiz();
            setName('')
            setDescription('')
            setPreviewImage(null)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder='ex: your-quiz-name' />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="form-control" placeholder='ex: description' />
                                    <label >Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type ..."}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className="form-label label-upload" htmlFor='labelUpload'><HiPlusCircle color='green' />Upload File Image</label>
                                    <input className='form-control' type="file" hidden id='labelUpload' onChange={(event) => handleUploadImage(event)} />
                                </div>
                                <div className='img-preview'>
                                    {previewImage ?
                                        <img src={previewImage} alt='' />
                                        :
                                        <span>Preview Image</span>
                                    }
                                </div>
                                <div className='mt-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail mt-5">
                <TableQuiz listQuizz={listQuiz}
                    setListQuizz={setListQuiz} />
            </div>
        </div>
    )
}

export default ManageQuiz