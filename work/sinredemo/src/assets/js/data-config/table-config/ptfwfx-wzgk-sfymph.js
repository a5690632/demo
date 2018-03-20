/**
 * 所属模块：
 * 平台访问分析/网站概括/来源网站排行
 */

const ptfwfxWzgkSfymph = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'num',
	        title: '排行'
	    }, {
	        field: 'page',
	        title: '标题'
	    }, {
	        field: 'pv',
	        title: '浏览量(PV)'
	    }, {
	        field: 'uv',
	        title: '访客数(UV)'
	    }],
	    pagination: true,
	    data: []
	}
}

export default ptfwfxWzgkSfymph;