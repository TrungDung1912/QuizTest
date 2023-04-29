import _ from 'lodash';
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox'

const Question = (props) => {
    const { data, index } = props

    const [isPreviewImage, setIsPreviewImage] = useState(false)

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (e, aId, qId) => {
        props.handleCheckBoxx(aId, qId)
    }

    return (
        <>
            {data.image ?
                < div className='q-image'>
                    <img style={{ cursor: "pointer" }} onClick={() => setIsPreviewImage(true)} src={`data:image/png;base64, ${data.image}`} />
                    {isPreviewImage === true &&
                        <Lightbox
                            onClose={() => setIsPreviewImage(false)}
                            image={`data:image/png;base64, ${data.image}`}
                            title={'Question Image'}>
                        </Lightbox>
                    }
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
                                    <input className="form-check-input" type="checkbox" checked={a.isSelected} onChange={(e) => handleCheckBox(e, a.id, data.questionId)} />
                                    <label className="form-check-label" >
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