import { useTranslation } from 'react-i18next';
import { getHistory } from '../../services/apiService';
import { useEffect, useState } from 'react';
import moment from 'moment';


const History = () => {
    const { t, i18n } = useTranslation()
    const [dataHistory, setDataHistory] = useState([])

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory()
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData.length > 6) {
                newData = newData.slice(newData.length - 6, newData.length)
            }
            setDataHistory(newData)
        }
    }

    return (
        <table className="table table-hover table-dark table-bordered">
            <thead>
                <tr>
                    <th scope="col">{t("profile.title4.id")}</th>
                    <th scope="col">{t("profile.title4.name")}</th>
                    <th scope="col">{t("profile.title4.total_question")}</th>
                    <th scope="col">{t("profile.title4.total_correct")}</th>
                    <th scope="col">{t("profile.title4.date")}</th>
                </tr>
            </thead>
            <tbody>
                {dataHistory && dataHistory.length > 0 &&
                    dataHistory.map((user, index) => {
                        return (
                            <tr key={`table-users-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.total_questions}</td>
                                <td>{user.total_correct}</td>
                                <td>{user.date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default History