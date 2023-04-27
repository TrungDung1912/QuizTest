import _ from 'lodash';
const Question = (props) => {
    const { data, index } = props

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (e, aId, qId) => {
        console.log(aId, qId)
        props.handleCheckBoxx(aId, qId)
    }

    return (
        <>
            {data.image ?
                < div className='q-image'>
                    <img src={`data:image/png;base64, ${data.image}`} />
                </div > :
                <div className='q-image'></div>
            }
            <div className='question'>
                Question {index}: {data.questionDescription} ?
            </div>
            <div className='answer'>
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={a.isSelected} onChange={(e) => handleCheckBox(e, a.id, data.questionId)} />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        {a.description}
                                    </label>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question