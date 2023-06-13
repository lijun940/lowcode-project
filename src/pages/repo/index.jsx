import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import * as AlifdFusionUi from '@alifd/fusion-ui'
import appHelper from './appHelper';

console.log(AlifdFusionUi, 'AlifdFusionUi^^^^^')
window.AlifdFusionUi = AlifdFusionUi
const getPackagesFromLocalStorage = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}



const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const packages = getPackagesFromLocalStorage('general:packages');
    const projectSchema = getPackagesFromLocalStorage('general:projectSchema');
    const {
      componentsMap: componentsMapArray,
      componentsTree,

    } = projectSchema;
    const componentsMap = {};
    componentsMapArray.forEach((component) => {
      componentsMap[component.componentName] = component;
    });
    const pageSchema = componentsTree[0];
    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      // eslint-disable-next-line no-underscore-dangle
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));
    setData({
      schema: pageSchema,
      components,

    });

  }
  const { schema, components} = data;
  if (!schema || !components) {
    init();
  }



  return (
    <div className="lowcode-plugin-sample-preview">
      <div>11111111111111111</div>
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={{
          ...schema,

        }}
        components={components}
        appHelper={appHelper}

      />
    </div>
  );
};
// ReactDOM.render(<SamplePreview />, document.getElementById('app'));
class $$Page2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <SamplePreview
     
    />
  }
}
export default $$Page2;
