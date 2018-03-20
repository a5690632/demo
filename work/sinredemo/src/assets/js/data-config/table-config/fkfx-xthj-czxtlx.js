/**
 * 所属模块：
 * 访客分析/系统环境/操作系统类型
 */

const fkfxXthjCzxtlx = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'type',
	        title: '系统类型'
	    }, {
	        field: 'browseNum',
	        title: '浏览量(PV)'
	    }, {
	        field: 'visitNum',
	        title: '访问次数'
	    }, {
	        field: 'visitorNum',
	        title: '访客数(UV)'
	    }, {
	        field: 'newVisitor',
	        title: '新访客'
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
	        title: '平均访问页面'
	    }],
	    pagination: true,
	    data: []
	}
}

export default fkfxXthjCzxtlx;