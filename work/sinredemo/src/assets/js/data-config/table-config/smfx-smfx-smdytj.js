/**
 * 所属模块：
 * 扫码分析/扫码分析/扫码地域统计
 */

const smfxSmfxSmdytj = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'province',
	        title: '省份'
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

export default smfxSmfxSmdytj;