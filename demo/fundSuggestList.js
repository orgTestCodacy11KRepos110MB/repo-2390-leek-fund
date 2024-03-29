const axios = require('axios');
const fs = require('fs');

function request() {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    axios
      .get('http://m.1234567.com.cn/data/FundSuggestList.js', {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/3.0 Safari/536.11',
          Cookie:
            'device_id=24700f9f1986800ab4fcc880530dd0ed; s=cx138g8av1; bid=5cce4e0c90209ffea928b627443f39fa_kc956qys; __utmz=1.1593957579.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ga=GA1.2.2075969626.1594306349; acw_tc=2760823815987068844221229e39eeead45f769900257a8764f721b5ad8125; xq_a_token=4db837b914fc72624d814986f5b37e2a3d9e9944; xqat=4db837b914fc72624d814986f5b37e2a3d9e9944; xq_r_token=2d6d6cc8e57501dfe571d2881cabc6a5f2542bf8; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwMDQ4MzAwNywiY3RtIjoxNTk4NzA2ODc4NTQ3LCJjaWQiOiJkOWQwbjRBWnVwIn0.KfVaRDSamj2Sp9UnHqMvM6s5fLnLKvGAYqupbDcjtyHb2cpPSwL6GH3QIc97WqajR1jNQjKklRgcHy6Ep4VcwHRbydqioj7ZCNSCU1hDtnoMb8kTm7wK4dWB9TOakhRw85dpXpCcXe7GSbdGWziNEY-knZppxuMl5oUKGnx8vrGT_5DZII8UdyZuixyiZ8E_2gu3ggGrxTT6MAziQrTNxrFALKBRJgQeRPLe0iK5F-MG1PB_2fphP_9IruQpERJ-w6YLgDBXfplbFL32BkIW2FV4HWbZonpBdcMYN4STPM6qA6l3C7Pzkg0E-x_RIc4jdhwVSvIiMCa-h-sVE-dYyw; u=681598706884429; Hm_lvt_1db88642e346389874251b5a1eded6e3=1598706886; __utma=1.339782325.1593957579.1593957579.1598706894.2; __utmc=1; __utmt=1; __utmb=1.1.10.1598706894; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1598706974',
        },
      })
      .then((response) => {
        const data = response.data.split('[')[1].split(']')[0];
        const fundSuggestArray = data.split(',');
        let newFundSuggestArray = [];
        fundSuggestArray.forEach((fund) => {
          if (!fund.includes('(后端)')) {
            newFundSuggestArray.push(fund);
          }
        });
        const newData = newFundSuggestArray.join(',');

        const fundSuggestList = `
        /** generated by code */
        const fundSuggestList = [${newData}];
        export default fundSuggestList;
        `;
        fs.writeFileSync('./src/data/fundSuggestData.ts', fundSuggestList);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

request().then((res) => {
  console.log(res);
});
