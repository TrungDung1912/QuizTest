import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HiPlusCircle } from 'react-icons/hi'
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuizForAdmin } from '../../../../services/apiService.js';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setName("")
        setDescription("")
        setType("EASY")
        setImage("")
        setPreviewImage("")
        setDataUpdate({})
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    //Use Effect only run when dataUpdate change
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setType(dataUpdate.difficulty)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }
    }

    const handleSubmitUpdateQuiz = async () => {
        //Validate 
        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image)
        if (data && data.EC === 0) {
            toast.success('Update ' + name + ' success!!!')
            handleClose();
            await props.fetchQuiz();
            // await props.fetchListUsersWithPaginate(props.currentPage)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Enter information
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Quiz Type</label>
                            <select value={type} className="form-select" onChange={(event) => setType(event.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'><HiPlusCircle color='green' />Upload File Image</label>
                            <input type="file" hidden id='labelUpload' onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt='' />
                                :
                                <span>Preview Image</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz