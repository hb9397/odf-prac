"use client";

import React, {useEffect, useState} from 'react';
import {createGeoserverLayer, toggleLayer} from "../util/odfHandler";
import {geoserverLayerList} from "@/lib/odfGeoserverLayerList";
import {useMap} from "@/app/components/map-provider";

const GeoserverLayers = () => {
    const {baroEMap} = useMap();

    const [examLayer0001, setExamLayer0001] = useState<any | null>(createGeoserverLayer(geoserverLayerList.odfPracYp0001, 'wms'));
    const [examLayer0002, setExamLayer0002] = useState<any | null>(createGeoserverLayer(geoserverLayerList.odfPracYp0003, 'wfs'));

    const [isCheckedExamLayer0001, setIsCheckedExamLayer0001] = useState<boolean>(false);
    const [isCheckedExamLayer0002, setIsCheckedExamLayer0002] = useState<boolean>(false);


    useEffect(() => {
        examLayer0001.setMap(baroEMap);
        examLayer0002.setMap(baroEMap);
    }, [baroEMap]);


    /*** TODO : toggle 하는 형식 중복 없도록 변경 ***/
    useEffect(() => {
        toggleLayer(baroEMap, examLayer0001, isCheckedExamLayer0001);
    }, [baroEMap, examLayer0001, isCheckedExamLayer0001]);

    useEffect(() => {
        toggleLayer(baroEMap, examLayer0002, isCheckedExamLayer0002);
    }, [baroEMap, examLayer0002, isCheckedExamLayer0002]);

    return (
        <>
            <div style={{padding: "0.5rem"}} >
                <label>
                    Geoserver Layer
                </label>
                <div>
                    <div>
                        <input
                            type="checkbox"
                            className="btn-check al"
                            id="chk-layer-0001"
                            checked={isCheckedExamLayer0001}
                            onChange={() => setIsCheckedExamLayer0001(prev => !prev)}
                        />
                        <label
                            className={`btn btn-outline-secondary ${isCheckedExamLayer0001 ? 'active' : ''}`}
                            htmlFor="chk-layer-0001"
                            style={{marginLeft: "0.5rem"}}
                        >
                            용산구 관광지
                        </label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            className="btn-check"
                            id="chk-layer-0002"
                            checked={isCheckedExamLayer0002}
                            onChange={() => setIsCheckedExamLayer0002(prev => !prev)}
                        />
                        <label
                            className={`btn btn-outline-secondary ${isCheckedExamLayer0002 ? 'active' : ''}`}
                            htmlFor="chk-layer-0002"
                            style={{marginLeft: "0.5rem"}}
                        >
                            용산구 지역특화거리
                        </label>
                    </div>

                </div>

            </div>

            <div className="infoArea" style={{marginTop: 15}}>
                <div id="featureInfo"></div>
            </div>
        </>
    );
};

export default GeoserverLayers;