'use client'

import React, {useEffect, useRef, useState} from 'react';
import {useMap} from "@/app/components/MapProvider";
import {createBasemapControlWidget, setBasemapWidgetThme} from "../util/ouiHandler"

const BaseMapWidget = () => {
    const { baroEMap } = useMap();

    const basemapWidgetRef = useRef<HTMLLIElement  | null>(null);

    useEffect(() => {
        createBasemapControlWidget(baroEMap, basemapWidgetRef.current);
    }, [baroEMap]);

    return (
        <>
            <ul className="toolbar">
                <li className="basemapWidget" id="basemapWidget" ref={basemapWidgetRef}></li>
            </ul>
            {/*<div style={{marginTop: "15px", position:"absolute"}}>
                <button className="onoffOnlyBtn toggle grp1 active" onClick={()=>setBasemapWidgetThme('gallary', baroEMap, basemapWidgetRef.current)}>갤러리 테마</button>
                <button className="onoffOnlyBtn toggle grp1" onClick={()=>setBasemapWidgetThme('menu', baroEMap, basemapWidgetRef.current)}>메뉴 테마</button>
                <button className="onoffOnlyBtn toggle grp1" onClick={()=>setBasemapWidgetThme('mobile', baroEMap, basemapWidgetRef.current)}>모바일 테마</button>
            </div>*/}
        </>
    );
};

export default BaseMapWidget;