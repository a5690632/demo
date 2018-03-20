//平台访问分析/网站概括/受访页面排行
import ptfwfxWzgkSfymph from "./ptfwfx-wzgk-sfymph.js";


//平台访问分析/网站概括/来源网站排行
import ptfwfxWzgkLywzph from "./ptfwfx-wzgk-lywzph.js";


//平台访问分析/趋势分析/趋势分析
import ptfwfxQsfxQsfx from "./ptfwfx-qsfx-qsfx.js";


//平台访问分析/趋势分析/访问详情
import ptfwfxQsfxFwxq from "./ptfwfx-qsfx-fwxq.js";


//平台访问分析/页面分析/页面分析
import ptfwfxYmfxYmfx from "./ptfwfx-ymfx-ymfx.js";


//平台访问分析/事件分析/事件类型
import ptfwfxSjfxSjlx from "./ptfwfx-sjfx-sjlx.js";


//平台访问分析/事件分析/事件行为
import ptfwfxSjfxSjxw from "./ptfwfx-sjfx-sjxw.js";


//平台访问分析/事件分析/事件名称
import ptfwfxSjfxSjmc from "./ptfwfx-sjfx-sjmc.js";


//平台访问分析/推广分析/来源分析
import ptfwfxTgfxLyfx from "./ptfwfx-tgfx-lyfx.js";


//平台访问分析/推广分析/渠道分析1
import ptfwfxTgfxQdfx from "./ptfwfx-tgfx-qdfx.js";


//平台访问分析/推广分析/渠道分析2
import ptfwfxTgfxQdfx2 from "./ptfwfx-tgfx-qdfx2.js";


//访客分析/地域分布/地域分布
import fkfxFkfxDyfb from "./fkfx-fkfx-dyfb.js";


//访客分析/系统环境/操作系统类型
import fkfxXthjCzxtlx from "./fkfx-xthj-czxtlx.js";


//访客分析/系统环境/浏览器类型
import fkfxXthjLlqlx from "./fkfx-xthj-llqlx.js";


//访客分析/系统环境/设备类型
import fkfxXthjSblx from "./fkfx-xthj-sblx.js";


//访客分析/实时访客/实时访客
import fkfxSsfkSsfk from "./fkfx-ssfk-ssfk.js";


//会员分析/会员分析/注册会员总数
import hyfxHyfxZchyzs from "./hyfx-hyfx-zchyzs.js";


//会员分析/会员分析/基本统计
import hyfxHyfxJbtj from "./hyfx-hyfx-jbtj.js";


//会员分析/会员分析/地域分布
import hyfxHyfxDyfb from "./hyfx-hyfx-dyfb.js";


//扫码分析/扫码分析/扫码地域统计
import smfxSmfxSmdytj from "./smfx-smfx-smdytj.js";


//扫码分析/扫码分析/批次号统计
import smfxSmfxPchtj from "./smfx-smfx-pchtj.js";


//积分分析/积分分析/积分获取消耗情况
import jffxJffxJfhqxhqk from "./jffx-jffx-jfhqxhqk.js";


//积分商城分析/积分商城分析/概览
import jfscfxJfscfxGl from "./jfscfx-jfscfx-gl.js";


//积分商城分析/积分商城分析/积分商城兑换情况
import jfscfxJfscfxJfscdhqk from "./jfscfx-jfscfx-jfscdhqk.js";


//定制表单
import dzbd from "./dzbd.js";


const alias = {
	visit_toppage: ptfwfxWzgkSfymph,			//平台访问分析/网站概括/受访页面排行
	visit_source: ptfwfxWzgkLywzph,				//平台访问分析/网站概括/来源网站排行
	trend_table: ptfwfxQsfxQsfx,				//平台访问分析/趋势分析/趋势分析
	trend_all: ptfwfxQsfxFwxq,					//平台访问分析/趋势分析/访问详情
	page: ptfwfxYmfxYmfx,						//平台访问分析/页面分析/页面分析
	event_category: ptfwfxSjfxSjlx,				//平台访问分析/事件分析/事件类型
	event_action: ptfwfxSjfxSjxw,				//平台访问分析/事件分析/事件行为
	event_name: ptfwfxSjfxSjmc,					//平台访问分析/事件分析/事件名称
	source_table: ptfwfxTgfxLyfx,				//平台访问分析/推广分析/来源分析
	channel_all: ptfwfxTgfxQdfx,				//平台访问分析/推广分析/渠道分析1 总览
	channel_detail: ptfwfxTgfxQdfx2,			//平台访问分析/推广分析/渠道分析2 详情
	district_table: fkfxFkfxDyfb,				//访客分析/地域分布/地域分布
	client_os: fkfxXthjCzxtlx,					//访客分析/系统环境/操作系统类型
	browser: fkfxXthjLlqlx,						//访客分析/系统环境/浏览器类型
	device: fkfxXthjSblx,						//访客分析/系统环境/设备类型
	trend_latest: fkfxSsfkSsfk,					//访客分析/实时访客/实时访客 叫访客日志更合适一些
	member_number: hyfxHyfxZchyzs,				//会员分析/会员分析/注册会员总数
	member_basic: hyfxHyfxJbtj,					//会员分析/会员分析/基本统计
	member_map: hyfxHyfxDyfb,					//会员分析/会员分析/地域分布 这个统计返回的省份数据中即有英文也有中文
	scancode_map: smfxSmfxSmdytj,				//扫码分析/扫码分析/扫码地域统计 这个统计返回的省份数据是中文 其他模块返回的是英文
	batch: smfxSmfxPchtj,						//扫码分析/扫码分析/批次号统计
	point_statistics: jffxJffxJfhqxhqk,			//积分分析/积分分析/积分获取消耗情况
	pointmall_statistics: jfscfxJfscfxGl,		//积分商城分析/积分商城分析/概览
	pointmall_exchange: jfscfxJfscfxJfscdhqk,	//积分商城分析/积分商城分析/积分商城兑换情况

	dzbd: dzbd 									//定制表单
}

export default alias;