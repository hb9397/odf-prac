import FeaturePopup from '../components/FeaturePopup';
import React from "react";
import ReactDOM from 'react-dom/client'

/*** TODO createODfBaroEMap mapOption 도 분리해서 파라미터로 받아 처리 ***/
/*** TODO URL 분리해서 상수로 관리 ***/
/*** TODO setWfsLayerStyle 메서드 Object.keys() 안쓰는 구조로 ***/


/*** DOM 을 파라미터로 받아 DOM 의 HTML 에 접근해 Map 생성 및 렌더링하는 메서드  ***/
export const createODfBaroEMap = (container: HTMLDivElement | null): any =>{

    if(!hasWindowOdf()) return;

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

    return new odf.Map(container, mapOption);
}

/*** layer 명, layerType(service) 를 파라미터로 받아 geoserver Layer 생성하는 메서드 ***/
export const createGeoserverLayer = (layerInfo: any) => {

    if(!hasWindowOdf()) return;

    if(!(layerInfo?.type === "wms" || layerInfo?.type === "wfs")) {
        console.error("type is wrong");
        return;
    }

    const odf = (window as any)?.odf;

    const geoserverLayer = odf.LayerFactory.produce('geoserver', {
        method: 'get',
        server: {
            url: 'http://121.160.17.39:18080/geoserver',
            // url: 'http://localhost:18080/geoserver',
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
    if (typeof map === 'undefined' || typeof layer.getODFId === 'undefined') {
        console.error("map or layer is not defined");
        return;
    }

    map.switchLayer(layer?.getODFId?.(), isChecked);
}

/*** layer 객체, 투명도 N% 를 파라미터로 받아 layer 에서는 0 ~ 1로 얼마나 보여줄지에 대해 처리 ***/
export const setOpacityLayer = (layer: any, transparent: string) => {
    if (typeof layer === "undefined" || !(Number(transparent) >= 0 && Number(transparent) <= 100)) {
        console.error("layer is not defined or opacity is wrong");
        return;
    }

    const opacity = 1 - (Number(transparent) / 100);

    layer.setOpacity(opacity);
}

/*** windows 전역에 map 이란 이름으로 등록된 map 에 피처 클릭 이벤트 리스너 추가해서 피처 속성 조회 팝업 생성 ***/
export const setFeaturePopup = () => {
    if(!hasWindowOdf()) return;

    const odf = (window as any).odf;

    let marker : any = null;

    // 여기서 사용하는 map 은 전역변수(window.map)!!!!
    odf.event.addListener(map, 'click', (evt: any) => {

        if(marker && marker.getMap()){
            marker.removeMap();
        }

        const x = evt.coordinate[0];
        const y = evt.coordinate[1];

        const buffer = 20;
        const minX = x - buffer;
        const maxX = x + buffer;
        const minY = y - buffer;
        const maxY = y + buffer;

        const result = map.selectFeature({
            pointBuffer:30,
            extractType: 'cql',
            cql: `BBOX(the_geom, ${minX}, ${minY}, ${maxX}, ${maxY}, 'EPSG:5186')`
        });


        const filteredResult = Object.entries(result).filter(([_, v]: any) => v.features.length > 0);

        if (filteredResult.length === 0) return;

        const properties = (filteredResult[0][1] as any).features[0].getProperties();

        const container = document.createElement('div');

        document.body.appendChild(container); // marker 내에만 넣으면 detach될 수 있으니 일단 보존

        const root = ReactDOM.createRoot(container);

        root.render(
            React.createElement(FeaturePopup, {
                properties,
                onClose: () => {
                    if (marker) {
                        marker.removeMap();
                        marker = null;
                    }
                    root.unmount(); // React 컴포넌트 언마운트
                    container.remove(); // DOM에서도 제거
                },
            })
        );

        marker = new odf.Marker({
            position: evt.coordinate,
            style: { element: container },
            draggable: false,
            stopEvent: true,
        });

        marker.setMap(map);
        map.setCenter(new odf.Coordinate(x, y))
    })
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


/*** window.odf 접근 가능 유효성 검증 ***/
const hasWindowOdf = () => {

    let result: boolean = false;

    if (typeof window === "undefined") {
        console.error("window is undefined");
        return result;
    }

    if(typeof (window as any).odf === "undefined") {
        console.error("odf is undefined");
        return result;
    }

    result = true;

    return result;
}

