import React from 'react'

interface InfoBoxProps {
    content?: string
    type?: string
}

const InfoBox: React.FC<InfoBoxProps> = ({content, type}) => {
    const typeStyles = {
        backgroundColor: 'none'
    }
    switch (type) {
        case 'credits':
            typeStyles.backgroundColor = '#ff7f50'
            break;
        case 'balance':
            typeStyles.backgroundColor = 'green'
            break;
        default:
            break;
    }
    return (
        <div className='info-box' style={{...typeStyles}}>{content}</div>
    )
}

export default InfoBox