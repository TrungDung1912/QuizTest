import { useState } from "react";
import Select from "react-select"
import './Questions.scss'
import { TiPlus } from 'react-icons/ti'
import { HiPlusCircle } from 'react-icons/hi'
import { HiMinusSm, HiPlusSm, HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder={"Quiz type ..."}
                    />
                </div>
                <div className="mt-3">
                    Add Questions:
                </div>
                <div className="questions-content">
                    <div className="form-floating description">
                        <input type="text" className="form-control" placeholder="ex: nive" />
                        <label >Description</label>
                    </div>
                    <div className="group-upload">
                        <label htmlFor='labelUploaddd' className="label-upload"><HiPlusCircle style={{ color: "#ccc" }} />Upload Image</label>
                        <input id="labelUploaddd" type="file" hidden></input>
                    </div>
                    <div className='img-preview'>
                        <img src="" alt='' />
                        <span>Preview Image</span>
                    </div>
                    <div className="btn-add">
                        <span><HiPlusSm className="icon-add" /></span>
                        <span><HiMinusSm className="icon-remove" /></span>
                    </div>
                </div>
                <hr />
                <div className="answer-content">
                    <input className="form-check-input iscorrect" type="checkbox" />
                    <div className="form-floating description answer-name">
                        <input type="text" className="form-control" placeholder="ex: nive" />
                        <label >Answer 1</label>
                    </div>
                    <div className="btn-group">
                        <span><HiOutlinePlusCircle className="icon-add" /></span>
                        <span><HiOutlineMinusCircle className="icon-remove" /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions