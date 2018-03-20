/**
 * 所属模块：
 * 平台访问分析/页面分析/页面分析
 */

const ptfwfxYmfxYmfx = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'url',
	        title: '标题'
	    }, {
	        field: 'browseNum',
	        title: '浏览量(PV)'
	    }, {
	        field: 'visitorNum',
	        title: '访客数(UV)'
	    }, {
	        field: 'enterPage',
	        title: '入口页次数'
	    }, {
	        field: 'exitPage',
	        title: '退出页次数'
	    }, {
	        field: 'avgVisitTime',
	        title: '平均访问时长'
	    }, {
	        field: 'exitPageRate',
	        title: '退出率'
	    }],
	    pagination: true,
	    data: []
	}
}

export default ptfwfxYmfxYmfx;