(async () => {
  async function fetch(url, data, methods = 'GET') {
    const baseConfig = {
      baseURL: 'http://120.24.46.229:8000/',
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

  const address = $('.address');
  const zipCode = $('.zipCode');
  const queryBtn = $('.query-btn');
  queryBtn.click(async function () {
    const value = address[0].value;
    if (!value) {
      message.run('查询地址不能为空, 请输入', 'warning');
    }
    const res = await fetch(`/queryPostCode?address=${value}`);
    const { code, data } = res;
    if (code === '000' && data && data.postcode) {
      const code = data.postcode;
      let input = document.createElement('input');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      zipCode[0].value = data.postcode;
      message.run('已成功复制到剪切板');
    } else {
      message.run('查询失败, 请重新填写地址', 'error');
    }
  });
})();
