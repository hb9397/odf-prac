type GeoserverLayerList = {
    [key: string]: { name: string, layer: string };
}

export const geoserverLayerList = {
    odfPracYp0001 : {name: '용산구 관광지', layer: 'odf-prac:yp0001' },
    odfPracYp0002 : {name: '용산구 관광지(길)', layer: 'odf-prac:yp0002' },
    odfPracYp0003 : {name: '용산구 지역특화거리', layer: 'odf-prac:yp0003' },
} as GeoserverLayerList;