import axios from "axios";

const getData = async () => {
  let data = JSON.stringify({
    query:
      'subscription {\n  Solana {\n    DEXTrades(\n      where: {Trade: {Buy: {Currency: {MintAddress: {is: "So11111111111111111111111111111111111111112"}}}, Sell: {Currency: {MintAddress: {is: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"}}}}}\n    ) {\n      Trade {\n        Dex {\n          ProgramAddress\n          ProtocolName\n          ProtocolFamily\n        }\n        Buy {\n          PriceInUSD\n          Account {\n            Address\n          }\n        }\n      }\n      Block {\n        Time\n      }\n    }\n  }\n}\n',
    variables: "{}",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://streaming.bitquery.io/eap",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "BQYuTITWanwYGz0YLGdcWSADO74o5RTX",
      Authorization: process.env.NEXT_PUBLIC_BITQUERY_TOKEN,
    },
    data: data,
  };

  let response = await axios.request(config);
  //  console.log(JSON.stringify(response.data.data.Solana.DEXTrades))
  return response.data.data.Solana.DEXTrades;
};

export default getData;
