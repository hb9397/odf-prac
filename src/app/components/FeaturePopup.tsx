import React from 'react';

interface Props {
    properties: Record<string, any>;
    onClose: () => void;
}

const FeaturePopup = ({properties, onClose}: Props) => {
    return (
        <div
            style={{
                width: '45rem',
                maxHeight: '300px',
                backgroundColor: 'white',
                border: '1px solid black',
                padding: '5px',
                transform: 'scale(1)',
                transformOrigin: 'top left',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* 상단 고정 버튼 */}
            <div style={{flexShrink: 0, display: 'flex', justifyContent: 'flex-end', marginBottom: '5px'}}>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: '1px solid #ff4d4f',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        width: '30px',
                        height: '30px',
                        lineHeight: '26px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                    }}
                >
                    ×
                </button>
            </div>

            {/* 스크롤 가능 영역 */}
            <div
                style={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    boxSizing: 'border-box',
                    paddingRight: '10px',
                }}
            >
                <table style={{width: '100%'}}>
                    <tbody>
                    {Object.entries(properties).map(([key, value]) => {
                        if (key === 'geometry') return null;
                        return (
                            <tr key={key}>
                                <td
                                    style={{
                                        border: '1px solid #949494',
                                        padding: '3px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {key}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #949494',
                                        padding: '3px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {value ?? '-'}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default FeaturePopup;