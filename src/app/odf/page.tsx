import MapProvider from "@/app/components/MapProvider";
import VworldWmsLayers from "@/app/components/VworldWmsLayers";
import GeoserverLayers from "@/app/components/GeoserverLayers";
import BaseMapWidget from "@/app/components/BaseMapWidget";

const Page = () => {
    return (
        <MapProvider>
            <VworldWmsLayers/>
            <GeoserverLayers/>
            <BaseMapWidget/>
        </MapProvider>

    );
};

export default Page;
