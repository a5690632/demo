该目录为V2数据统计各模块用到的echarts图表配置项

每一个文件表示一个模块的图表配置


文件与模块对应列表：
ptfwfx-wzgk-gk.js		平台访问分析/网站概况/概况 √
ptfwfx-wzgk-fkdt.js		平台访问分析/网站概况/访客地图 √
ptfwfx-qsfx-qsfx.js		平台访问分析/趋势分析/趋势分析 √（由于该模块为tab切换形式的分四块数据，按照业务需求现改为了统一返回数据形式，需跟宋震交接此事）
ptfwfx-tgfx-lyfx.js		平台访问分析/推广分析/来源分析 √
ptfwfx-tgfx-qdfx.js		平台访问分析/推广分析/渠道分析 √（由于该模块为tab切换形式的分三块数据，按照业务需求现改为了统一返回数据形式，需跟宋震交接此事）
hyfx-hyfx-ptly.js		会员分析/会员分析/平台来源 √
hyfx-hyfx-qdly.js		会员分析/会员分析/渠道来源 √
hyfx-hyfx-xbfb.js		会员分析/会员分析/性别分布 √
hyfx-hyfx-nlfb.js		会员分析/会员分析/年龄分布 √
hyfx-hyfx-hyzcly.js		会员分析/会员分析/会员注册来源 √
hyfx-hyfx-hydjfb.js		会员分析/会员分析/会员等级分布 √
hyfx-hyfx-hyph.js		会员分析/会员分析/会员偏好 √
smfx-smfx-smzl.js		扫码分析/扫码分析/扫码总览 √
jffx-jffx-hyjfhq.js		积分分析/积分分析/会员积分获取 √
jffx-jffx-hyjfxh.js		积分分析/积分分析/会员积分消耗 √


-------------------------------------------


别名与模块的对应关系
overview			ptfwfx-wzgk-gk.js		平台访问分析/网站概况/概况
visit_map			ptfwfx-wzgk-fkdt.js		平台访问分析/网站概况/访客地图
trend_pic			ptfwfx-qsfx-qsfx.js		平台访问分析/趋势分析/趋势分析
source_pic			ptfwfx-tgfx-lyfx.js		平台访问分析/推广分析/来源分析
channel_pic			ptfwfx-tgfx-qdfx.js		平台访问分析/推广分析/渠道分析
source_platform		hyfx-hyfx-ptly.js		会员分析/会员分析/平台来源
source_channel		hyfx-hyfx-ptly.js		会员分析/会员分析/渠道来源
source_member		hyfx-hyfx-hyzcly.js		会员分析/会员分析/会员注册来源
member_sex			hyfx-hyfx-xbfb.js		会员分析/会员分析/性别分布
member_age			hyfx-hyfx-nlfb.js		会员分析/会员分析/年龄分布
member_rank			hyfx-hyfx-hydjfb.js		会员分析/会员分析/会员等级分布
member_preferences	hyfx-hyfx-hyph.js		会员分析/会员分析/会员偏好
scancode			smfx-smfx-smzl.js		扫码分析/扫码分析/扫码总览
point_get			jffx-jffx-hyjfhq.js		积分分析/积分分析/会员积分获取
point_spend			jffx-jffx-hyjfxh.js		积分分析/积分分析/会员积分消耗