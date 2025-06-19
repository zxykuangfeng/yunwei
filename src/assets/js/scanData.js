export const scanData = {
    inputObj: document.createElement('input'),
    lastInputTime: new Date().getTime(),
    nowIsInputting: false,
    value: '',
    callBackUrl: '',
    success: null, // 这里改为 null，Vue 组件会重新绑定
    init: () => {
        scanData.inputObj.id = 'scanInput';
        scanData.inputObj.style.cssText = 'opacity:0; position:absolute; left:-9999px;';
        document.body.appendChild(scanData.inputObj);

        setInterval(() => {
            scanData.inputObj.focus();
        }, 200);

        scanData.inputObj.oninput = function (e) {
            let now = new Date().getTime();
            if (now - scanData.lastInputTime > 500) {
                scanData.nowIsInputting = true;
                scanData.lastInputTime = now;
                scanData.inputObj.value = e.data;
            } else {
                scanData.lastInputTime = now;
                setTimeout(() => {
                    if (new Date().getTime() - scanData.lastInputTime >= 195) {
                        scanData.value = scanData.inputObj.value;
                        scanData.inputObj.value = '';
                        if (scanData.value && scanData.success) {
                            scanData.success(scanData.value); // 触发 Vue 方法
                        }
                    }
                }, 200);
            }
        };
    },
};

// 默认初始化
scanData.init();
