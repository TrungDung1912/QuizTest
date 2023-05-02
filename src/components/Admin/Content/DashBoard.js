import './DashBoard.scss'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { getOverview } from '../../../services/apiService'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const DashBoard = (props) => {
    const [dataOverView, setDataOverView] = useState([])
    const [dataChart, setDataChart] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        fetchDataOverview()
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview()
        if (res && res.EC === 0) {
            setDataOverView(res.DT)
            //process chart data
            let QZ = 0, QS = 0, AS = 0
            QZ = res?.DT?.others?.countQuiz ?? 0
            QS = res?.DT?.others?.countQuestions ?? 0
            AS = res?.DT?.others?.countAnswers ?? 0
            const data = [
                {
                    "name": "Quizzes",
                    "QZ": QZ,
                },
                {
                    "name": "Questions",
                    "QS": QS,
                },
                {
                    "name": "Answers",
                    "AS": AS,
                },
            ]
            setDataChart(data)

        }
    }

    console.log(dataOverView)

    return (
        <div className="dashboard-container">
            <div className='title'>
                {t('dashboard.title1.slogan')}
            </div>
            <hr />
            <div className='content'>
                <div className='c-left'>
                    <div className='a-child'>
                        <span className='text-1'>{t('dashboard.title2.user')}</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.users
                                && dataOverView.users.total ? <>{dataOverView.users.total}</> : <>0</>}
                        </span>
                    </div>
                    <div className='a-child'>
                        <span className='text-1'>{t('dashboard.title2.quiz')}</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuiz ? <>{dataOverView.others.countQuiz}</> : <>0</>}
                        </span>
                    </div>
                    <div className='a-child'>
                        <span className='text-1'>{t('dashboard.title2.question')}</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuestions ? <>{dataOverView.others.countQuestions}</> : <>0</>}
                        </span>
                    </div>
                    <div className='a-child'>
                        <span className='text-1'>{t('dashboard.title2.answer')}</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countAnswers ? <>{dataOverView.others.countAnswers}</> : <>0</>}
                        </span>
                    </div>

                </div>
                <div className='c-right'>
                    <ResponsiveContainer width={'95%'} height={'100%'}>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="QZ" fill="#8884d8" />
                            <Bar dataKey="QS" fill="#82ca9d" />
                            <Bar dataKey="AS" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard