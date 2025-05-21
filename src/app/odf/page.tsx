import MapProvider from "@/app/components/map-provider";
import VworldWmsLayers from "@/app/components/vworld-wms-layers";
import GeoserverLayers from "@/app/components/geoserver-layers";

const Page = () => {
    return (

        <MapProvider>
            <VworldWmsLayers/>
            <GeoserverLayers/>
        </MapProvider>

    );
};

export default Page;
