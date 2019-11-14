<template>
  <el-container class="home-main">
    <el-aside class="left-side">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航一
          </template>
          <el-menu-item-group>
            <template slot="title">一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>导航二
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>导航三
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>
        <div id="testDOM" class="chart-container">www</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$charts.init(document.getElementById("testDOM"));

    // $chart.line1('testDOM');
    // 绘制图表
    let option = {
      title: {
        text: "保有储量变化图",
        subtext: "一次能源"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["煤", "石油", "天然气"]
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ["line", "bar"]
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017"
          ],
          splitNumber: 10
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "煤",
          type: "bar",
          data: [
            1683.47,
            1654.23,
            1640.12,
            1641.6,
            1639.68,
            1642.7,
            1610.41,
            1639.45,
            1722.2
          ],
          markPoint: {
            data: [
              {
                type: "max",
                name: "最大值"
              },
              {
                type: "min",
                name: "最小值"
              }
            ]
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "平均值"
              }
            ]
          }
        },
        {
          name: "石油",
          type: "bar",
          data: [
            22490.2,
            24947.67,
            29844.34,
            31397.94,
            33713,
            36300.8,
            38445.3,
            38375.6,
            38158.7
          ],
          markPoint: {
            data: [
              {
                type: "max",
                name: "最大值"
              },
              {
                type: "min",
                name: "最小值"
              }
            ]
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "平均值"
              }
            ]
          }
        },
        {
          name: "天然气",
          type: "bar",
          data: [
            5502.54,
            5628.11,
            5478,
            6376.26,
            6231.14,
            8047.88,
            7857.1,
            7802.5,
            8695.01
          ],
          markPoint: {
            data: [
              {
                type: "max",
                name: "最大值"
              },
              {
                type: "min",
                name: "最小值"
              }
            ]
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "平均值"
              }
            ]
          }
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
};
</script>

<style lang="scss" scoped>
.home-main {
  width: 100%;
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .left-side {
    width: (200/16)rem !important;
    height: 100%;
    background-color: rgb(238, 241, 246);
    color: #333;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>
