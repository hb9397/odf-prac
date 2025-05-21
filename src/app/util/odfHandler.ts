/*** DOM 을 파라미터로 받아 DOM 의 HTML 에 접근해 Map 생성 및 렌더링하는 메서드  ***/
/*** TODO : mapOption 도 분리해서 파라미터로 받아 처리 ***/
export const createODfBaroEMap = (container: HTMLElement | null): any =>{
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

    return new odf.Map(container, mapOption);
}

/*** layer 명, layerType(service) 를 파라미터로 받아 geoserver Layer 생성하는 메서드 ***/
export const createGeoserverLayer = (layer: string, type: 'wms'|'wfs') => {
    if (typeof window === "undefined") {
        console.error("window is undefined");
        return;
    }

    if(typeof (window as any).odf === "undefined") {
        console.error("odf is undefined");
        return;
    }

    const odf = (window as any)?.odf;

    return odf.LayerFactory.produce('geoserver', {
        method: 'get',
        server: {
            //url: 'http://121.160.17.39:18080/geoserver',
            url: 'http://localhost:18080/geoserver',
            proxyURL: '/api/proxy',
            proxyParam: 'url',
        },
        layer: layer,
        service: type,
        geometryName: 'the_geom',
        geometryType: 'MultiPolygon',
    });
}

/*** map 객체, layer 객체, on/off 여부를 파라미터로 받아 layer on/off 처리 메서드 ***/
export const toggleLayer = (map: any, layer: any, isChecked: boolean) => {
    if (!map || !layer || typeof layer.getODFId !== 'function'){
        console.error("map or layer is not defined");
        return;
    }

    map.switchLayer(layer?.getODFId?.(), isChecked);
}