/**
 * 所属模块：
 * 扫码分析/扫码分析/扫码总览
 */

const smfxSmfxSmzl = {
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
            // text: '扫码总览'
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
            data: ['扫码总个数', '扫码总人数']
        },
        xAxis: {
            name: '时间',
            data: [],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            name: '数量',
            type: 'value'
        },
        series: [{
            name: "扫码总个数",
            type: "line",
            data: []
        }, {
            name: "扫码总人数",
            type: "line",
            data: []
        }]
    }
}

export default smfxSmfxSmzl;