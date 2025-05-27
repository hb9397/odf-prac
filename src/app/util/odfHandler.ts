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

/*** 레이어 바로가기 클릭 시, layer fit  ***/
export const layerFit = (layer: any) => {
    console.log(layer);
    layer.fit();
}

/*** TODO 현재 너무 많은 행위를 하고 있어 분리 필요 ***/
/*** windows 전역에 map 이란 이름으로 등록된 map 에 피처 클릭 이벤트 리스너 추가해서 피처 속성 조회 팝업 생성 ***/
export const createFeatureInfoPopup = (isSelectFeaturePopupOn: boolean) => {
    if(!isSelectFeaturePopupOn || !hasWindowOdf()) return;

    const odf = (window as any).odf;

    let marker : any = null;
    let markerHighlightGeoJsonLayer : any = null;

    // 여기서 사용하는 map 은 전역변수(window.map)!!!!
    odf.event.addListener(map, 'click', (evt: any) => {

        if(marker && marker.getMap()){
            marker.removeMap();
        }

        if(markerHighlightGeoJsonLayer && markerHighlightGeoJsonLayer.getODFId()){
            map.removeLayer(markerHighlightGeoJsonLayer.getODFId());
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
                    if(markerHighlightGeoJsonLayer){
                        map.removeLayer(markerHighlightGeoJsonLayer.getODFId());
                    }
                    root.unmount(); // React 컴포넌트 언마운트
                    container.remove(); // DOM에서도 제거
                },
            })
        );

        marker = new odf.Marker({
            position: [evt.coordinate[0], evt.coordinate[1]+70],
            style: { element: container },
            draggable: false,
            stopEvent: true,
        });

        marker.setMap(map);

        const featureHighlightX = (filteredResult[0][1] as any)?.features[0]?.getCenterPoint?.()[0];
        const featureHighlightY = (filteredResult[0][1] as any)?.features[0]?.getCenterPoint?.()[1];

        map.setCenter(new odf.Coordinate(featureHighlightX, featureHighlightY))

        /*** 선택한 피쳐 강조를 위한 빈 geojson 레이어 생성 후, 피쳐 및 스타일 적용으로 강조 ***/
        const markerHighlightGeoJson = {
            type: 'FeatureCollection',
            features: [

            ],
            properties : {
                name : 'layer',
            },
        }

        const markerHighlightGeoJsonFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [featureHighlightX, featureHighlightY]
            },
            properties: {
                name: 'Point'
            },
        }

        const markerHighlightFeature = odf.FeatureFactory.fromGeoJson(markerHighlightGeoJsonFeature);

        markerHighlightGeoJsonLayer = odf.LayerFactory.produce('geojson'/*레이어를 생성하기위 한 테이터 호출 방법*/, {
            //geojson형식 object
            data : markerHighlightGeoJson,
            //원본 좌표계
            dataProjectionCode : 'EPSG:5186',
            //변환 좌표계
            featureProjectionCode : 'EPSG:5186'
        });


        markerHighlightGeoJsonLayer.addFeature(markerHighlightFeature);

        const markerHighlightGeoJsonLayerStyleFunc = odf.StyleFactory.produceFunction([
            {
                seperatorFunc: "default",
                style: {
                    image: {
                        circle: {
                            radius: 20,
                            fill: {
                                color: 'transparent'
                            },
                            stroke: {
                                color: '#FF5A00',
                                width: 4,
                            },
                            scale: 1,
                        }
                    }
                },
            },
        ]);

        markerHighlightGeoJsonLayer.setStyle(markerHighlightGeoJsonLayerStyleFunc);
        markerHighlightGeoJsonLayer.setMap(map);
    })
}

export const createDrawTool = (map: any) => {
    if(!hasWindowOdf()) return;

    const odf = (window as any)?.odf;

    /* 그리기 도구 컨트롤 생성 */
    const drawControl = new odf.DrawControl({
        /*
        연속 측정 여부.
         - true : 연속 측정 기능 활성화. ※ 측정 종료는 clean 함수를 통해서 실행
         - false : (기본값) 연속 측정 기능 비활성화.
         */
        continuity : false,

        // 측정 옵션 활성화 여부(선 그리기/원그리기 툴에서 활성화)
        measure : false,

        /**drawControl 생성 시 새 레이어 생성 여부
         - false : 'odf-layer-draw-unique' 라는 id로 생성. drawControl을 여러개 생성해도 레이어를 공유
         - true :  'odf-layer-draw-xxxx' 라는 id로 생성.
         */
        createNewLayer : true,
        // 우클릭 편집 기능(미정의시 사용 안함)
        editFeatureMenu: ['modify', 'dragTranslate', 'delete', 'setText'],
        // 생성할 툴 배열
        // 설정하지 않으면 모든 툴 생성
        tools : [
            'text',//텍스트 그리기 툴
            'polygon',//다각형 그리기 툴
            'lineString',//선 그리기 툴
            'box',//사각형 그리기 툴
            'point',//점 그리기 툴
            'circle',//원 그리기 툴
            'curve',//곡선 그리기 툴
            'buffer',//버퍼 그리기 툴
        ],

        // 툴팁 메세지 변경
        message : {
            DRAWSTART_POINT : '[수정한 메세지]점을 그리기 위해 지도를 클릭해주세요',
            DRAWSTART_LINESTRING : '[수정한 메세지]선을 그리기 위해 지도를 클릭해주세요',
            /* DRAWSTART_POLYGON: '면을 그리기 위해 지도를 클릭해주세요',
            DRAWSTART_CURVE: '곡선을 그리기 위해 지도를 드래그해주세요',
            DRAWSTART_TEXT: '텍스트를 입력하기 위해 지도를 클릭해주세요.',
            DRAWSTART_BUFFER: '버퍼를 생성하기 위해 레이어를 선택해주세요.',
            DRAWSTART_CIRCLE: '원을 그리기 위해 지도를 클릭해주세요.',
            DRAWSTART_BOX: '사각형을 그리기 위해 지도를 클릭해주세요.',
            DRAWEND_DRAG: '드래그를 멈추면 그리기가 종료됩니다.',
            DRAWEND_DBCLICK: '드래그를 멈추면 그리기가 종료됩니다.', */
        },

        // 그리기 도형 스타일
        style : {
            fill : {
                color : [ 254, 243, 255, 0.6 ]
            },
            stroke : {
                color : [ 103, 87, 197, 0.7 ],
                width : 2
            },
            image : {
                circle : {
                    fill : {
                        color : [ 254, 243, 255, 0.6 ]
                    },
                    stroke : {
                        color : [ 103, 87, 197, 0.7 ],
                        width : 2
                    },
                    radius : 5,
                },
            },
            text : {
                textAlign : 'left',
                font : '30px sans-serif',
                fill : {
                    color : [ 103, 87, 197, 1 ]
                },
                stroke : {
                    color : [ 255, 255, 255, 1 ]
                },
            },
        },
        bufferStyle : {
            stroke : {
                color : [ 255, 255, 159, 1 ],
                width : 2
            },
            fill : {
                color : [ 255, 255, 159, 0.2 ],
            },
        }
    });

    drawControl.setMap(map);

    //텍스트 그리기
    //drawControl.drawText();
    //폴리곤 그리기
    //drawControl.drawPolygon();
    //라인 그리기
    //drawControl.drawLineString();
    //점 그리기
    //drawControl.drawPoint();
    //곡선 그리기
    //drawControl.drawCurve();
    //사각형 그리기
    //drawControl.drawBox();
    //원 그리기
    //drawControl.drawCircle();
    //버퍼 그리기
    //drawControl.buffer();


    //그리기 레이어 조회
    const drawLayer = drawControl.findDrawVectorLayer();
    //그리기 인터렉션 삭제 및 그리기 오버레이 삭제, 그리던 도형 삭제
    //drawControl.clear()


    /*그리기 시작시 이벤트*/
    odf.event.addListener(drawControl, 'drawstart', (feature: any) => {
        console.log("drawstart");
    });

    /*그리기 종료시 이벤트*/
    odf.event.addListener(drawControl, 'drawend', (feature: any) => {
        console.log("drawend");
        console.log(drawLayer);
    })

    /*그리기 초기화 컨트롤 생성*/
    const clearControl = new odf.ClearControl();
    clearControl.setMap(map);
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

    if(typeof (window as any)?.odf === "undefined") {
        console.error("odf is undefined");
        return result;
    }

    result = true;

    return result;
}

