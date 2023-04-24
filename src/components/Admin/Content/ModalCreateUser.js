import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HiPlusCircle } from 'react-icons/hi'
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService.js'

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        setUserName("")
        setRole("User")
        setImage("")
        setPreviewImage("")
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [role, setRole] = useState("User");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@@#$%^&*]).{8,}/
            );
    }

    const handleSubmitCreateUser = async () => {
        //Validate 
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!isValidPassword) {
            toast.error('Password must include at least 8 characters with 1 [A->Z], 1 [a->z], 1[!@#$%^&*] and 1 [0->9]');
            return;
        }

        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            toast.success('Create new ' + role + ' success!!')
            handleClose();
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input onChange={(event) => setUserName(event.target.value)} value={username} type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select value={role} className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div classNameName='col-md-12'>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser