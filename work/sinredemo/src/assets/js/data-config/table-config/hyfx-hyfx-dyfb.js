/**
 * 所属模块：
 * 会员分析/会员分析/地域分布
 */


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


const hyfxHyfxDyfb = {
	setData(data) {
		data.items.forEach((item, index) => {
			item.province = Province(item.province);
		});

		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'province',
	        title: '省份'
	    }, {
	        field: 'memberNum',
	        title: '新增会员人数'
	    }],
	    pagination: true,
	    data: []
	}
}

export default hyfxHyfxDyfb;