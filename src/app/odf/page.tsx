import MapProvider from "@/app/components/MapProvider";
import VworldWmsLayers from "@/app/components/VworldWmsLayers";
import GeoserverLayers from "@/app/components/GeoserverLayers";

const Page = () => {
    return (

        <MapProvider>
            <VworldWmsLayers/>
            <GeoserverLayers/>
        </MapProvider>

    );
};

export default Page;
