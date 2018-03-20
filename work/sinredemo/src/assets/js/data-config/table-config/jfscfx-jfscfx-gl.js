/**
 * 所属模块：
 * 积分商城分析/积分商城分析/概览
 */

const jfscfxJfscfxGl = {
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
	        field: 'visitNum',
	        title: '访问次数'
	    }, {
	        field: 'visitorNum',
	        title: '访客数(UV)'
	    }, {
	        field: 'jumpOutRate',
	        title: '跳出率'
	    }, {
	        field: 'avgVisitTime',
	        title: '平均访问时长'
	    }, {
	        field: 'avgVisitPage',
	        title: '平均访问页面'
	    }],
	    pagination: true,
	    data: []
	}
}

export default jfscfxJfscfxGl;