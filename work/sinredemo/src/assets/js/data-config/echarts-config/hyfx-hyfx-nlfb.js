/**
 * 所属模块：
 * 会员分析/会员分析/年龄分布
 */

const hyfxHyfxNlfb = {
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
            // text: '年龄分布'
        },
        tooltip: {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        xAxis: {
            name: '年龄',
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
            type: "bar",
            barWidth: "60%",
            data: []
        }]
    }
}

export default hyfxHyfxNlfb;