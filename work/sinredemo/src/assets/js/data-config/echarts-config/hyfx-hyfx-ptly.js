/**
 * 所属模块：
 * 会员分析/会员分析/平台来源
 */

const hyfxHyfxPtly = {
    setData(data) {
        // 设置数据
        data.items.forEach((item, index) => {
            this.config.series[index].data = item.data;
        });
    },
    config: {
        title: {
            // text: '平台来源'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        legend: {
            data: ["微信", "微博"],
            x: "left",
            orient: "vertical"
        },
        series: [{
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: []
        }]
    }
}

export default hyfxHyfxPtly;