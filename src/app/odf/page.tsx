'use client';

import {useEffect, useRef} from "react";

const Page = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // layout.tsx 에서 <Script> 로 odf.min.js, <link> 로 odf.css 가져오도록 되어있다.
        const odf = (window as any)?.odf;

        // odf config 초기화 시, api/.../route.ts 로 CORS 우회.
        odf.init('/api/odf-config');

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

        map.getView().setMinZoom(8);
        map.getView().setMaxZoom(23);
    }, []);

    return (
        <>
            <div id="map" ref={mapRef} style={{height: "100vh"}} className="odf-view"></div>;
        </>
    );
};

export default Page;
