"use client";

import React, {useEffect, useState} from 'react';
import {useBaroEMap} from "@/app/components/baro-e-map-provider";

const GeoserverLayers = () => {
    const { baroEMap } = useBaroEMap();

    const [layerType, setLayerType] = useState<string>('wms');

    /*** geoserver wms feature 생성 ***/
    const constructInfoDiv = (list: any, selector: any) => {
        selector = document.getElementById(selector);
        selector.innerHTML = '';

        for (let i = 0; i < list.length; i++) {
            const [layerId, layerItem] = list[i];
            const layerDiv = document.createElement('div');
            const layerTitle = document.createElement('h5');
            layerTitle.classList.add('title');
            layerTitle.innerHTML = layerId;
            layerDiv.append(layerTitle);

            const featureLen = layerItem.features.length;

            for (let j = 0; j < featureLen; j++) {
                const featureDiv = document.createElement('div');
                const featureTitle = document.createElement('h6');
                featureTitle.classList.add('title');
                featureTitle.innerHTML = `도형-${j + 1}`;
                featureDiv.append(featureTitle);

                constructFeatureInfoTable(layerItem.features[j], featureDiv);

                layerDiv.append(featureDiv);
            }
            selector.append(layerDiv);
        }
    };

    /*** geoserver wms feature 생성중 정보 테이블 생성 ***/
    const constructFeatureInfoTable = (feature: any, target: any) => {
        const featureTable = document.createElement('table');
        const properties = Object.entries(feature.getProperties());
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const bodyRow = document.createElement('tr');

        for (let i = 0; i < properties.length; i++) {
            if (properties[i][0] !== 'geometry') {
                const headerTd = document.createElement('td');
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
    };


    useEffect(() => {
        const odf = (window as any)?.odf;
        // wms/wfs 레이어 생성
        const geoserverLayer = odf.LayerFactory.produce('geoserver', {
            method : 'get',
            /*
            server:{
                url:'http://localhost:18080/geoserver',
                proxyURL : '/api/proxy',
                proxyParam : 'url',
            },
            layer : 'odf-prac:yongsan-poi-gis',
            service : 'wms',
            */
            server:{
                url:'https://geoserver.geon.kr/geoserver',
                proxyURL : '/api/proxy',
                proxyParam : 'url',
            },
            layer : 'geonpaas:L100000258',
            service : layerType,
            geometryName : 'the_geom',
            geometryType : 'MultiPolygon',
        });
        geoserverLayer.setMap(baroEMap);
        geoserverLayer.fit();

        // 피처 속성 조회
        odf.event.addListener(baroEMap, 'click', (evt: any) => {
            const result = baroEMap.selectFeature({
                extractType: 'pixel',
                pixel: evt.pixel
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

        });

    }, [baroEMap, layerType]);

    return (
        <div className="infoArea" style={{marginTop: 15}}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
            <div id="featureInfo"><button onClick={()=>{(layerType === "wms" ? setLayerType("wfs"): setLayerType("wms"))}}>테스트</button></div>
        </div>
    );
};

export default GeoserverLayers;