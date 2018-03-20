/**
 * 所属模块：
 * 平台访问分析/漏斗分析
 */


const ptfwfxLdfx = {
    setData(data) {
        let tpl = `
        <div class="funnel-title">
            <h3>${data.total}</h3>
            <p>总转化率</p>
        </div>`;

        data.items.forEach((item, index) => {
            tpl += `
            <div class="funnel-item">
                <div class="funnel-text">
                    <div class="funnel-name">${item.name}</div>
                </div>
                <div class="funnel-bar">
                    <div class="funnel-bar-inner" style="width: ${item.value / data.items[0].value * 100}%"></div>
                    <span class="funnel-value">${item.value}人</span>
                </div>
                <div class="funnel-percent convert-color-${Math.ceil(parseInt(data.percent[index]) / 10)}">
                    <span>${data.percent[index]}</span>
                </div>
            </div>`;
        });

        this.config.tpl = tpl;
    },
    config: {
        tpl: ''
    }
}

export default ptfwfxLdfx;