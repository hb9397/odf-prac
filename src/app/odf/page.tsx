import MapProvider from "@/app/components/MapProvider";
import VworldWmsLayers from "@/app/components/VworldWmsLayers";
import GeoserverLayers from "@/app/components/GeoserverLayers";
import BaseMapWidget from "@/app/components/BaseMapWidget";
import DrawAndMeasureToolWidget from "@/app/components/DrawAndMeasureToolWidget";

const Page = () => {
    return (

        <MapProvider>
            <VworldWmsLayers/>

            <BaseMapWidget/>

            <GeoserverLayers/>
        </MapProvider>

    );
};

export default Page;
