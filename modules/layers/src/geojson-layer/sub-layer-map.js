import IconLayer from '../icon-layer/icon-layer';
import ScatterplotLayer from '../scatterplot-layer/scatterplot-layer';
import TextLayer from '../text-layer/text-layer';
import PathLayer from '../path-layer/path-layer';
import SolidPolygonLayer from '../solid-polygon-layer/solid-polygon-layer';

export const POINT_LAYER = {
  circle: {
    type: ScatterplotLayer,
    props: {
      filled: 'filled',
      stroked: 'stroked',

      lineWidthMaxPixels: 'lineWidthMaxPixels',
      lineWidthMinPixels: 'lineWidthMinPixels',
      lineWidthScale: 'lineWidthScale',
      lineWidthUnits: 'lineWidthUnits',
      pointRadiusMaxPixels: 'radiusMaxPixels',
      pointRadiusMinPixels: 'radiusMinPixels',
      pointRadiusScale: 'radiusScale',
      pointRadiusUnits: 'radiusUnits',

      getFillColor: 'getFillColor',
      getLineColor: 'getLineColor',
      getLineWidth: 'getLineWidth',
      getPointRadius: 'getRadius'
    }
  },
  icon: {
    type: IconLayer,
    props: {
      iconAtlas: 'iconAtlas',
      iconMapping: 'iconMapping',

      iconSizeMaxPixels: 'sizeMaxPixels',
      iconSizeMinPixels: 'sizeMinPixels',
      iconSizeScale: 'sizeScale',
      iconSizeUnits: 'sizeUnits',

      getIcon: 'getIcon',
      getIconAngle: 'getAngle',
      getIconColor: 'getColor',
      getIconPixelOffset: 'getPixelOffset',
      getIconSize: 'getSize'
    }
  },
  text: {
    type: TextLayer,
    props: {
      textSizeMaxPixels: 'sizeMaxPixels',
      textSizeMinPixels: 'sizeMinPixels',
      textSizeScale: 'sizeScale',
      textSizeUnits: 'sizeUnits',

      textBackground: 'background',
      textBackgroundPadding: 'backgroundPadding',
      textFontFamily: 'fontFamily',
      textFontWeight: 'fontWeight',
      textLineHeight: 'lineHeight',
      textMaxWidth: 'maxWidth',
      textOutlineColor: 'outlineColor',
      textOutlineWidth: 'outlineWidth',
      textWordBreak: 'wordBreak',

      getText: 'getText',
      getTextAngle: 'getAngle',
      getTextColor: 'getColor',
      getTextPixelOffset: 'getPixelOffset',
      getTextSize: 'getSize',
      getTextAnchor: 'getTextAnchor',
      getTextAlignmentBaseline: 'getAlignmentBaseline',
      getTextBackgroundColor: 'getBackgroundColor',
      getTextBorderColor: 'getBorderColor',
      getTextBorderWidth: 'getBorderWidth'
    }
  }
};

export const LINE_LAYER = {
  type: PathLayer,
  props: {
    lineWidthUnits: 'widthUnits',
    lineWidthScale: 'widthScale',
    lineWidthMinPixels: 'widthMinPixels',
    lineWidthMaxPixels: 'widthMaxPixels',
    lineJointRounded: 'jointRounded',
    lineCapRounded: 'capRounded',
    lineMiterLimit: 'miterLimit',

    getLineColor: 'getColor',
    getLineWidth: 'getWidth'
  }
};

export const POLYGON_LAYER = {
  type: SolidPolygonLayer,
  props: {
    extruded: 'extruded',
    filled: 'filled',
    wireframe: 'wireframe',
    elevationScale: 'elevationScale',
    material: 'material',

    getElevation: 'getElevation',
    getFillColor: 'getFillColor',
    getLineColor: 'getLineColor'
  }
};

export function getDefaultProps({type, props}) {
  const result = {};
  for (const key in props) {
    result[key] = type.defaultProps[props[key]];
  }
  return result;
}

export function forwardProps(layer, mapping) {
  const {transitions, updateTriggers} = layer.props;
  const result = {
    updateTriggers: {},
    transitions: transitions && {
      getPosition: transitions.geometry
    }
  };

  for (const sourceKey in mapping) {
    const targetKey = mapping[sourceKey];
    let value = layer.props[sourceKey];
    if (sourceKey.startsWith('get')) {
      // isAccessor
      value = layer.getSubLayerAccessor(value);
      result.updateTriggers[targetKey] = updateTriggers[sourceKey];
      if (transitions) {
        result.transitions[targetKey] = transitions[sourceKey];
      }
    }
    result[targetKey] = value;
  }
  return result;
}
