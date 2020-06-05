const express = require("express");
const axiosFetch = require("./service");
const fs = require("fs").promises;
const path = require("path");
const validate = require("./middlewarebtc");
const rescue = require("../rescue");

const router = express.Router();

const url = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json";

const fileModifier = async (fileModifierType, newContent) => {
  const filePath = path.resolve(__dirname, "..", "..", "currencies.json");
  const readFile = () =>
    fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));
  const writeFile = content =>
    fs.writeFile(filePath, JSON.stringify(content));
  const choices = {
    read: readFile,
    write: writeFile,
    default: "Tipo de modificador errado",
  };
  return choices[fileModifierType](newContent) || choices.default;
};

const parseF = (value, length) => Number(parseFloat(value).toFixed(length));

const coinObj = (data, coin, description, value) => {
  const { rate_float: rateFloat } = data;
  const coins = parseF(value, 2);
  const btcCoins = rateFloat * coins;

  return {
    [coin]: {
      code: coin,
      rate: parseF(btcCoins, 4).toString(),
      description,
      rate_float: parseF(btcCoins, 4),
    },
  };
};

const callbackGetBTC = async (req, res) => {
  const data = await axiosFetch(url).catch((err) => ({ error: err }));
  const read = await fileModifier("read");
  if ((data.error && !data.error.response) || !data)
    return res.status(503).json({ message: "Coinbase service not available" });
  if (data.error) return res.status(500).json({ message: "Error no data" });
  const { BRL, CAD, EUR } = read;
  const objReal = coinObj(data.bpi.USD, "BRL", "Brazilian Real", BRL);
  const objCad = coinObj(data.bpi.USD, "CAD", "Canadian Dollar", CAD);
  const objEur = coinObj(data.bpi.USD, "EUR", "Euro", EUR);
  Object.assign(data.bpi, objReal);
  Object.assign(data.bpi, objEur);
  Object.assign(data.bpi, objCad);
  return res.status(200).send({ data });
};

const callbackPostCoin = async (req, res) => {
  const { currency, value } = req.body;
  try {
    const sucess = { message: "Valor alterado com sucesso!" };
    const read = await fileModifier("read");
    read[currency] = value;
    await fileModifier("write", read);
    return res.status(200).json(sucess);
  } catch (error) {
    console.error();
  }
};

router.post("/crypto/btc", validate, rescue(callbackPostCoin));
router.get("/crypto/btc", rescue(callbackGetBTC));

module.exports = router;
