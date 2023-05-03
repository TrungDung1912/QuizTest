import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify'
import UserInfor from './UserInfor';
import ResetPassword from './ResetPassword';
import History from './History';


const Profile = (props) => {
    const { show, setShow } = props;
    const { t, i18n } = useTranslation()

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                size='x1'
                backdrop='static'
                className='modal-profile modal-xl modal-md'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("profile.title1.slogan")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="main" title={i18n.language === 'vi' ? "Thông tin chính" : "Main information"}>
                            <UserInfor />
                        </Tab>
                        <Tab eventKey="password" title={i18n.language === 'vi' ? "Cài lại mật khẩu" : "Reset Password"}>
                            <ResetPassword />
                        </Tab>
                        <Tab eventKey="history" title={i18n.language === 'vi' ? "Lịch sử" : "History"}>
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("profile.title3.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile