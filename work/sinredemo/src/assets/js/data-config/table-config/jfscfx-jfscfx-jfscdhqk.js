/**
 * 所属模块：
 * 积分商城分析/积分商城分析/积分商城兑换情况
 */

const jfscfxJfscfxJfscdhqk = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'goodsName',
	        title: '商品名称'
	    }, {
	        field: 'exchangeNum',
	        title: '兑换数量'
	    }, {
	        field: 'type',
	        title: '积分类型'
	    }, {
	        field: 'points',
	        title: '消耗积分'
	    }],
	    pagination: true,
	    data: []
	}
}

export default jfscfxJfscfxJfscdhqk;