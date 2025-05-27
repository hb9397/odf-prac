/*** TODO 모든 Object.fromEntries(), Object.keys, forEach 중에 불필요하게 접근하는 경우 개선 ***/
"use client";

import React, {ChangeEvent, useEffect, useState} from 'react';
import {createGeoserverLayer, createFeatureInfoPopup, layerFit, setOpacityLayer, toggleLayer} from "../util/odfHandler";
import {geoserverLayerList} from "@/lib/odfGeoserverLayerList";
import {useMap} from "@/app/components/MapProvider";

const GeoserverLayers = () => {
    const {baroEMap} = useMap();

    /*** geoserverLayerList 의 모든 레이어 key 가져오기 ***/
    const layerKeys = Object.keys(geoserverLayerList);

    /*** checked 의 모든 layerKey 에 접근해서 key 맞게 setChecked  ***/
    const onChangeCheckBox = (key: string) => {
        setChecked(prev => ({
            ...prev,           // -> 객체의 이전 상태 복사
            [key]: !prev[key],
        }));
    };

    /*** opacity 의 모든 layerKey 에 접근해서 key 에 맞도록 setOpacity ***/
    const onChangeTransparent = (key: string, transparent: string) => {

        if (Number(transparent) < 0) {
            transparent = "0"
        }

        if (Number(transparent) > 100) {
            transparent = "100";
        }

        setTransparent(prev => ({
            ...prev,
            [key]: transparent
        }))
    }

    /*** TODO URL 분리해서 상수로 관리 ***/
    /*** <img> src 범례 가져오기 ***/
    const getLegendUrl = (layerName: any) =>
        `/api/proxy?url=http://121.160.17.39:18080/geoserver/odf-prac/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;
        // `/api/proxy?url=http://localhost:18080/geoserver/odf-prac/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;

    /*** TODO geoserverLayerList 객체에서 배열로 변경해서 Object.fromEntries 제거 ***/
    /*** geoserverLayerList 에 존재하는 모든 레이어 layerKey:  {...layerInfo} 쌍의 객체로 만들기 ***/
    const [layers, setLayers] = useState(() =>
        Object.fromEntries(
            layerKeys.map(key => [
                key, createGeoserverLayer(geoserverLayerList[key])
            ])
        )
    );

    /*** geoserverLayerList 에 존재하는 모든 레이어의 체크박스의 상태 관리 객체를 layerKey: {boolean} 쌍으로 만들기 ***/
    const [checked, setChecked] = useState(() =>
        Object.fromEntries(
            layerKeys.map(key => [
                key, false
            ])
        )
    );

    /*** geoserverLayerList 에 존재하는 모든 레이어의 투명도 상태 관리 객체를 layerKey: {wms: ..number, wfs: ...number} 쌍으로 만들기 ***/
    const [transparent, setTransparent] = useState(() =>
        Object.fromEntries(
            layerKeys.map(key => [
                key, "0"
            ])
        )
    );

    /*** map 내의 레이어 클릭 시, 피쳐 속성 조회 여부 토글 상태(사실상 맵 전체에 대한 클릭 이벤트 실행 여부) ***/
    const [isSelectFeaturePopupOn, setIsSelectFeaturePopupOn] = useState(false);

    /*** layers 의 모든 레이어 지도에 올리기 ***/
    useEffect(() => {
        layerKeys.forEach(key => {
            layers[key].setMap(baroEMap);
        });
    }, [baroEMap, layers]);

    /*** map 의 feature 속성 조회 팝업 지도에 올리기 ***/
    useEffect(() => {
        createFeatureInfoPopup(isSelectFeaturePopupOn);
    }, [baroEMap, isSelectFeaturePopupOn]);

    /*** layers 의 모든 레이어의 노출 여부 체크박스 상태 변경 감지 및 반영 ***/
    useEffect(() => {
        layerKeys.forEach(key => {
            toggleLayer(baroEMap, layers[key], checked[key]);
        });
    }, [baroEMap, layers, checked]);

    /*** layers 의 모든 레이어의 투명도 상태 변경 감지 및 반영 ***/
    useEffect(() => {
        layerKeys.forEach(key => {
            setOpacityLayer(layers[key], transparent[key]);
        });
    }, [layers, transparent]);

    return (
        <>
            <div style={{padding: "0.5rem"}}>
                <label className="fw-bold">
                    Geoserver Layer
                </label>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked"
                           checked={isSelectFeaturePopupOn} onChange={() => setIsSelectFeaturePopupOn(prev => !prev)}/>
                    <label className="form-check-label" htmlFor="switchCheckChecked"> 피처 조회 팝업 On/Off</label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    {layerKeys.map(key => (
                        <div key={key}>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={checked[key]}
                                    onChange={() => onChangeCheckBox(key)}
                                />
                                {geoserverLayerList[key].type === 'wms'
                                    ? (
                                        <img src={getLegendUrl(geoserverLayerList[key].layer)} alt="legend" style={{width: 140, height: 20}}/>)
                                    : (
                                        <p style={{fontSize: ".7rem", margin: "0", width: 140}}>&nbsp;{geoserverLayerList[key].name}(WFS)</p>
                                    )
                                }
                            </div>
                            <div className="mt-2 d-flex align-items-center">
                                <p style={{fontSize: ".7rem", fontWeight: "bold", margin: "0"}}>투명도 :</p>
                                <input type="number"
                                       value={transparent[key]}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeTransparent(key, e.target.value)}
                                       style={{marginLeft: ".5rem", width: "50%", border: "1px solid black"}}
                                />
                            </div>
                            <div className="mt-2 d-flex justify-content-start align-items-center">
                                <button type="button" style={{border: "1px solid black", width: "71%"}} onClick={() => {
                                    layers[key].fit(15)
                                }}>레이어 바로가기
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <div className="d-flex align-items-center">
                            <input
                                type="checkbox"
                            />
                        </div>
                        <div className="mt-2 d-flex align-items-center">
                            <p style={{fontSize: ".7rem", fontWeight: "bold", margin: "0"}}>투명도 :</p>
                            <input type="number"
                            />
                        </div>
                        <div className="mt-2 d-flex justify-content-start align-items-center">
                            <button type="button" style={{border: "1px solid black", width: "71%"}}>레이어 바로가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeoserverLayers;