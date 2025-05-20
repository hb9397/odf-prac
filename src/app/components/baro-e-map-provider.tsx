'use client';

import React, {createContext, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';

// type BaroEMapContextType = {
//     baroEMap: any | null;
// }

// const BaroEMapContext = createContext<BaroEMapContextType>({baroEMap: null});

// export const useBaroEMap = () => useContext(BaroEMapContext);

const BaroEMapProvider = (/*{children}: {children: React.ReactNode}*/) => {

    const mapRef = useRef<HTMLDivElement | null>(null);
    // const [layerReady, setLayerReady] = useState(false);
    // const [baroEMap, setBaroEMap] = useState<any | null>(null);

    useEffect(() => {
        // layout.tsx 에서 <Script> 로 odf.min.js, <link> 로 odf.css 가져오도록 되어있다.
        const odf = (window as any)?.odf;

        // odf config 초기화 시, api/.../route.ts 로 CORS 우회.
        odf.init('/api/proxy?url=https://developer.geon.kr/odf-config-wavus.json');

        console.log(odf);

        const coord = new odf.Coordinate(199312.9996, 551784.6924);

        const mapOption = {
            center: coord,
            zoom: 15,
            projection: 'EPSG:5186',
            baroEMapURL: 'https://geon-gateway.geon.kr/map/api/map/baroemap',
            baroEMapAirURL: 'https://geon-gateway.geon.kr/map/api/map/ngisair',
            basemap: {
                baroEMap: ['eMapBasic', 'eMapAIR', 'eMapColor', 'eMapWhite'],
            },
        };

        const map = new odf.Map(mapRef.current, mapOption);

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

        console.log(apiLayer);
        // setBaroEMap(map);
        apiLayer.setZIndex(0);

        apiLayer.setMap(map);
        // setLayerReady(true);
    }, []);


    return (
        // <BaroEMapContext.Provider value={{baroEMap}}>
        //     <div id="map" ref={mapRef} style={{height: "100vh"}} className="odf-view"></div>
        //     {/*{baroEMap && children}*/}
        // </BaroEMapContext.Provider>
        <>
            <div id="map" ref={mapRef} style={{height: '100vh'}} className="odf-view"></div>
        </>
    );
};

export default BaroEMapProvider;