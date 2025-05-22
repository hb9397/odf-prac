"use client";

import React, {useEffect, useState} from 'react';
import {createGeoserverLayer, toggleLayer} from "../util/odfHandler";
import {geoserverLayerList} from "@/lib/odfGeoserverLayerList";
import {useMap} from "@/app/components/map-provider";

const GeoserverLayers = () => {
    const {baroEMap} = useMap();

    /*** geoserverLayerList 의 모든 레이어 key 가져오기 ***/
    const layerKeys = Object.keys(geoserverLayerList);

    /*** checked 의 모든 layerKey 에 접근해서 key 맞게 setChecked  ***/
    const onChangeCheckBox = (key: string, type: 'wms' | 'wfs') => {
        setChecked(prev => ({
            ...prev, // -> 객체의 이전 상태 복사
            [key]: { ...prev[key], // -> 위에서 복사한 객체가 가지고 있는 내부 객체에 대해서도 이전 상태 복사
                [type]: !prev[key][type] // -> 이제 현재상태를 실제 값에 대해 접근해서 변경
            }
        }));
    };

    /*** TODO URL 분리해서 상수로 관리 ***/
    /*** <img> src 범례 가져오기 ***/
    const getLegendUrl = (layerName: any) =>
        `/api/proxy?url=http://121.160.17.39:18080/geoserver/odf-prac/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;

    /*** TODO geoserverLayerList 객체에서 배열로 변경해서 Object.fromEntries 제거 ***/
    /*** geoserverLayerList 에 존재하는 모든 레이어 layerKey: { wms: {...layerInfo}, wfs: {...layerInfo} }쌍의 객체로 만들기 ***/
    const [layers, setLayers] = useState(() =>
        Object.fromEntries(
            layerKeys.map(key => [
                key,
                {
                    wms: createGeoserverLayer(geoserverLayerList[key].layer, 'wms'),
                    wfs: createGeoserverLayer(geoserverLayerList[key].layer, 'wfs'),
                }
            ])
        )
    );

    /*** geoserverLayerList 에 존재하는 모든 레이어의 체크박스의 상태 관리 객체를 layerKey: {wms: ...boolean, wfs: ...boolean} 쌍으로 만들기 ***/
    const [checked, setChecked] = useState(() =>
        Object.fromEntries(
            layerKeys.map(key => [
                key,
                { wms: false, wfs: false }
            ])
        )
    );

   /*** layers 의 모든 레이어 지도에 올리기 ***/
   useEffect(() => {
       layerKeys.forEach(key => {
           layers[key].wms.setMap(baroEMap);
           layers[key].wfs.setMap(baroEMap);
       });
   }, [baroEMap, layers]);

    /*** layers 의 모든 레이어의 노출 여부 체크박스 상태 변경 감지 및 반영 ***/
    useEffect(() => {
        layerKeys.forEach(key => {
            toggleLayer(baroEMap, layers[key].wms, checked[key].wms);
            toggleLayer(baroEMap, layers[key].wfs, checked[key].wfs);
        });
    }, [baroEMap, layers, checked]);

    return (
        <>
            <div style={{padding: "0.5rem"}}  >
                <label className="fw-bold">
                    Geoserver Layer
                </label>
                <div className="d-flex justify-content-start align-items-center gap-2">
                    {layerKeys.map(key => (
                        <div key={key}>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={checked[key].wms}
                                    onChange={() => onChangeCheckBox(key, 'wms')}
                                />
                                <img src={getLegendUrl(geoserverLayerList[key].layer)} alt="legend" />
                            </div>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={checked[key].wfs}
                                    onChange={() => onChangeCheckBox(key, 'wfs')}
                                />
                                <p style={{fontSize: ".8rem", margin: "0 0 0 .5rem"}}>{geoserverLayerList[key].name}(WFS)</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="infoArea" style={{marginTop: 15}}>
                <div id="featureInfo"></div>
            </div>
        </>
    );
};

export default GeoserverLayers;