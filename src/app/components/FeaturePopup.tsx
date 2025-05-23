import React from 'react';

interface Props {
    properties: Record<string, any>;
}

const FeaturePopup = ({properties}: Props) => {
    return (
        <div style={{backgroundColor: 'white', padding: '5px'}}>
            <table style={{width: '100%'}}>
                <tbody>
                {Object.entries(properties).map(([key, value]) => {
                    if (key === "geometry") return null;
                    return (
                        <tr key={key}>
                            <td style={{border: '1px solid #949494', padding: '3px', textAlign: 'center'}}>{key}</td>
                            <td style={{border: '1px solid #949494', padding: '3px', textAlign: 'center'}}>
                                {value ?? '-'}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default FeaturePopup;