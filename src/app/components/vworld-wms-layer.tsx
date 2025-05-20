/*
'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useBaroEMap} from "@/app/components/baro-e-map-provider";

const VworldWmsLayer = () => {
    const { baroEMap } = useBaroEMap();

    /!*const layerList = {
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
    const [currentLayersStyles, setCurrentLayersStyles] = useState(``);*!/

    useEffect(()=> {
        if (!baroEMap || !(window as any)?.odf) return;

        const odf = (window as any).odf;

        const apiLayer = odf.LayerFactory.produce('api', {
            server:{
                url:'http://api.vworld.kr/req/wms',
                proxyURL : '/api/proxy',
                proxyParam : 'url',
            } , // API 주소
            //server : 'http://api.vworld.kr/req/wms',// API 주소
            service: 'wms', // wms/wfs
            layers: 'lt_c_adsigg,lt_c_ademd', //하나 또는 쉼표(,)로 분리된 지도레이어 목록, 최대 4개  ※https://www.vworld.kr/dev/v4dv_wmsguide2_s001.do 에서 사용가능한 레이어 목록 확인 가능
            styles: 'lt_c_adsigg,lt_c_ademd', //LAYERS와 1대1 관계의 하나 또는 쉼표(,)로 분리된 스타일 목록
            //version : '1.3.0',//요청 서비스 버전
            crs : 'EPSG:5186',//응답결과 좌표계와 bbox 파라미터의 좌표계
            //transparent : 'true',//지도 배경의 투명도 여부
            //bgcolor:'0xFFFFFF',//배경색
            //exceptions:'text/xml',
            originalOption : {//odf에서 제공해주는 기본 파라미터 적용 여부
                //SERVICE : true,//(기본값 true)
                //REQUEST : true, //(기본값 true)
                //WIDTH : true,//(기본값 true)
                //HEIGHT : true,//(기본값 true)
                BBOX : '{{miny}},{{minx}},{{maxy}},{{maxx}}',
                /!* ★BBOX★
                  odf에서 기본 제공하는 bbox 배열은 minx,miny,maxx,maxy 순인 반면에
                  vworld에서는 EPSG:4326/EPSG:5186/EPSG:5187일 경우 bbox 배열을 miny,minx, maxy,maxx 순으로 입력받음
                  해당 경우에는 BBOX 값을 '{{miny}},{{minx}},{{maxy}},{{maxx}}' 와같이 입력하면 x와 y의 순서가 바뀌어 적용됨.
                *!/
                //FORMAT : true,//(기본값 false)
                //TRANSPARENT : true,//(기본값 false)
                //STYLES : true,//(기본값 false)
                //CRS : false,//(기본값 false)
                //VERSION : false,//(기본값 false)
            },
            /!* 직접해보기에서 api 를 실행할 때는 아래 domain 값 부분을 주석처리해야 api 가 정상 동작합니다. *!/
            domain:'www.odfPrac.com',//API KEY를 발급받을때 입력했던 URL
            key : 'E60166A5-2C82-3F6C-883A-2907F2A83239',//발급받은 api key
        });

        apiLayer.setMap(baroEMap);
    },[]);

    return (
        <></>
    );
};

export default VworldWmsLayer;*/
