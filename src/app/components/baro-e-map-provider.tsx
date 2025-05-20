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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!mapRef.current) return;
        const odf = (window as any)?.odf;
        if (!odf) return;

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
    }, [mounted]);

    return (
        <BaroEMapContext.Provider value={{baroEMap}}>
            <div id="map" ref={mapRef} style={{height: "80vh"}} className="odf-view"></div>
            {baroEMap && children}
        </BaroEMapContext.Provider>
    );
};

export default BaroEMapProvider;