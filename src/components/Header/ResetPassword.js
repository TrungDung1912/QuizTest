
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHistory, postChangePassword } from '../../services/apiService';
import { toast } from 'react-toastify'
import UserInfor from './UserInfor';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [rePassword2, setRePassword2] = useState('')
    const { t, i18n } = useTranslation()

    const handleChangePassword = async () => {
        if (rePassword === rePassword2) {
            let res = await postChangePassword(password, rePassword)
            if (res && res.EC === 0) {
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        }
        else {
            toast.warning("Enter the same with password and confirm password")
        }
    }

    return (
        <div>
            <div className="col-md-6">
                <label className="form-label">{t("profile.title2.password")}</label>
                <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">{t("profile.title2.repassword")}</label>
                <input onChange={(event) => setRePassword(event.target.value)} value={rePassword} type="password" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">{t("profile.title2.repassword")}</label>
                <input onChange={(event) => setRePassword2(event.target.value)} value={rePassword2} type="password" className="form-control" />
            </div>
            <Button style={{ marginTop: "20px" }} variant="primary" onClick={() => handleChangePassword()}>
                {t("profile.title2.save")}
            </Button>
        </div>
    )
}

export default ResetPassword