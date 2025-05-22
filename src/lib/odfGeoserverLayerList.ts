type GeoserverLayerList = {
    [key: string]: { name: string, layer: string };
}

export const geoserverLayerList = {
    odfPracY0001 : {name: '용산구 관광지', layer: 'odf-prac:Y0001' },
    odfPracY0002 : {name: '용산구 관광지(길)', layer: 'odf-prac:Y0002' },
    odfPracY0003 : {name: '용산구 지역특화거리', layer: 'odf-prac:Y0003' },
} as GeoserverLayerList;