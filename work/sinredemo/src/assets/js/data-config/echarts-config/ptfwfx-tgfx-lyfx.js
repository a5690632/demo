/**
 * 所属模块：
 * 平台访问分析/推广分析/来源分析
 */

const ptfwfxTgfxLyfx = {
    setData(data) {
        // 设置X轴数据
        this.config.xAxis.data = data.xAxis;

        // 设置数据
        data.items.forEach((item, index) => {
            this.config.series[index].data = item.data;
        });
    },
    config: {
        title: {
            // text: '来源分析'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        legend: {
            data: ['直接链接', '搜索引擎', '网站']
        },
        xAxis: {
            name: '时间',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            name : '数量',
            type : 'value'
        },
        series: [{
            name: "直接链接",
            type: "line",
            data: []
        },
        {
            name: "搜索引擎",
            type: "line",
            data: []
        },
        {
            name: "网站",
            type: "line",
            data: []
        }]
    }
}

export default ptfwfxTgfxLyfx;