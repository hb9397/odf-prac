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


            (window as any).map = map;
            odf.event.addListener(map, 'click', (evt: any) => {
                /*let marker: any = null;
                if(marker && marker.getMap()){
                    marker.removeMap();
                }

                const result = map.selectFeature({
                    pointBuffer: 5,
                    extractType: 'afwe',
                    cql: evt.cql,
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

                marker.setMap(map);*/
                let feature = map.selectFeatureOnClick(evt);
                console.log(feature);
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