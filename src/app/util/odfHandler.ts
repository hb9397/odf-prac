import ReactDOMServer from 'react-dom/server';
import FeaturePopup from '../components/FeaturePopup';
import React from "react";

/*** TODO createODfBaroEMap mapOption 도 분리해서 파라미터로 받아 처리 ***/
/*** TODO URL 분리해서 상수로 관리 ***/
/*** TODO setWfsLayerStyle 메서드 Object.keys() 안쓰는 구조로 ***/



/*** DOM 을 파라미터로 받아 DOM 의 HTML 에 접근해 Map 생성 및 렌더링하는 메서드  ***/
export const createODfBaroEMap = (container: HTMLDivElement | null): any =>{
    if (typeof window === "undefined") {
        console.error("window is undefined");
        return;
    }

    if(typeof (window as any).odf === "undefined") {
        console.error("odf is undefined");
        return;
    }

    const odf = (window as any).odf;

    odf.init('/api/proxy?url=https://developer.geon.kr/odf-config-wavus.json');

    const coord = new odf.Coordinate(198157.209, 548203.934);

    const mapOption = {
        center: coord,
        zoom: 14,
        projection: 'EPSG:5186',
        baroEMapURL: 'https://geon-gateway.geon.kr/map/api/map/baroemap',
        baroEMapAirURL: 'https://geon-gateway.geon.kr/map/api/map/ngisair',
        basemap: {
            baroEMap: ['eMapBasic', 'eMapAIR', 'eMapColor', 'eMapWhite'],
        },
    };

    const stateMap = new odf.Map(container, mapOption);

    /*** map 생성시, Feature Marker 추가 ***/
    // let marker: any = null;

    /*** map 클릭 시, 해당 위치 feature 조회 이벤트 리스너 추가 ***/
    /*odf.event.addListener(map, 'click', (evt: any) => {

        if(marker && marker.getMap()){
            marker.removeMap();
        }

        const result = map.selectFeature({
            pointBuffer: 20,
            extractType: 'pixel',
            pixel: evt.pixel
        });

        console.log(result);

        const filteredResult = Object.entries(result).filter(([_, v]: any) => v.features.length > 0);

        if (filteredResult.length === 0) return;

        const properties = (filteredResult[0][1] as any).features[0].getProperties();
        const featurePopup = React.createElement(FeaturePopup, { properties });
        const htmlString = ReactDOMServer.renderToString(featurePopup);

        const container = document.createElement('div');
        container.innerHTML = htmlString;

        marker = new odf.Marker({
            position: evt.coordinate,
            style: { element: container },
            draggable: false,
            stopEvent: true,
        });

        marker.setMap(map);
    })*/

    return stateMap
}

/*** layer 명, layerType(service) 를 파라미터로 받아 geoserver Layer 생성하는 메서드 ***/
export const createGeoserverLayer = (layerInfo: any) => {
    if (typeof window === "undefined") {
        console.error("window is undefined");
        return;
    }

    if(typeof (window as any).odf === "undefined") {
        console.error("odf is undefined");
        return;
    }

    if(!(layerInfo?.type === "wms" || layerInfo?.type === "wfs")) {
        console.error("type is wrong");
        return;
    }

    const odf = (window as any)?.odf;

    const geoserverLayer = odf.LayerFactory.produce('geoserver', {
        method: 'get',
        server: {
            url: 'http://121.160.17.39:18080/geoserver',
            //url: 'http://localhost:18080/geoserver',
            proxyURL: '/api/proxy',
            proxyParam: 'url',
        },
        layer: layerInfo?.layer,
        service: layerInfo?.type,
        geometryName: 'the_geom',
        geometryType: 'MultiPolygon',
    })

    /*** Geoserver Wfs 레이어 스타일 생성하는 부분 추가 ***/
    if(layerInfo?.type === "wfs"){
        setWfsLayerStyle(odf, geoserverLayer, layerInfo.style);
    }

    return geoserverLayer;
}

/*** map 객체, layer 객체, on/off 여부를 파라미터로 받아 layer on/off 처리 메서드 ***/
export const toggleLayer = (map: any, layer: any, isChecked: boolean) => {
    if (!map || !layer || typeof layer.getODFId !== 'function'){
        console.error("map or layer is not defined");
        return;
    }

    map.switchLayer(layer?.getODFId?.(), isChecked);
}

/*** layer 객체, 투명도 N% 를 파라미터로 받아 layer 에서는 0 ~ 1로 얼마나 보여줄지에 대해 처리 ***/
export const setOpacityLayer = (layer: any, transparent: string) => {
    if (!layer || !(Number(transparent) >= 0 && Number(transparent) <= 100)) {
        console.error("layer is not defined or opacity is wrong");
        return;
    }

    const opacity = 1 - (Number(transparent) / 100);

    layer.setOpacity(opacity);
}

/*** Geoserver Wfs 레이어 스타일(심볼, 라벨) 생성 및 setter 하는 부분 추가 ***/
const setWfsLayerStyle = (odf: any, wfsLayer: any, wfsLayerStyle: any) => {
    const wfsLayerStyleFunc = odf.StyleFactory.produceFunction([
        {
            seperatorFunc: "default",
            style: wfsLayerStyle,
            callbackFunc: (style: any, feature: any) => {
                const featureKeys = Object.keys(feature.getProperties())
                const labelKey = featureKeys[1]
                style.getText().setText(feature.getProperties()[labelKey] + "");
            },
        },
    ]);
    wfsLayer.setStyle(wfsLayerStyleFunc);
};