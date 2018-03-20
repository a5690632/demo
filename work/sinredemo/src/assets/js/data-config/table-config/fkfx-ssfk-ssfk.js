/**
 * 所属模块：
 * 访客分析/实时访客/实时访客
 */

const fkfxXthjSblx = {
	setData(data) {
		data.items.forEach((item, index) => {
			item.date  = item.date.split(' ').join('<br>');
			item.type = item.type.split(' ').join('<br>');
			//item.content = item.content.split('<br>').join(' | ');
		});

		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [{
	        field: 'date',
	        title: '访问基础信息'
	    }, {
	        field: 'type',
	        title: '设备信息'
	    }, {
	        field: 'content',
	        title: '访问页面'
	    }],
	    pagination: true,
	    data: []
	}
}

export default fkfxXthjSblx;