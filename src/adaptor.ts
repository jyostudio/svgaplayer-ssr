declare const my: WechatMiniprogram.Wx;
export function getMiniBridge(): WechatMiniprogram.Wx {
  if (typeof wx === 'undefined' && typeof my !== 'undefined') {
    return my;
  } else if (typeof wx !== 'undefined') {
    return wx;
  } else {
    return {
      request(option: any) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = "arraybuffer"
        xmlHttp.open(option.method || "GET", option.url, true);
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200 || xmlHttp.status == 0) {
              option.success({ data: xmlHttp.response } as any);
            }
          }
        }
        xmlHttp.send();
      }
    } as any
  }
}
