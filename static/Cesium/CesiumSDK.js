/*
 * @Date: 2019-11-01 21:31:09
 */
(function() {
  "use strict";

  // 设置静态资源目录
  // buildModuleUrl.setBaseUrl('../Cesium/');

  // 需要进行可视化的数据源的集合
  const cesium_config = {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url:
        "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
    }),
    animation: false, // 是否显示动画控件
    shouldAnimate: true,
    homeButton: false, // 是否显示Home按钮
    fullscreenButton: false, // 是否显示全屏按钮
    baseLayerPicker: true, // 是否显示图层选择控件
    geocoder: false, // 是否显示地名查找控件
    timeline: false, // 是否显示时间线控件
    sceneModePicker: true, // 是否显示投影方式控件
    navigationHelpButton: false, // 是否显示帮助信息控件
    infoBox: false, // 是否显示点击要素之后显示的信息
    requestRenderMode: true, // 启用请求渲染模式
    scene3DOnly: false, // 每个几何实例将只能以3D渲染以节省GPU内存
    sceneMode: 3 // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    //fullscreenElement: document.body // 全屏时渲染的HTML元素
  };
  const cesiumViewer = new Cesium.Viewer("cesiumContainer", cesium_config);

  // 去除版权信息
  cesiumViewer._cesiumWidget._creditContainer.style.display = "none";

  // Cesium3DTileset用来实现大范围的模型场景数据的加载应用
  // 三维倾斜模型、人工建模、BIM模型等等，都可以转换成3DTiles
  const tileset = cesiumViewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: "./static/Cesium/Assets/approximateTerrainHeights.json", // 数据路径
      // url: "/cesium/",
      dynamicScreenSpaceError: true,
      cullWithChildrenBounds: false,
      // 当skipLevelOfDetail为true，是一个常量，用于定义加载切片时要跳过的最小级别数。
      skipLevels: 0,
      maximumScreenSpaceError: 0 // 最大的屏幕空间误差
      // maximumNumberOfLoadedTiles: 1000,  //最大加载瓦片个数
    })
  );
  cesiumViewer.zoomTo(tileset);
})();
