/**
 * 所属模块：
 * 积分分析/积分分析/积分获取消耗情况
 */

const jffxJffxJfhqxhqk = {
	setData(data) {
		//构建表格字段
		this.config.columns = data.config.map((item, index) => {
			item.title = item.name;
			return item;
		});;

		//设置数据
		this.config.data = data.items;
	},
	config: {
		showColumns: true,
		columns: [], // 需要从返回的数据动态构建
	    pagination: true,
	    data: []
	}
}

export default jffxJffxJfhqxhqk;