var faker = require("faker");

module.exports = [
  {
    whenCreated: "2019-05-17",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "11.0" },
      { type: "fragrance-oil", hashId: "4JDB", weightOunces: "0.9" }
    ],
    layers: [
      {
        whenPoured: "2019-05-17T15:11:45",
        candleHashId: "WBZW",
        preppedContainerWeightOunces: "8.8",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "55"
      },
      {
        whenPoured: "2019-05-17T15:12:02",
        candleHashId: "3DNR",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "55"
      },
      {
        whenPoured: "2019-05-17T15:12:30",
        candleHashId: "36B3",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "56"
      }
    ],
    name: "First Citronella Batch",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "185",
    notes:
      "Citronella is pretty potent. Maybe 8% is too much. Also seems like jar MWZM holds more than 10oz of 464 wax. Maybe 11 or 11.5 would be perfect."
  },
  {
    whenCreated: "2019-05-21",
    batchItems: [
      { type: "wax", hashId: "PBV3", weightOunces: "2.6" },
      { type: "wax", hashId: "3Z7P", weightOunces: "10.2" },
      { type: "fragrance-oil", hashId: "4JDB", weightOunces: "0.8" },
      { type: "fragrance-oil", hashId: "OK5E", weightOunces: "0.3" },
      { type: "dye-blocks", hashId: "VQWV", pieces: "0.1" }
    ],
    layers: [
      {
        whenPoured: "2019-05-22T00:48:00",
        candleHashId: "W19R",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "145",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "51"
      },
      {
        whenPoured: "2019-05-22T00:50:33",
        candleHashId: "RJVR",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "145",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "51"
      },
      {
        whenPoured: "2019-05-22T00:53:00",
        candleHashId: "RXOR",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "145",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "51"
      }
    ],
    name: "Beeswax Citronella Mix",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "135",
    notes:
      "Let the batch get too cool at slightly below 135 and it started to solidify. Heated up to 145 then poured."
  },
  {
    whenCreated: "2019-06-08",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "10.8" },
      { type: "wax", hashId: "PBV3", weightOunces: "1.2" },
      { type: "fragrance-oil", hashId: "4JDB", weightOunces: "0.8" },
      { type: "fragrance-oil", hashId: "GQRB", weightOunces: "0.2" },
      { type: "dye-blocks", hashId: "7B6Q", pieces: "0.1" }
    ],
    layers: [
      {
        whenPoured: "2019-06-08T15:08:50",
        candleHashId: "RVBW",
        preppedContainerWeightOunces: "8.2",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "155",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "52"
      },
      {
        whenPoured: "2019-06-08T15:14:06",
        candleHashId: "3K93",
        preppedContainerWeightOunces: "8.2",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "155",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "52"
      },
      {
        whenPoured: "2019-06-08T15:14:33",
        candleHashId: "REY3",
        preppedContainerWeightOunces: "0.1",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "155",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "52"
      },
      {
        whenPoured: "2019-06-08T15:15:13",
        candleHashId: "WNPR",
        preppedContainerWeightOunces: "0.1",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "155",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "52"
      }
    ],
    name: "10% Beeswax test batch",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-06-28",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "11.7" },
      { type: "wax", hashId: "3761", weightOunces: "1.6" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "GQRB", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.38" },
      { type: "dye-blocks", hashId: "VQPW", pieces: "0.1" }
    ],
    layers: [
      {
        whenPoured: "2019-06-28T19:11:44",
        candleHashId: "3ZLR",
        preppedContainerWeightOunces: "8.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "71",
        coolingRoomHumidityPercent: "54"
      },
      {
        whenPoured: "2019-06-28T19:13:28",
        candleHashId: "WLNR",
        preppedContainerWeightOunces: "8.8",
        containerTemperatureFahrenheit: "71",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "71",
        coolingRoomHumidityPercent: "54"
      },
      {
        whenPoured: "2019-06-28T19:14:08",
        candleHashId: "34X3",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "71",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "71",
        coolingRoomHumidityPercent: "54"
      },
      {
        whenPoured: "2019-06-28T19:14:33",
        candleHashId: "ROE3",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "71",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "71",
        coolingRoomHumidityPercent: "54"
      }
    ],
    name: "Coco Test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185",
    notes:
      "All candles placed in the oven at room temperature after pouring to slow down the cooling"
  },
  {
    whenCreated: "2019-08-21",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "11.7" },
      { type: "wax", hashId: "3761", weightOunces: "0.6" },
      { type: "wax", hashId: "157P", weightOunces: "0.6" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.025" },
      { type: "fragrance-oil", hashId: "GQRB", weightOunces: "0.02" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.025" }
    ],
    layers: [
      {
        whenPoured: "2019-08-21T23:30:29",
        candleHashId: "W943",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-21T23:35:40",
        candleHashId: "3QJW",
        preppedContainerWeightOunces: "8.7",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-21T23:36:33",
        candleHashId: "3M6R",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-21T23:37:01",
        candleHashId: "37GR",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Coco-Beeswax-Soy 5/5/90",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "No dye, cooled on the counter top"
  },
  {
    whenCreated: "2019-08-22",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "20" },
      { type: "wax", hashId: "3761", weightOunces: "1.1" },
      { type: "wax", weightOunces: "1.1", hashId: "157P" },
      { type: "fragrance-oil", hashId: "GRNR", weightOunces: "0.8" },
      { type: "fragrance-oil", hashId: "G5K7", weightOunces: "0.8" },
      { type: "dye-blocks", hashId: "7J57", pieces: "0.1" }
    ],
    layers: [
      {
        whenPoured: "2019-08-22T18:33:32",
        candleHashId: "WGN3",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-22T18:34:25",
        preppedContainerWeightOunces: "6.9",
        candleHashId: "WBZZ",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-22T18:34:54",
        candleHashId: "3PM3",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-22T18:35:25",
        candleHashId: "R2VR",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-22T18:35:44",
        candleHashId: "WYQ3",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        whenPoured: "2019-08-22T18:36:05",
        candleHashId: "35KB",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "135",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Green Apple Sage Fall Test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-09-02",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "11.5" },
      { type: "wax", hashId: "3761", weightOunces: "1" },
      { type: "wax", hashId: "157P", weightOunces: "0.3" },
      { type: "fragrance-oil", hashId: "ODW8", weightOunces: "0.7" },
      { type: "fragrance-oil", hashId: "4338", weightOunces: ".4" },
      { type: "dye-blocks", hashId: "7MWW", pieces: ".1" }
    ],
    layers: [
      {
        candleHashId: "3KP9",
        whenPoured: "2019-09-02T17:20:12",
        preppedContainerWeightOunces: "9",
        containerTemperatureFahrenheit: "80",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RE2Y",
        whenPoured: "2019-09-02T17:20:12",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WN2P",
        whenPoured: "2019-09-02T17:20:12",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Coffee Leather 50/50 2/8 bee-coco test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-09-02",
    batchItems: [
      { type: "wax", hashId: "3Z7P", weightOunces: "11.5" },
      { type: "wax", hashId: "157P", weightOunces: "0.3" },
      { type: "wax", hashId: "3761", weightOunces: "1" },
      { type: "fragrance-oil", hashId: "GQPB", weightOunces: "0.5" },
      { type: "fragrance-oil", hashId: "GWM3", weightOunces: "0.7" },
      { type: "dye-blocks", hashId: "O6RZ", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "3Z9L",
        whenPoured: "2019-09-02T18:04:11",
        preppedContainerWeightOunces: "9",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "170",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WLLN",
        whenPoured: "2019-09-02T18:04:11",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "170",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "345X",
        whenPoured: "2019-09-02T18:04:11",
        preppedContainerWeightOunces: "0.2",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "170",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "birch vetiver bee-coco 2/8 hot pour",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185",
    notes:
      "Finished off the vetiver small bottle so this is prob more like 9% FO"
  },
  {
    whenCreated: "2019-09-04",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "11.3" },
      { type: "wax", hashId: "157P", weightOunces: "0.1" },
      { type: "wax", hashId: "3761", weightOunces: "0.35" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.75" },
      { type: "dye-blocks", hashId: "OLZY", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "ROPE",
        whenPoured: "2019-09-04T20:12:12",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Vetiver minimal bee-coco test 1/3/96",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-09-04",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "11.4" },
      { type: "wax", hashId: "3761", weightOunces: "0.4" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.75" },
      { type: "dye-blocks", hashId: "VQPW", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "38V5",
        whenPoured: "2019-09-04T20:18:14",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "145",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Vetiver minimal coco test 3/97",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-12-01",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "8.03" },
      { type: "wax", hashId: "157P", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "7BQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "W9J4",
        whenPoured: "2019-12-01T19:55:49",
        preppedContainerWeightOunces: "10",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "3/0 Beeswax-Coco Test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-12-01",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.60" },
      { type: "wax", hashId: "157P", weightOunces: "0.25" },
      { type: "wax", hashId: "3761", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "7BQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "3QQJ",
        whenPoured: "2019-12-01T19:55:58",
        preppedContainerWeightOunces: "10.1",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "3/5 Beeswax-Coco Test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-12-01",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.21" },
      { type: "wax", hashId: "157P", weightOunces: "0.25" },
      { type: "wax", hashId: "3761", weightOunces: "0.83" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "7BQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "3MX6",
        whenPoured: "2019-12-01T19:56:06",
        preppedContainerWeightOunces: "9.0",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "3/10 Beeswax-Coco Test",
    dyeAddTemperatureFahrenheit: "185",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "8" },
      { type: "wax", hashId: "157P", weightOunces: "0.17" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "OGX7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "376G",
        whenPoured: "2019-12-02T14:56:13",
        preppedContainerWeightOunces: "8.8",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/0 Beeswax Coco Test",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "Wax cloudy around 110, solidified around 98"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.6" },
      { type: "wax", hashId: "157P", weightOunces: "0.17" },
      { type: "wax", hashId: "3761", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "OGX7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WYPQ",
        whenPoured: "2019-12-02T14:56:24",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/5 Beeswax Coco test",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "Wax cloudy around 110 solidified around 96"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.3" },
      { type: "wax", hashId: "157P", weightOunces: "0.17" },
      { type: "wax", hashId: "3761", weightOunces: "0.83" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.5" },
      { type: "dye-blocks", hashId: "OGX7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "355B",
        whenPoured: "2019-12-02T14:56:23",
        preppedContainerWeightOunces: "8.7",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/10 Beeswax Coco Test",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "Wax cloudy around 110, solidified around 95"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "8.17" },
      { type: "wax", hashId: "157P", weightOunces: "0.08" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "O34V", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "R29V",
        whenPoured: "2019-12-02T16:17:54",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "138",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "1/0 Beeswax Coco Test",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "Started getting cloudy at about 110"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.79" },
      { type: "wax", hashId: "157P", weightOunces: "0.08" },
      { type: "wax", hashId: "3761", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "O34V", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WYPQ",
        whenPoured: "2019-12-02T16:18:01",
        preppedContainerWeightOunces: "10.0",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "1/5 Beeswax Coco",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "First starting to cloud up at 112"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.35" },
      { type: "wax", hashId: "157P", weightOunces: "0.08" },
      { type: "wax", hashId: "3761", weightOunces: "0.83" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "O34V", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "355B",
        whenPoured: "2019-12-02T16:18:06",
        preppedContainerWeightOunces: "8.5",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "134",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "1/10 Beeswax Coco",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "First starting to cloud up at 110"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "8.26" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "7ZQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WB2Z",
        whenPoured: "2019-12-02T18:36:55",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "0/0 Beeswax Coco",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "First cloudy at 116"
  }
];
