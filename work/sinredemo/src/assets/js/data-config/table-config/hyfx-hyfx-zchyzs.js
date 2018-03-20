/**
 * 所属模块：
 * 会员分析/会员分析/注册会员总数
 */

const hyfxHyfxZchyzs = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'data',
	        title: '会员总数'
	    }, {
	        field: 'date',
	        title: '截止日期'
	    }],
	    //pagination: true,
	    data: []
	}
}

export default hyfxHyfxZchyzs;