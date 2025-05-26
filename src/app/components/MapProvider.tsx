'use client';

import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {createDrawTool, createODfBaroEMap, createFeatureInfoPopup,} from "../util/odfHandler";


type MapContext = {
    baroEMap: any | null;
}

const MapContext = createContext<MapContext>({baroEMap: null});

export const useMap = () => useContext(MapContext);

const MapProvider = ({children}: {children: React.ReactNode}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    const [baroEMap, setBaroEMap] = useState<any | null>(null);

    useEffect(() => {
        (window as any).map = createODfBaroEMap(mapRef.current);

        if ((window as any).map) {
            setBaroEMap((window as any).map);
            createDrawTool((window as any).map);
        }
    }, []);

    return (
        <MapContext.Provider value={{baroEMap}}>
            <div id="mapView" ref={mapRef} style={{height: "80vh", position: "relative" }} className="odf-view">{baroEMap && children}</div>
        </MapContext.Provider>
    );
};

export default MapProvider;