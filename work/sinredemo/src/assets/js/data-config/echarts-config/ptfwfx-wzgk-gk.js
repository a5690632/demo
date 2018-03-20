/**
 * 所属模块：
 * 平台访问分析/网站概况/概况
 */

const ptfwfxWzgkGk = {
    setData(data) {
        // 设置X轴数据
        this.config.xAxis.data = data.xAxis

        // 设置数据
        data.items.forEach((item, index) => {
            this.config.series[index].data = item.data
        })
    },
    config: {
        title: {
            // text: '概况'
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
            data: ['浏览量(PV)', '访客数(UV)']
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
            name: "浏览量(PV)",
            type: "line",
            data: []
        }, {
            name: "访客数(UV)",
            type: "line",
            data: []
        }]
    }
}

export default ptfwfxWzgkGk