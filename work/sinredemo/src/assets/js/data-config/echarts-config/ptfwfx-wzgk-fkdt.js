/**
 * 所属模块：
 * 平台访问分析/网站概况/访客地图
 */
import echarts from "echarts";
import chinaMapJson from "echarts/map/json/china.json";
echarts.registerMap('china', chinaMapJson);

// 地图数据拼音转汉字
function Province(name) {
    name = name ? name.replace(' ', '') : '未知';

    let pro = {
        Beijing: '北京',
        Tianjin: '天津',
        Shanghai: '上海',
        Chongqing: '重庆',
        Hebei: '河北',
        Henan: '河南',
        Yunnan: '云南',
        Liaoning: '辽宁',
        Heilongjiang: '黑龙江',
        Hunan: '湖南',
        Anhui: '安徽',
        Shandong: '山东',
        Xinjiang: '新疆',
        Jiangsu: '江苏',
        Zhejiang: '浙江',
        Jiangxi: '江西',
        Hubei: '湖北',
        Guangxi: '广西',
        Gansu: '甘肃',
        Shanxi: '山西',
        NeiMongol: '内蒙古',
        Shaanxi: '陕西',
        Jilin: '吉林',
        Fujian: '福建',
        Guizhou: '贵州',
        Guangdong: '广东',
        Qinghai: '青海',
        Xizang: '西藏',
        Sichuan: '四川',
        Ningxia: '宁夏',
        Hainan: '海南',
        Taiwan: '台湾',
        HongKong: '香港',
        Aomen: '澳门',
        '未知': '未知',
    };

    return (typeof pro[name] == "undefined") ? '未知': pro[name];
}

const ptfwfxWzgkFkdt = {
    setData(data) {
        // 地区英文转中文
        data.items.forEach((item, index) => {
            item.data = item.data.map((item, index) => {
                return {
                    name: Province(item.name),
                    value: item.value
                }
            });
        });

        // 设置数据
        data.items.forEach((item, index) => {
            this.config.series[index].data = item.data;
        });
    },
    config: {
        title: {
            // text: '访客地图'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                return params.name + '<br>' + params.seriesName + ':' + (params.value || '-');
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {} //显示另存为图片按钮
            },
            right: 20
        },
        legend: {
            //data:['浏览量(PV)','访问次数','访客数(UV)','新访客数','IP数'],
            data: ['浏览量(PV)', '访问次数', '访客数(UV)', '新访客数'],
            selectedMode: 'single'
        },
        dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            color: ['rgb(195,86,82)', 'rgb(245,237,165)'],
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true
        },
        series: [{
                name: "浏览量(PV)",
                type: "map",
                map: "china",
                showLegendSymbol: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: []
            },
            {
                name: "访问次数",
                type: "map",
                map: "china",
                showLegendSymbol: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: []
            },
            {
                name: "访客数(UV)",
                type: "map",
                map: "china",
                showLegendSymbol: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: []
            },
            {
                name: "新访客数",
                type: "map",
                map: "china",
                showLegendSymbol: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: []
            },
            /*{
                name: "IP数",
                type: "map",
                map: "china",
                showLegendSymbol:false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: []
            }*/
        ]
    }
}

export default ptfwfxWzgkFkdt;