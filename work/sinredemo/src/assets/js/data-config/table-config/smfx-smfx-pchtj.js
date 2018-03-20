/**
 * 所属模块：
 * 扫码分析/扫码分析/批次号统计
 */

const smfxSmfxPchtj = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'batch',
	        title: '批次号'
	    }, {
	        field: 'scanNumber',
	        title: '扫码个数'
	    }, {
	        field: 'scanPeopleNumber',
	        title: '扫码人数'
	    }],
	    pagination: true,
	    data: []
	}
}

export default smfxSmfxPchtj;