import {geoserverWfsLayerStyle} from "@/lib/odfGeoserverWfsLayerStyleList";

type GeoserverLayerList = {
    [key: string]: { name: string, layer: string, type: string, style: any };
}

export const geoserverLayerList = {
    odfPracY0001Wms : { name: '용산구 관광지', layer: 'odf-prac:Y0001', type: 'wms', style: null },
    F : { name: '용산구 관광지', layer: 'odf-prac:Y0001', type: 'wfs', style: geoserverWfsLayerStyle.YP0001 },
    odfPracY0002Wms : { name: '용산구 관광지(길)', layer: 'odf-prac:Y0002', type: 'wms', style: null,  },
    odfPracY0002Wfs : { name: '용산구 관광지(길)', layer: 'odf-prac:Y0002', type: 'wfs', style: geoserverWfsLayerStyle.YP0002 },
    odfPracY0003Wms : { name: '용산구 지역특화거리', layer: 'odf-prac:Y0003', type: 'wms', style: null },
    odfPracY0003Wfs : { name: '용산구 지역특화거리', layer: 'odf-prac:Y0003', type: 'wfs', style: geoserverWfsLayerStyle.YP0003 },
} as GeoserverLayerList;