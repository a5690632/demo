var typeList = [
	{
		type: "echart",
		list: [
			/overview/,				//平台访问分析/网站概况/概况
			/visit_map/,			//平台访问分析/网站概况/访客地图
			/trend_pic/,			//平台访问分析/趋势分析/趋势分析
			/source_pic/,			//平台访问分析/推广分析/来源分析
			/channel_pic/,			//平台访问分析/推广分析/渠道分析
			/district_pic/, 		//访客分析/地域分布/地域分布
			/source_platform/,		//会员分析/会员分析/平台来源
			/source_channel/,		//会员分析/会员分析/渠道来源
			/source_member/,		//会员分析/会员分析/会员注册来源
			/member_sex/,			//会员分析/会员分析/性别分布
			/member_age/,			//会员分析/会员分析/年龄分布
			/member_rank/,			//会员分析/会员分析/会员等级分布
			/member_preferences/,	//会员分析/会员分析/会员偏好
			/scancode/,				//扫码分析/扫码分析/扫码总览
			/point_get/,			//积分分析/积分分析/会员积分获取
			/point_spend/,			//积分分析/积分分析/会员积分消耗
		]
	}, {
		type: "table",
		list: [
			/visit_toppage/,		//平台访问分析/网站概括/受访页面排行
			/visit_source/,			//平台访问分析/网站概括/来源网站排行
			/trend_table/,			//平台访问分析/趋势分析/趋势分析
			/trend_all/,			//平台访问分析/趋势分析/访问详情
			/page/,					//平台访问分析/页面分析/页面分析
			/event_category/,		//平台访问分析/事件分析/事件类型
			/event_action/,			//平台访问分析/事件分析/事件行为
			/event_name/,			//平台访问分析/事件分析/事件名称
			/source_table/,			//平台访问分析/推广分析/来源分析
			/channel_all/,			//平台访问分析/推广分析/渠道分析1
			/channel_detail/,		//平台访问分析/推广分析/渠道分析2
			/district_table/,		//访客分析/地域分布/地域分布
			/client_os/,			//访客分析/系统环境/操作系统类型
			/browser/,				//访客分析/系统环境/浏览器类型
			/device/,				//访客分析/系统环境/设备类型
			/trend_latest/,			//访客分析/实时访客/实时访客
			/member_number/,		//访客分析/注册会员总数
			/member_basic/,			//会员分析/基本统计
			/member_map/,			//会员分析/地域分布
			/scancode_map/,			//扫码分析/扫码地域统计
			/batch/,				//扫码分析/批次号统计
			/point_statistics/,		//积分分析/积分获取消耗情况
			/pointmall_statistics/,	//积分商城分析/概览
			/pointmall_exchange/,	//积分商城分析/积分商城兑换情况
		]
	}, {
		type: "funnel",
		list: [
			/funnel_/,		//平台访问分析/漏斗分析
		]
	}
];

export default typeList;