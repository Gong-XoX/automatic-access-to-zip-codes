(async () => {
  async function fetch(url, data, methods = 'GET') {
    const baseConfig = {
      baseURL: 'https://usa.youbianku.com',
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
  address[0].value = '';
  address.change(function (v) {
    zipCode[0].value = v;
    // zipCode[0].select(); // 选中
    // document.execCommand('copy', false); // 复制

    // window.clipboardData.setData('Text', address[0].value);
    // window.clipboardData.getData('Text');
  });
})();
