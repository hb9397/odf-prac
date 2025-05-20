import BaroEMapProvider from "@/app/components/baro-e-map-provider";
import VworldWmsLayers from "@/app/components/vworld-wms-layers";
import GeoserverLayers from "@/app/components/geoserver-layers";

const Page = () => {
    return (

        <BaroEMapProvider>
            <VworldWmsLayers/>
            <GeoserverLayers/>
        </BaroEMapProvider>

    );
};

export default Page;
