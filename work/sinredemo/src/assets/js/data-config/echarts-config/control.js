//平台访问分析/网站概况/概况
import ptfwfxWzgkGk from "./ptfwfx-wzgk-gk.js";
import ptfwfxWzgkGkData from "./data/ptfwfx-wzgk-gk-data.js";
ptfwfxWzgkGk.setData(ptfwfxWzgkGkData);


//平台访问分析/网站概况/访客地图
import ptfwfxWzgkFkdt from "./ptfwfx-wzgk-fkdt.js";
import ptfwfxWzgkFkdtData from "./data/ptfwfx-wzgk-fkdt-data.js";
ptfwfxWzgkFkdt.setData(ptfwfxWzgkFkdtData);


//平台访问分析/趋势分析/趋势分析
import ptfwfxQsfxQsfx from "./ptfwfx-qsfx-qsfx.js";
import ptfwfxQsfxQsfxData from "./data/ptfwfx-qsfx-qsfx-data.js";
ptfwfxQsfxQsfx.setData(ptfwfxQsfxQsfxData);


//平台访问分析/推广分析/来源分析
import ptfwfxTgfxLyfx from "./ptfwfx-tgfx-lyfx.js";
import ptfwfxTgfxLyfxData from "./data/ptfwfx-tgfx-lyfx-data.js";
ptfwfxTgfxLyfx.setData(ptfwfxTgfxLyfxData);


//平台访问分析/推广分析/渠道分析
import ptfwfxTgfxQdfx from "./ptfwfx-tgfx-qdfx.js";
import ptfwfxTgfxQdfxData from "./data/ptfwfx-tgfx-qdfx-data.js";
ptfwfxTgfxQdfx.setData(ptfwfxTgfxQdfxData);


//访客分析/地域分布/地域分布
import fkfxDyfbDyfbData from "./fkfx-dyfb-dyfb.js";
import fkfxDyfbDyfbDataData from "./data/fkfx-dyfb-dyfb-data.js";
fkfxDyfbDyfbData.setData(fkfxDyfbDyfbDataData);


//会员分析/会员分析/平台来源
import hyfxHyfxPtly from "./hyfx-hyfx-ptly.js";
import hyfxHyfxPtlyData from "./data/hyfx-hyfx-ptly-data.js";
hyfxHyfxPtly.setData(hyfxHyfxPtlyData);


//会员分析/会员分析/渠道来源
import hyfxHyfxQdly from "./hyfx-hyfx-qdly.js";
import hyfxHyfxQdlyData from "./data/hyfx-hyfx-qdly-data.js";
hyfxHyfxQdly.setData(hyfxHyfxQdlyData);


//会员分析/会员分析/性别分布
import hyfxHyfxXbfb from "./hyfx-hyfx-xbfb.js";
import hyfxHyfxXbfbData from "./data/hyfx-hyfx-xbfb-data.js";
hyfxHyfxXbfb.setData(hyfxHyfxXbfbData);


//会员分析/会员分析/年龄分布
import hyfxHyfxNlfb from "./hyfx-hyfx-nlfb.js";
import hyfxHyfxNlfbData from "./data/hyfx-hyfx-nlfb-data.js";
hyfxHyfxNlfb.setData(hyfxHyfxNlfbData);


//会员分析/会员分析/会员注册来源
import hyfxHyfxHyzcly from "./hyfx-hyfx-hyzcly.js";
import hyfxHyfxHyzclyData from "./data/hyfx-hyfx-hyzcly-data.js";
hyfxHyfxHyzcly.setData(hyfxHyfxHyzclyData);


//会员分析/会员分析/会员等级分布
import hyfxHyfxHydjfb from "./hyfx-hyfx-hydjfb.js";
import hyfxHyfxHydjfbData from "./data/hyfx-hyfx-hydjfb-data.js";
hyfxHyfxHydjfb.setData(hyfxHyfxHydjfbData);


//会员分析/会员分析/会员偏好
import hyfxHyfxHyph from "./hyfx-hyfx-hyph.js";
import hyfxHyfxHyphData from "./data/hyfx-hyfx-hyph-data.js";
hyfxHyfxHyph.setData(hyfxHyfxHyphData);


//扫码分析/扫码分析/扫码总览
import smfxSmfxSmzl from "./smfx-smfx-smzl.js";
import smfxSmfxSmzlData from "./data/smfx-smfx-smzl-data.js";
smfxSmfxSmzl.setData(smfxSmfxSmzlData);


//积分分析/积分分析/会员积分获取
import jffxJffxHyjfhq from "./jffx-jffx-hyjfhq.js";
import jffxJffxHyjfhqData from "./data/jffx-jffx-hyjfhq-data.js";
jffxJffxHyjfhq.setData(jffxJffxHyjfhqData);


//积分分析/积分分析/会员积分消耗
import jffxJffxHyjfxh from "./jffx-jffx-hyjfxh.js";
import jffxJffxHyjfxhData from "./data/jffx-jffx-hyjfxh-data.js";
jffxJffxHyjfxh.setData(jffxJffxHyjfxhData);


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