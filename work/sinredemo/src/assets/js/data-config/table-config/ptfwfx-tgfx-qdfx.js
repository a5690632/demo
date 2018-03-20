/**
 * 所属模块：
 * 平台访问分析/推广分析/渠道分析
 */

const ptfwfxTgfxQdfx = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'browseNum',
	        title: '浏览量(PV)'
	    }, {
	        field: 'visitorNum',
	        title: '访客数(UV)'
	    }, {
	        field: 'newVisitor',
	        title: '新访客数'
	    }, {
	        field: 'newVisitorRate',
	        title: '新访客比率'
	    }, {
	        field: 'jumpOutRate',
	        title: '跳出率'
	    }, {
	        field: 'avgVisitTime',
	        title: '平均访问时长'
	    }, {
	        field: 'avgVisitPage',
	        title: '平均访问页数'
	    }],
	    pagination: true,
	    data: []
	}
}

export default ptfwfxTgfxQdfx;