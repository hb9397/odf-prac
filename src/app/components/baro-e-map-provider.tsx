'use client';

import React, {createContext, useContext, useEffect, useRef, useState} from 'react';

type BaroEMapContextType = {
    baroEMap: any | null;
}

const BaroEMapContext = createContext<BaroEMapContextType>({baroEMap: null});

export const useBaroEMap = () => useContext(BaroEMapContext);

const BaroEMapProvider = ({children}: {children: React.ReactNode}) => {

    const mapRef = useRef<HTMLDivElement | null>(null);

    const [baroEMap, setBaroEMap] = useState<any | null>(null);

    /*function constructFeatureInfoTable(feature: any, target: any) {

        var featureTable = document.createElement('table');
        var properties = Object.entries(feature.getProperties());
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var headerRow = document.createElement('tr');
        var bodyRow = document.createElement('tr');

        for (var i = 0; i < properties.length; i++) {
            if(properties[i][0]!=='geometry'){
                var headerTd =  document.createElement('td');
                headerTd.innerText = properties[i][0];
                headerRow.append(headerTd);

                var bodyTd = document.createElement('td');
                bodyTd.innerText = properties[i][1]?properties[i][1]:'-';
                bodyRow.append(bodyTd);
            }
        }

        thead.append(headerRow);
        tbody.append(bodyRow);
        featureTable.append(thead);
        featureTable.append(tbody);
        target.append(featureTable);
    }*/

    useEffect(() => {
        // layout.tsx 에서 <Script> 로 odf.min.js, <link> 로 odf.css 가져오도록 되어있다.
        const odf = (window as any)?.odf;

        // odf config 초기화 시, api/.../route.ts 로 CORS 우회.
        odf.init('/api/proxy?url=https://developer.geon.kr/odf-config-wavus.json');

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
        setBaroEMap(map);
    }, []);


    return (
        <BaroEMapContext.Provider value={{baroEMap}}>
            <div id="map" ref={mapRef} style={{height: "100vh"}} className="odf-view"></div>
            {baroEMap && children}
        </BaroEMapContext.Provider>
    );
};

export default BaroEMapProvider;