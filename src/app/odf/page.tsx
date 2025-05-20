import BaroEMapProvider from "@/app/components/baro-e-map-provider";
import VworldWmsLayers from "@/app/components/vworld-wms-layers";
import GeoserverWmsLayers from "@/app/components/geoserver-wms-layers";

const Page = () => {
    return (

        <BaroEMapProvider>
            <VworldWmsLayers/>
            <GeoserverWmsLayers/>
        </BaroEMapProvider>

    );
};

export default Page;
