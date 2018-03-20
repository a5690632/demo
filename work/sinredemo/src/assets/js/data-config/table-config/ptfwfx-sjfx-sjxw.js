/**
 * 所属模块：
 * 平台访问分析/事件分析/事件类型
 */

const ptfwfxSjfxSjxw = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'action',
	        title: '事件行为'
	    }, {
	        field: 'visitNum',
	        title: '访问次数'
	    }, {
	        field: 'visitorNum',
	        title: '访客数'
	    }, {
	        field: 'eventNum',
	        title: '事件次数'
	    }, {
	        field: 'eventVal',
	        title: '事件价值'
	    }],
	    pagination: true,
	    data: []
	}
}

export default ptfwfxSjfxSjxw;