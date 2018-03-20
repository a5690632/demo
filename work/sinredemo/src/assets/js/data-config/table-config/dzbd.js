/**
 * 所属模块：
 * 定制表单
 * 数据格式参考 ./data/dzbd-data.js
 */

const dzbd = {
	setData(data) {
		//构建表格字段
		for(let key in data[0]){
			this.config.columns.push({field: key, title: key});
		}

		//设置数据
		this.config.data = data;
	},
	config: {
		showColumns: true,
		columns: [], // 需要从返回的数据动态构建
	    pagination: true,
	    data: []
	}
}

export default dzbd;