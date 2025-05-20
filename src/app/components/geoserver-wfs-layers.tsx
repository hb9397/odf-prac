/*
'use client';

import React, {useEffect} from 'react';
import {useBaroEMap} from "@/app/components/baro-e-map-provider";

const GeoserverWfsLayers = () => {
    const { baroEMap } = useBaroEMap();

    /!*** geoserver wfs feature 생성 ***!/
    const constructInfoDiv = (list: any, selector: any) => {
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
    };

    /!*** geoserver wms feature 생성중 정보 테이블 생성 ***!/
    const constructFeatureInfoTable = (feature: any, target: any) => {
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
                bodyTd.innerText = (properties[i][1]?properties[i][1]:'-') as string;
                bodyRow.append(bodyTd);
            }
        }

        thead.append(headerRow);
        tbody.append(bodyRow);
        featureTable.append(thead);
        featureTable.append(tbody);
        target.append(featureTable);
    };


    useEffect(() => {
        const odf = (window as any)?.odf;
        // wfs 레이어 생성
        // LayerFactory의 produce 함수는 option이 다양하니 개발자지원센터 '지도문서'를 확인하세요
        const wfsLayer = odf.LayerFactory.produce('geoserver'/!*레이어를 생성하기위 한 테이터 호출 방법*!/, {
            method : 'get',//'post'
            server : 'https://geoserver.geon.kr/geoserver', // 레이어가 발행된 서버 주소
            layer : 'geonpaas:L100000258', // 발행된 레이어 명칭 (ex. 저장소명:레이어명)
            service : 'wfs', // 호출하고자 하는 레이여 형태(wms, wfs, wmts)
            geometryName : "the_geom",
            geometryType : "MultiPolygon",
        });
        wfsLayer.setMap(baroEMap);
        wfsLayer.fit();

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

export default GeoserverWfsLayers;*/
