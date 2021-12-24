(async () => {
  // axios请求
  const baseURL = 'http://120.24.46.229:8000/';
  async function fetch(url, data, methods = 'GET') {
    const baseConfig = {
      baseURL,
      timeout: 10000,
      responseType: 'json',
      // withCredentials: true,
      Headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        referer: 'https://www.youbianku.com/',
      },
    };
    let axiosIntance = axios.create(baseConfig);
    axiosIntance.interceptors.response.use((response) => response.data);
    return await axiosIntance({ url, data, methods });
  }
  // 防抖
  function debounce(fn, time = 1000) {
    var timerID = null;
    return function () {
      var arg = arguments[0]; //获取事件
      if (timerID) {
        clearTimeout(timerID);
      }
      timerID = setTimeout(function () {
        fn(arg); //事件传入函数
      }, time);
    };
  }
  // 获取页面元素
  const address = $('.address');
  const zipCode = $('.zipCode');
  const queryBtn = $('.query-btn');
  // 输入框地址回车事件
  address.keyup(function (e) {
    const key = e.which;
    if (key === 13) {
      queryZipCode();
    }
  });
  // 点击查询事件
  queryBtn.click(debounce(queryZipCode, 500));
  // 查询邮政编码
  async function queryZipCode() {
    const value = address[0].value;
    if (!value) {
      message.run('查询地址不能为空, 请输入', 'warning');
    }
    const res = await fetch(`/queryPostCode?address=${value}`);
    const { code, data } = res;
    if (code === '000' && data && data.postcode) {
      const code = data.postcode;
      copy(code);
      zipCode[0].value = code;
    } else {
      message.run('查询失败, 请重新填写地址', 'error');
    }
  }
  // 复制剪切板
  function copy(value) {
    let input = document.createElement('input');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    message.run('已成功复制到剪切板');
  }
})();
