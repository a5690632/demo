/**
 * 所属模块：
 * 会员分析/会员分析/会员偏好
 */

const hyfxHyfxHyph = {
    setData(data) {
        // 设置数据
        data.items.forEach((item, index) => {
            this.config.series[index].data = item.data;

            // 根据数据条数，构建legend配置属性
            this.config.legend.data = item.data.map((item, index) => {
                return item.name;
            });
        });
    },
    config: {
        title: {
            // text: '会员偏好'
        },
        tooltip: {
            formatter: "{b} : {c} ({d}%)"
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        legend: {
            data: [], //需要根据数据条数，动态构建
            x: "left",
            orient: "vertical"
        },
        series: [{
            type: "pie",
            radius: "55%",
            roseType: 'radius',
            center: ["50%", "60%"],
            data: []
        }]
    }
}

export default hyfxHyfxHyph;