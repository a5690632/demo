/**
 * 所属模块：
 * 积分分析/积分分析/会员积分获取
 */

const jffxJffxHyjfhq = {
    setData(data) {
        // 设置X轴数据
        this.config.xAxis.data = data.xAxis;

        // 根据数据动态构建series需要的数据
        data.items.forEach((item, index) => {
            this.config.legend.data[index] = item.name
            this.config.series[index] = {
                name: item.name,
                type: "line",
                data: item.data
            }
        })
    },
    config: {
        title: {
            // text: '会员积分获取'
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
            data: [] //需要根据返回的数据动态构建数据
        },
        xAxis: {
            name: '时间',
            data: [],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
            name: "数值"
        },
        series: [] //需要根据返回的数据动态构建数据，数据类型如：{name: "积分", type: "line", data: []} 或参考上面的setData方法
    }
}

export default jffxJffxHyjfhq;