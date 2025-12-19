<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>lt_c_uq111</Name>
    <UserStyle>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill><CssParameter name="fill">#00FFFF</CssParameter></Fill>
            <Stroke><CssParameter name="stroke">#0000FF</CssParameter><CssParameter name="stroke-width">3</CssParameter></Stroke>
          </PolygonSymbolizer>
          <TextSymbolizer>
            <Label><ogc:PropertyName>uname</ogc:PropertyName></Label>
            <Font>
              <CssParameter name="font-family">Malgun Gothic</CssParameter>
              <CssParameter name="font-size">18</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
            </Font>
            <Fill><CssParameter name="fill">#800080</CssParameter></Fill>
            <Halo><Radius>2</Radius><Fill><CssParameter name="fill">#FFFFFF</CssParameter></Fill></Halo>
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
