/**
 * 所属模块：
 * 会员分析/会员分析/基本统计
 */

const hyfxHyfxJbtj = {
	setData(data) {
		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'activeUser',
	        title: '活跃会员'
	    }, {
	        field: 'newRegisteredMember',
	        title: '新增注册会员'
	    }, {
	        field: 'informationUser',
	        title: '完善信息会员数'
	    }, {
	        field: 'keepUser',
	        title: '留存会员'
	    }],
	    pagination: true,
	    data: []
	}
}

export default hyfxHyfxJbtj;