const hashIds = require("hashids");

const hashMinimumSize = 4;
const hashCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

module.exports = {
  supplyOrders: new hashIds("supply orders", hashMinimumSize, hashCharacters),
  fragranceOils: new hashIds("fragrance oils", hashMinimumSize, hashCharacters),
  waxes: new hashIds("waxes", hashMinimumSize, hashCharacters),
  additives: new hashIds("additives", hashMinimumSize, hashCharacters),
  boxes: new hashIds("boxes", hashMinimumSize, hashCharacters),
  dyes: new hashIds("dye blocks", hashMinimumSize, hashCharacters),
  jars: new hashIds("jars", hashMinimumSize, hashCharacters),
  lids: new hashIds("lids", hashMinimumSize, hashCharacters),
  miscEquipment: new hashIds("misc equipment", hashMinimumSize, hashCharacters),
  warningLabels: new hashIds("warning labels", hashMinimumSize, hashCharacters),
  wicks: new hashIds("wicks", hashMinimumSize, hashCharacters),
  wickTabs: new hashIds("wick tabs", hashMinimumSize, hashCharacters),
  wickStickers: new hashIds("wick strickers", hashMinimumSize, hashCharacters),
  batches: new hashIds("batches", hashMinimumSize, hashCharacters),
  layers: new hashIds("layers", hashMinimumSize, hashCharacters),
  candles: new hashIds("candles", hashMinimumSize, hashCharacters),
  blends: new hashIds("blends", hashMinimumSize, hashCharacters),
};
