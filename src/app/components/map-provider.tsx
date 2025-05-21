'use client';

import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import { createODfBaroEMap } from "../util/odfHandler";

type MapContext = {
    baroEMap: any | null;
}

const MapContext = createContext<MapContext>({baroEMap: null});

export const useMap = () => useContext(MapContext);

const MapProvider = ({children}: {children: React.ReactNode}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [baroEMap, setBaroEMap] = useState<any | null>(null);

    useEffect(() => {
        const map = createODfBaroEMap(mapRef.current);
        if (map) {
            setBaroEMap(map);
        }
    }, []);

    return (
        <MapContext.Provider value={{baroEMap}}>
            <div id="map" ref={mapRef} style={{height: "80vh"}} className="odf-view"></div>
            {baroEMap && children}
        </MapContext.Provider>
    );
};

export default MapProvider;