//平台访问分析/网站概况/概况
import ptfwfxWzgkGk from "./ptfwfx-wzgk-gk.js";


//平台访问分析/网站概况/访客地图
import ptfwfxWzgkFkdt from "./ptfwfx-wzgk-fkdt.js";


//平台访问分析/趋势分析/趋势分析
import ptfwfxQsfxQsfx from "./ptfwfx-qsfx-qsfx.js";


//平台访问分析/推广分析/来源分析
import ptfwfxTgfxLyfx from "./ptfwfx-tgfx-lyfx.js";


//平台访问分析/推广分析/渠道分析
import ptfwfxTgfxQdfx from "./ptfwfx-tgfx-qdfx.js";


//访客分析/地域分布/地域分布
import fkfxDyfbDyfbData from "./fkfx-dyfb-dyfb.js";


//会员分析/会员分析/平台来源
import hyfxHyfxPtly from "./hyfx-hyfx-ptly.js";


//会员分析/会员分析/渠道来源
import hyfxHyfxQdly from "./hyfx-hyfx-qdly.js";


//会员分析/会员分析/性别分布
import hyfxHyfxXbfb from "./hyfx-hyfx-xbfb.js";


//会员分析/会员分析/年龄分布
import hyfxHyfxNlfb from "./hyfx-hyfx-nlfb.js";


//会员分析/会员分析/会员注册来源
import hyfxHyfxHyzcly from "./hyfx-hyfx-hyzcly.js";


//会员分析/会员分析/会员等级分布
import hyfxHyfxHydjfb from "./hyfx-hyfx-hydjfb.js";


//会员分析/会员分析/会员偏好
import hyfxHyfxHyph from "./hyfx-hyfx-hyph.js";


//扫码分析/扫码分析/扫码总览
import smfxSmfxSmzl from "./smfx-smfx-smzl.js";


//积分分析/积分分析/会员积分获取
import jffxJffxHyjfhq from "./jffx-jffx-hyjfhq.js";


//积分分析/积分分析/会员积分消耗
import jffxJffxHyjfxh from "./jffx-jffx-hyjfxh.js";


const alias = {
	overview: ptfwfxWzgkGk,				//平台访问分析/网站概况/概况
	visit_map: ptfwfxWzgkFkdt,			//平台访问分析/网站概况/访客地图
	trend_pic: ptfwfxQsfxQsfx,			//平台访问分析/趋势分析/趋势分析
	source_pic: ptfwfxTgfxLyfx,			//平台访问分析/推广分析/来源分析
	channel_pic: ptfwfxTgfxQdfx,		//平台访问分析/推广分析/渠道分析
	district_pic: fkfxDyfbDyfbData,		//访客分析/地域分布/地域分布
	source_platform: hyfxHyfxPtly,		//会员分析/会员分析/平台来源
	source_channel: hyfxHyfxQdly,		//会员分析/会员分析/渠道来源
	source_member: hyfxHyfxHyzcly,		//会员分析/会员分析/会员注册来源
	member_sex: hyfxHyfxXbfb,			//会员分析/会员分析/性别分布
	member_age: hyfxHyfxNlfb,			//会员分析/会员分析/年龄分布
	member_rank: hyfxHyfxHydjfb,		//会员分析/会员分析/会员等级分布
	member_preferences: hyfxHyfxHyph,	//会员分析/会员分析/会员偏好
	scancode: smfxSmfxSmzl,				//扫码分析/扫码分析/扫码总览
	point_get: jffxJffxHyjfhq,			//积分分析/积分分析/会员积分获取
	point_spend: jffxJffxHyjfxh,		//积分分析/积分分析/会员积分消耗
}

export default alias;