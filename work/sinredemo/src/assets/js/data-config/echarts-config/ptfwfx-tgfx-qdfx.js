/**
 * 所属模块：
 * 平台访问分析/推广分析/渠道分析
 */

const ptfwfxTgfxQdfx = {
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
            // text: '渠道分析'
        },
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        legend: {
            data: ['浏览量(PV)', '访客数(UV)', '新访客数']
        },
        xAxis : {
            name : '渠道',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis : {
            type : 'value',
            name : '数量'
        },
        series : [{
            name: "浏览量(PV)",
            type: "line",
            data: []
        },{
            name: "访客数(UV)",
            type: "line",
            data: []
        },{
            name: "新访客数",
            type: "line",
            data: []
        }]
    }
}

export default ptfwfxTgfxQdfx;