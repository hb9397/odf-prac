'use client';

import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import { createODfBaroEMap } from "../util/odfHandler";
import FeaturePopup from "@/app/components/FeaturePopup";
import ReactDOMServer from "react-dom/server";

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
        console.log(map);
        if (map) {
            setBaroEMap(map);
            const odf = (window as any).odf;

            let marker: any = null;

            (window as any).map = map;

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
                    pointBuffer: 20,
                    extractType: 'cql',
                    cql: `BBOX(the_geom, ${minX}, ${minY}, ${maxX}, ${maxY}, 'EPSG:5186')`
                });

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

                console.log(marker);

                marker.setMap(map);
            })
        }
    }, []);

    return (
        <MapContext.Provider value={{baroEMap}}>
            <div id="mapView" ref={mapRef} style={{height: "80vh"}} className="odf-view"></div>
            {baroEMap && children}
        </MapContext.Provider>
    );
};

export default MapProvider;