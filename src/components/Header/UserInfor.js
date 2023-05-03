import { useSelector } from "react-redux"
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import { useState } from "react";
import { useEffect } from "react";
import { HiPlusCircle } from 'react-icons/hi'
import './UserInfor.scss'
import { toast } from 'react-toastify';
import { postUpdateProfile } from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { doFetchData, doLogin } from "../../redux/action/userAction";


const UserInfor = () => {
    const account = useSelector(state => state.user.account)
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [role, setRole] = useState("User")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email)
            setUserName(account.username)
            setRole(account.role)
            setImage("")
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }
    }, [account])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }
    }

    const handleSubmitUpdateProfile = async () => {
        let data = await postUpdateProfile(username, image)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success('Update ' + username + ' success!!!')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="user-info-container">
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">{t('table.title1.username')}</label>
                    <input onChange={(event) => setUserName(event.target.value)} value={username} type="text" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">{t('table.title1.email')}</label>
                    <input disabled onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('table.title1.role')}</label>
                    <select disabled value={role} className="form-select" onChange={(event) => setRole(event.target.value)}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div classNameName='col-md-12'>
                    <label className="form-label label-upload" htmlFor='labelUpload'><HiPlusCircle color='green' />{t('quiz.title1.image')}</label>
                    <input type="file" hidden id='labelUpload' onChange={(event) => handleUploadImage(event)} />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} alt='' />
                        :
                        <span>{t('quiz.title1.previmg')}</span>
                    }
                </div>
            </form>
            <Button style={{ marginTop: "20px" }} className="btn btn-primary" onClick={() => handleSubmitUpdateProfile()}>
                {t('quiz.title1.save')}
            </Button>
        </div>
    )
}
export default UserInfor