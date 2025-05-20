"use client";

import React, {useEffect} from 'react';
import {useBaroEMap} from "@/app/components/baro-e-map-provider";

const GeoserverWmsLayers = () => {
    const { baroEMap } = useBaroEMap();

    function constructInfoDiv(list: any, selector: any) {
        selector = document.getElementById(selector)
        selector.innerHTML = '';

        for (let i = 0; i < list.length; i++) {
            const [layerId, layerItem] = list[i];
            const layerDiv = document.createElement('div');
            const layerTitle = document.createElement('h5');
            layerTitle.classList.add('title')
            layerTitle.innerHTML = layerId;
            layerDiv.append(layerTitle);

            const featureLen = layerItem.features.length;

            for (let j = 0; j < featureLen; j++) {
                const featureDiv = document.createElement('div');
                const featureTitle = document.createElement('h6');
                featureTitle.classList.add('title')
                featureTitle.innerHTML = `도형-${j + 1}`;
                featureDiv.append(featureTitle);

                constructFeatureInfoTable(layerItem.features[j],featureDiv)

                layerDiv.append(featureDiv);
            }

            selector.append(layerDiv);
        }

    }

    function constructFeatureInfoTable(feature: any, target: any) {

        const featureTable = document.createElement('table');
        const properties = Object.entries(feature.getProperties());
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const bodyRow = document.createElement('tr');

        for (let i = 0; i < properties.length; i++) {
            if(properties[i][0]!=='geometry'){
                const headerTd =  document.createElement('td');
                headerTd.innerText = properties[i][0];
                headerRow.append(headerTd);

                const bodyTd = document.createElement('td');
                bodyTd.innerText = (properties[i][1] ? properties[i][1] : '-') as string;
                bodyRow.append(bodyTd);
            }
        }

        thead.append(headerRow);
        tbody.append(bodyRow);
        featureTable.append(thead);
        featureTable.append(tbody);
        target.append(featureTable);

    }

    useEffect(() => {
        const odf = (window as any)?.odf;

        // wms 레이어 생성
        // LayerFactory의 produce 함수는 option이 다양하니 개발자지원센터 '지도문서'를 확인하세요
        const wmsLayer = odf.LayerFactory.produce('geoserver'/*레이어를 생성하기위 한 테이터 호출 방법*/, {
            method : 'get',//'post'
            server:{
                url:'https://geoserver.geon.kr/geoserver',
                proxyURL : '/api/proxy',
                proxyParam : 'url',
            },
            layer : 'geonpaas:L100000254', // 발행된 레이어 명칭 (ex. 저장소명:레이어명)
            service : 'wms', // 호출하고자 하는 레이여 형태(wms, wfs, wmts)
            //타일링 적용 여부 기본값 false
            //tiled : false,
            //geometryName, geometryType 정의시 DescribeFeatureType 요청 비활성화됨. 필수x
            geometryName : 'the_geom',
            geometryType : 'MultiPolygon',
            /*//서버에 요청시 사용하는 파라미터 편집(추가/삭제/수정)을 위한 필터
            // getMap,GetCapabilities, GetStyles, DescribeFeatureType, DescribeFeatureType 요청에 사용
            parameterFilter : (parameters)=>{
                return {
                    ...parameters,
                    newParam : 'newnew',
                };
            }*/
        }/*레이어 생성을 위한 옵션*/);
        wmsLayer.setMap(baroEMap);
        // 해당 layer가 한눈에 보이는 보여주는 extent로 화면 위치 이동 및 줌 레벨 변경
        wmsLayer.fit();

        // 레이어 삭제
        // map.removeLayer(wmsLayer.getODFId());

        /**
         // 레이어 필터
         wmsLayer.defineQuery({
         //"[[컬럼명]]"[[부호]]'[[비교 대상 값]]'
         condition : `"DGM_NM"='대학'`
         });
         */

        // 레이어 on/off
        // map.switchLayer(wmsLayer.getODFId()/*odf id*/, false/*on/off여부*/);

        // 레이어 z-index 조절
        // map.setZIndex(wmsLayer.getODFId(), 0);

        // 레이어 가시범위 설정
        // wmsLayer.setMinZoom(10);
        // wmsLayer.setMaxResolution(152.70292183870401);
        // wmsLayer.setMaxZoom(18);
        // wmsLayer.setMinResolution(0.5964957884324376);

        // 레이어 투명도 조절
        // wmsLayer.setOpacity(0.5);

        /*
        //레이어에 스타일(sld) 적용
        var sld = odf.StyleFactory.produceSLD({
            rules : [ {
                // 룰 이름
                name : 'default style',
                symbolizers : [
                    {
                        kind : 'Fill',
                        // 채우기색
                        color : '#AAAAAA',
                        // 채우기 투명도 0~1
                        fillOpacity : 0.5,
                        // 윤곽선색
                        outlineColor : '#338866',
                        // 윤곽선 두께
                        outlineWidth : 1,
                    },
                    {
                        kind : 'Text',
                        // 글자 색상
                        color : '#AAFF00',
                        // 라벨 텍스트. {{칼럼명}} => 해당 칼럼 값
                        label : '{{LCLAS_CL}}',
                        // 라벨 크기
                        size : 15,
                    },
                ]
            }]
        });

        //sld 적용
        wmsLayer.setSLD(sld);
        */

        // 피처 속성 조회
        odf.event.addListener(baroEMap, 'click', function (event: any) {
            const result = baroEMap.selectFeature({
                extractType: 'pixel',
                pixel: event.pixel
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const filteredResult = Object.entries(result).filter(([_, value]) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return value.features.length > 0;
            })
            constructInfoDiv(filteredResult, 'featureInfo');

            //iframe 크기 조절
            const parentWindow = parent.window as any;

            if (parentWindow.containerResize) {
                parentWindow.containerResize();
            }

        }.bind(this));

    }, [baroEMap]);

    return (
        <div className="infoArea" style={{marginTop: 15}}>
            <div id="featureInfo"></div>
        </div>
    );
};

export default GeoserverWmsLayers;