'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useBaroEMap} from "@/app/components/baro-e-map-provider";

const VworldWmsLayers = () => {
    const { baroEMap } = useBaroEMap();

    /*const layerList = {
        경계_시군구: "lt_c_adsigg_info",
        경계_읍면동: "lt_c_ademd_info",
        관광_관광안내소: "lt_p_dgtouristinfo",
        교통_교통CCTV: "lt_p_utiscctv",
        용도지역지구_도시지역: "lt_c_uq111",
        토지_사업지구경계도: "lt_c_lhzone",
        산업_주요상권: "lt_c_dgmainbiz"

    };

    const layerStyleList = {
        경계_시군구: "lt_c_adsigg",
        경계_읍면동: "lt_c_ademd_3d",
        관광_관광안내소: "lt_p_dgtouristinfo",
        교통_교통CCTV: "lt_p_utiscctv",
        용도지역지구_도시지역: "lt_c_uq111",
        토지_사업지구경계도: "lt_c_lhzone",
        산업_주요상권: "lt_c_dgmainbiz"
    };

    const [currentLayers, setCurrentLayers] = useState(``);
    const [currentLayersStyles, setCurrentLayersStyles] = useState(``);*/

    useEffect(()=> {
        // layout.tsx 에서 <Script> 로 odf.min.js, <link> 로 odf.css 가져오도록 되어있다.
        const odf = (window as any)?.odf;

        const apiLayer = odf.LayerFactory.produce('api', {
            server:{
                url:'http://api.vworld.kr/req/wms',
                proxyURL : '/api/proxy',
                proxyParam : 'url',
            },
            service: 'wms', // wms/wfs
            layers: 'lt_c_adsigg,lt_c_ademd,lt_p_utiscctv',
            styles: 'lt_c_adsigg,lt_c_ademd,lt_p_utiscctv',
            crs : 'EPSG:5186',
            originalOption : {
                BBOX : '{{miny}},{{minx}},{{maxy}},{{maxx}}',
            },
            domain:'www.odfPrac.com',
            key : 'E60166A5-2C82-3F6C-883A-2907F2A83239',
        });

        //apiLayer.setMap(baroEMap);
    },[baroEMap]);

    return (
        <></>
    );
};

export default VworldWmsLayers;
