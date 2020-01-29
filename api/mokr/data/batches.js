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
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.85" },
      { type: "wax", hashId: "3761", weightOunces: "0.43" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "7ZQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "36BB",
        whenPoured: "2019-12-02T18:37:07",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "0/5 Beeswax Coco",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "First cloudy at 113"
  },
  {
    whenCreated: "2019-12-02",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "7.43" },
      { type: "wax", hashId: "3761", weightOunces: "0.83" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.53" },
      { type: "dye-blocks", hashId: "7ZQ7", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "3DEN",
        whenPoured: "2019-12-02T18:37:17",
        preppedContainerWeightOunces: "8.6",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "140",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "0/10 Beeswax Coco",
    dyeAddTemperatureFahrenheit: "150",
    fragranceAddTemperatureFahrenheit: "185",
    notes: "First cloudy at 106"
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "16.52" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "1.05" },
      { type: "dye-blocks", hashId: "7ZQ7", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "W9X4",
        whenPoured: "2019-12-03T17:07:06",
        preppedContainerWeightOunces: "8.8",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3QVJ",
        whenPoured: "2019-12-03T17:07:06",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "110",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "464 Cold Pour Test",
    dyeAddTemperatureFahrenheit: "170",
    fragranceAddTemperatureFahrenheit: "140",
    notes:
      "Uneven pours. And the 110 pour was already pretty cloudy. Cooled extremely quickly though and the 120 was clear."
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "14.87" },
      { type: "wax", hashId: "157P", weightOunces: "0.33" },
      { type: "wax", hashId: "3761", weightOunces: "1.32" },
      { type: "fragrance-oil", hashId: "GMDW", weightOunces: "0.8" },
      { type: "dye-blocks", hashId: "OGX7", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "3M76",
        whenPoured: "2019-12-03T17:07:00",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37NG",
        whenPoured: "2019-12-03T17:07:00",
        preppedContainerWeightOunces: "8.8",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "110",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/8/90 Cold Pour Test",
    dyeAddTemperatureFahrenheit: "170",
    fragranceAddTemperatureFahrenheit: "140",
    notes:
      "Uneven pours And the 110 pour was almost goopy coming out. Interested to see how it turns out. The 120 was clear though"
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "6.85" },
      { type: "wax", hashId: "157P", weightOunces: "0.17" },
      { type: "wax", hashId: "3761", weightOunces: "1.24" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.6" },
      { type: "dye-blocks", hashId: "OWXV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WGYN",
        whenPoured: "2019-12-03T21:52:05",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "115",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/15/83 Cold Pour",
    dyeAddTemperatureFahrenheit: "160",
    fragranceAddTemperatureFahrenheit: "135",
    notes:
      "First filaments at 110, cloudy by 100. The black die block actually didnt completely dissolve. Cooled sitting on an open cardboard box"
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "1KVP", weightOunces: "6.36" },
      { type: "wax", hashId: "157P", weightOunces: "0.17" },
      { type: "wax", hashId: "3761", weightOunces: "1.65" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.6" },
      { type: "dye-blocks", hashId: "OWXV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "3POM",
        whenPoured: "2019-12-03T21:52:17",
        preppedContainerWeightOunces: "8.9",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "115",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/20/77 Cold Pour",
    dyeAddTemperatureFahrenheit: "160",
    fragranceAddTemperatureFahrenheit: "135",
    notes:
      "Seemed to have a lower melt point. First filaments at 107, cloudy by 97. Black die block didnt completely dissolve. Maybe need less or a higher temp for longer. Cooled sitting in an open cardboard box."
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "4.87" },
      { type: "wax", hashId: "157P", weightOunces: "0.18" },
      { type: "wax", hashId: "3761", weightOunces: "0.89" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.38" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.05" }
    ],
    layers: [
      {
        candleHashId: "R2XV",
        whenPoured: "2019-12-03T22:53:49",
        preppedContainerWeightOunces: "6.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "3/15/82 Libby Test",
    dyeAddTemperatureFahrenheit: "170",
    fragranceAddTemperatureFahrenheit: "140",
    notes:
      "First filaments at 114, cloudy at 108. Clear on pour, but seemed a little thick. Cooled sitting on a piece of a cardboard."
  },
  {
    whenCreated: "2019-12-03",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "4.58" },
      { type: "wax", hashId: "157P", weightOunces: "0.18" },
      { type: "wax", hashId: "3761", weightOunces: "1.2" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.38" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.05" }
    ],
    layers: [
      {
        candleHashId: "WYMQ",
        whenPoured: "2019-12-03T23:02:59",
        preppedContainerWeightOunces: "6.8",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "3/20/77 Libby Test",
    dyeAddTemperatureFahrenheit: "170",
    fragranceAddTemperatureFahrenheit: "140",
    notes:
      "First filaments at 111, cloudy at 104. Clear on pour but a little thick. Cooled sitting on a piece of cardboard."
  },
  {
    whenCreated: "2019-12-04",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.32" },
      { type: "wax", hashId: "3761", weightOunces: "1.27" },
      { type: "wax", hashId: "3XYP", weightOunces: "14.24" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "1.01" },
      { type: "dye-blocks", hashId: "OEWO", pieces: "0.05" }
    ],
    layers: [
      {
        candleHashId: "35XB",
        whenPoured: "2019-12-04T18:19:09",
        preppedContainerWeightOunces: "5.8",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50",
        pourTemperatureFahrenheit: "185",
        containerTemperatureFahrenheit: "150"
      },
      {
        candleHashId: "WBOZ",
        whenPoured: "2019-12-04T18:19:09",
        preppedContainerWeightOunces: "5.8",
        containerTemperatureFahrenheit: "70",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "36XB",
        whenPoured: "2019-12-04T18:19:09",
        preppedContainerWeightOunces: "14.5",
        containerTemperatureFahrenheit: "150",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "2/8 Beeswax Coco Temp Test",
    dyeAddTemperatureFahrenheit: "200",
    fragranceAddTemperatureFahrenheit: "200"
  },
  {
    whenCreated: "2019-12-04",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.24" },
      { type: "wax", hashId: "3761", weightOunces: "0.79" },
      { type: "wax", hashId: "3XYP", weightOunces: "14.79" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "1.01" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.05" }
    ],
    layers: [
      {
        candleHashId: "3DNN",
        whenPoured: "2019-12-04T18:19:29",
        preppedContainerWeightOunces: "5.8",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50",
        containerTemperatureFahrenheit: "150"
      },
      {
        candleHashId: "RJ6V",
        whenPoured: "2019-12-04T18:19:29",
        preppedContainerWeightOunces: "5.8",
        containerTemperatureFahrenheit: "70",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RXPO",
        whenPoured: "2019-12-04T18:19:29",
        preppedContainerWeightOunces: "14.5",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50",
        containerTemperatureFahrenheit: "150"
      }
    ],
    name: "1.5/5 Beeswax Coco Temp Test",
    dyeAddTemperatureFahrenheit: "200",
    fragranceAddTemperatureFahrenheit: "200"
  },
  {
    whenCreated: "2019-12-05",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.43" },
      { type: "fragrance-oil", hashId: "GQPB", weightOunces: "0.54" },
      { type: "dye-blocks", hashId: "71KV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "RVGB",
        whenPoured: "2019-12-05T17:31:21",
        preppedContainerWeightOunces: "6.7",
        containerTemperatureFahrenheit: "150",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3KZ9",
        whenPoured: "2019-12-05T17:31:21",
        preppedContainerWeightOunces: "6.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "1.5/5 Hot Pour Jar Temp Test",
    dyeAddTemperatureFahrenheit: "200",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-05",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.43" },
      { type: "fragrance-oil", hashId: "GQPB", weightOunces: "0.54" },
      { type: "dye-blocks", hashId: "OEWO", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WNOP",
        whenPoured: "2019-12-05T17:32:34",
        preppedContainerWeightOunces: "6.7",
        containerTemperatureFahrenheit: "150",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3ZYL",
        whenPoured: "2019-12-05T17:32:34",
        preppedContainerWeightOunces: "6.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "1.5/5 Cold Pour Jar Temp Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "140",
    notes: ""
  },
  {
    whenCreated: "2019-12-06",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "11.03" },
      { type: "wax", hashId: "157P", weightOunces: "0.18" },
      { type: "wax", hashId: "3761", weightOunces: "0.59" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.75" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "34JX",
        whenPoured: "2019-12-06T16:38:40",
        preppedContainerWeightOunces: "8.7",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50",
        containerTemperatureFahrenheit: "150"
      },
      {
        candleHashId: "ROVE",
        whenPoured: "2019-12-06T16:38:40",
        preppedContainerWeightOunces: "8.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Hot pour Mason Jar Temp test",
    dyeAddTemperatureFahrenheit: "200",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-06",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "11.03" },
      { type: "wax", hashId: "157P", weightOunces: "0.18" },
      { type: "wax", weightOunces: "0.59", hashId: "3761" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.75" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "W9V4",
        whenPoured: "2019-12-06T16:38:39",
        preppedContainerWeightOunces: "8.7",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50",
        containerTemperatureFahrenheit: "150"
      },
      {
        candleHashId: "3QGJ",
        whenPoured: "2019-12-06T16:38:39",
        preppedContainerWeightOunces: "8.7",
        containerTemperatureFahrenheit: "72",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "72",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Cold Pour Mason Jar Temp test",
    dyeAddTemperatureFahrenheit: "200",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-08",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.26" },
      { type: "wax", hashId: "3761", weightOunces: "0.85" },
      { type: "wax", hashId: "3XYP", weightOunces: "15.89" },
      { type: "fragrance-oil", hashId: "49BQ", weightOunces: "0.62" },
      { type: "fragrance-oil", hashId: "4NV8", weightOunces: "0.62" },
      { type: "fragrance-oil", hashId: "486E", weightOunces: "0.62" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "371G",
        whenPoured: "2019-12-08T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WGGN",
        whenPoured: "2019-12-08T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3P4M",
        whenPoured: "2019-12-08T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R26V",
        whenPoured: "2019-12-08T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Straight Libby Wick Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195",
    notes: ""
  },
  {
    whenCreated: "2019-12-08",
    notes: "definitely need more honeycomb",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.26" },
      { type: "wax", hashId: "3761", weightOunces: "0.85" },
      { type: "wax", hashId: "3XYP", weightOunces: "15.89" },
      { type: "fragrance-oil", hashId: "OKVV", weightOunces: "0.62" },
      { type: "fragrance-oil", hashId: "41ZW", weightOunces: "0.62" },
      { type: "fragrance-oil", hashId: "GX5V", weightOunces: "0.62" },
      { type: "dye-blocks", hashId: "71KV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "36EB",
        whenPoured: "2019-12-09T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3DBN",
        whenPoured: "2019-12-09T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3599",
        whenPoured: "2019-12-09T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WBKV",
        whenPoured: "2019-12-09T23:17:54",
        preppedContainerWeightOunces: "8.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Fruit punch wick test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195",
    notes: ""
  },
  {
    whenCreated: "2019-12-09",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.43" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.10" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.28" },
      { type: "fragrance-oil", hashId: "411L", weightOunces: "0.28" },
      { type: "fragrance-oil", hashId: "G7Q8", weightOunces: "0.28" }
    ],
    layers: [
      {
        candleHashId: "RXK2",
        whenPoured: "2019-12-09T22:37:50",
        preppedContainerWeightOunces: "6.67",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W18Z",
        whenPoured: "2019-12-09T22:37:50",
        preppedContainerWeightOunces: "6.49",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Bowsman Scent and Wick Test",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-09",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.43" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.10" },
      { type: "fragrance-oil", hashId: "GVQ8", weightOunces: "0.28" },
      { type: "fragrance-oil", hashId: "GR1R", weightOunces: "0.28" },
      { type: "fragrance-oil", hashId: "49DQ", weightOunces: "0.28" },
      { type: "dye-blocks", hashId: "OWXV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "RV27",
        whenPoured: "2019-12-09T22:38:02",
        preppedContainerWeightOunces: "6.54",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3KME",
        whenPoured: "2019-12-09T22:38:02",
        preppedContainerWeightOunces: "6.61",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus Scent and Wick Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-10",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "3.98" },
      { type: "wax", hashId: "157P", weightOunces: "0.07" },
      { type: "wax", hashId: "3761", weightOunces: "0.24" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "0.19" },
      { type: "fragrance-oil", hashId: "GVXP", weightOunces: "0.19" },
      { type: "fragrance-oil", hashId: "48DE", weightOunces: "0.19" }
    ],
    layers: [
      {
        candleHashId: "WLM5",
        whenPoured: "2019-12-10T23:53:03",
        preppedContainerWeightOunces: "6.50",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Juniper Rework Amber Tumbler",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "195",
    notes: "First test of higher than 10% load"
  },
  {
    whenCreated: "2019-12-10",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "3.98" },
      { type: "wax", hashId: "157P", weightOunces: "0.07" },
      { type: "wax", hashId: "3761", weightOunces: "0.24" },
      { type: "fragrance-oil", hashId: "GR1R", weightOunces: "0.15" },
      { type: "fragrance-oil", hashId: "49DQ", weightOunces: "0.15" },
      { type: "fragrance-oil", hashId: "GZ1M", weightOunces: "0.15" },
      { type: "fragrance-oil", hashId: "OKKE", weightOunces: "0.15" }
    ],
    layers: [
      {
        candleHashId: "34Q2",
        whenPoured: "2019-12-10T23:53:14",
        preppedContainerWeightOunces: "6.50",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus Rework Amber Tumbler",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "195",
    notes: "first test of above 10% load"
  },

  // juniper mint wick down test
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "GVXP", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "48DE", weightOunces: "0.35" }
    ],
    layers: [
      {
        candleHashId: "38KY",
        whenPoured: "2019-12-12T00:28:29",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W9KP",
        whenPoured: "2019-12-12T00:28:29",
        preppedContainerWeightOunces: "7.09",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Juniper-Mint-Library Wick Down Test",
    fragranceAddTemperatureFahrenheit: "195"
  },
  // Krampus 3.0 Wick Down Test
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "OKKE", weightOunces: "0.29" },
      { type: "fragrance-oil", hashId: "GR1R", weightOunces: "0.29" },
      { type: "fragrance-oil", hashId: "49DQ", weightOunces: "0.29" },
      { type: "fragrance-oil", hashId: "GMYR", weightOunces: "0.29" }
    ],
    layers: [
      {
        candleHashId: "3Q87",
        whenPoured: "2019-12-12T00:28:41",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3MML",
        whenPoured: "2019-12-12T00:28:41",
        preppedContainerWeightOunces: "6.91",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus 3.0 Wick Down Test",
    fragranceAddTemperatureFahrenheit: "195"
  },
  // Holiday Punch Wick Down Test
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "OKVV", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "41ZW", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "GX5V", weightOunces: "0.38" }
    ],
    layers: [
      {
        candleHashId: "378M",
        whenPoured: "2019-12-12T00:28:59",
        preppedContainerWeightOunces: "6.87",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WGPM",
        whenPoured: "2019-12-12T00:28:59",
        preppedContainerWeightOunces: "7.02",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Holiday Punch Wick Down Test",
    fragranceAddTemperatureFahrenheit: "195"
  },
  // Tobacco Caramel Wick Down Test
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "3XYP", weightOunces: "3.81" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "OK3V", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "G7Q8", weightOunces: "0.28" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.12" },
      { type: "wax", hashId: "1KVP", weightOunces: "4.14" }
    ],
    layers: [
      {
        candleHashId: "3PK1",
        whenPoured: "2019-12-12T00:29:10",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R2BX",
        whenPoured: "2019-12-12T00:29:10",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Tobacco Caramel Bergamot Wick Down Test",
    fragranceAddTemperatureFahrenheit: "195",
    notes: "finished a bag of soy wax"
  },
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "wax", hashId: "3M41", weightOunces: "7.95" },
      { type: "fragrance-oil", hashId: "GR1R", weightOunces: "0.32" },
      { type: "fragrance-oil", hashId: "GW7X", weightOunces: "0.32" },
      { type: "fragrance-oil", hashId: "42MJ", weightOunces: "0.32" },
      { type: "fragrance-oil", hashId: "OKKE", weightOunces: "0.09" },
      { type: "fragrance-oil", hashId: "4J3Y", weightOunces: "0.09" }
    ],
    layers: [
      {
        candleHashId: "W15Z",
        whenPoured: "2019-12-12T20:25:59",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50",
        preppedContainerWeightOunces: "6.78"
      },
      {
        candleHashId: "RVO7",
        whenPoured: "2019-12-12T20:25:59",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50",
        preppedContainerWeightOunces: "6.81"
      }
    ],
    name: "Krampus 4.0 Scent and Wick Test",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-12",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "wax", hashId: "3M41", weightOunces: "7.95" },
      { type: "fragrance-oil", hashId: "GQPB", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "4NYL", weightOunces: "0.38" },
      { type: "fragrance-oil", hashId: "GQRB", weightOunces: "0.38" }
    ],
    layers: [
      {
        candleHashId: "3K2E",
        whenPoured: "2019-12-12T20:26:10",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50",
        preppedContainerWeightOunces: "7.09"
      },
      {
        candleHashId: "REO9",
        whenPoured: "2019-12-12T20:26:10",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50",
        preppedContainerWeightOunces: "6.72"
      }
    ],
    name: "Birch Teakwood Lav Scent and Wick Test",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "195"
  },
  // krampus 5
  {
    whenCreated: "2019-12-13",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "OERB", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "42J4", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "G5W7", weightOunces: "0.41" },
      // TODO cypress bayberry
      { type: "fragrance-oil", hashId: "G5W7", weightOunces: "0.41" }
    ],
    layers: [
      {
        candleHashId: "34D2",
        whenPoured: "2019-12-13T22:46:52",
        preppedContainerWeightOunces: "6.88",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RO8J",
        whenPoured: "2019-12-13T22:46:52",
        preppedContainerWeightOunces: "6.93",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus 5.0 Fireside Cypress",
    fragranceAddTemperatureFahrenheit: "165"
  },
  // krampus 6.0
  {
    whenCreated: "2019-12-13",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "7.95" },
      { type: "wax", hashId: "157P", weightOunces: "0.13" },
      { type: "wax", hashId: "3761", weightOunces: "0.42" },
      { type: "fragrance-oil", hashId: "OERB", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "42J4", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.12" },
      { type: "fragrance-oil", hashId: "49DQ", weightOunces: "0.41" },
      { type: "fragrance-oil", hashId: "4N88", weightOunces: "0.41" }
    ],
    layers: [
      {
        candleHashId: "389Y",
        whenPoured: "2019-12-13T22:47:05",
        preppedContainerWeightOunces: "7.07",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W9LP",
        whenPoured: "2019-12-13T22:47:05",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "150",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus 6.0 Mistletoe Spruce",
    fragranceAddTemperatureFahrenheit: "165"
  },
  {
    whenCreated: "2019-12-15",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "14.68" },
      { type: "wax", hashId: "157P", weightOunces: "0.24" },
      { type: "wax", hashId: "3761", weightOunces: "0.79" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "0.75" },
      { type: "fragrance-oil", hashId: "GVXP", weightOunces: "0.75" },
      { type: "fragrance-oil", hashId: "48DE", weightOunces: "0.64" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "WG4M",
        whenPoured: "2019-12-15T16:19:59",
        preppedContainerWeightOunces: "7.21",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3P51",
        whenPoured: "2019-12-15T16:19:59",
        preppedContainerWeightOunces: "4.21",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R2QX",
        whenPoured: "2019-12-15T16:19:59",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Juniper Mint Library",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-15",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "14.68" },
      { type: "wax", hashId: "157P", weightOunces: "0.24" },
      { type: "wax", hashId: "3761", weightOunces: "0.79" },
      { type: "fragrance-oil", hashId: "OKVV", weightOunces: "0.71" },
      { type: "fragrance-oil", hashId: "GYXM", weightOunces: "0.71" },
      { type: "fragrance-oil", hashId: "41ZW", weightOunces: "0.71" },
      { type: "dye-blocks", hashId: "71KV", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "WYYV",
        whenPoured: "2019-12-15T16:11:55",
        preppedContainerWeightOunces: "6.89",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "35Q9",
        whenPoured: "2019-12-15T16:11:55",
        preppedContainerWeightOunces: "4.21",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WBPV",
        whenPoured: "2019-12-15T16:11:55",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Holiday Punch Dye Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-15",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "14.68" },
      { type: "wax", hashId: "157P", weightOunces: "0.24" },
      { type: "wax", hashId: "3761", weightOunces: "0.79" },
      { type: "fragrance-oil", hashId: "OK3V", weightOunces: "0.71" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.71" },
      { type: "fragrance-oil", hashId: "G7Q8", weightOunces: "0.51" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.21" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "36YY",
        whenPoured: "2019-12-15T16:12:09",
        preppedContainerWeightOunces: "6.90",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3DMJ",
        whenPoured: "2019-12-15T16:12:09",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RJ58",
        whenPoured: "2019-12-15T16:12:09",
        preppedContainerWeightOunces: "4.21",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Salty Tobacco Caramel Dye Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-15",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "14.68" },
      { type: "wax", hashId: "157P", weightOunces: "0.24" },
      { type: "wax", hashId: "3761", weightOunces: "0.79" },
      { type: "fragrance-oil", hashId: "G5W7", weightOunces: "0.75" },
      { type: "fragrance-oil", hashId: "GW7X", weightOunces: "0.39" },
      { type: "fragrance-oil", hashId: "42J4", weightOunces: "0.21" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.21" },
      { type: "fragrance-oil", hashId: "OERB", weightOunces: "0.21" },
      { type: "fragrance-oil", hashId: "4N88", weightOunces: "0.39" },
      { type: "dye-blocks", hashId: "7R6W", pieces: "0.05" }
    ],
    layers: [
      {
        candleHashId: "RX92",
        whenPoured: "2019-12-15T16:42:51",
        preppedContainerWeightOunces: "6.83",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W19Z",
        whenPoured: "2019-12-15T16:42:51",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RV97",
        whenPoured: "2019-12-15T16:42:51",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "70",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus v5 Dye Test",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-16",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "40.39" },
      { type: "wax", hashId: "157P", weightOunces: "0.65" },
      { type: "wax", hashId: "3761", weightOunces: "0.64" },
      { type: "fragrance-oil", hashId: "GZQE", weightOunces: "1.96" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "2.05" },
      { type: "fragrance-oil", hashId: "GZ1M", weightOunces: "1.94" },
      { type: "dye-blocks", hashId: "OEWO", pieces: "0.2" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.77" }
    ],
    layers: [
      {
        candleHashId: "3ZNJ",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WL65",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "34V2",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "ROXJ",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "38ZY",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W97P",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3QY7",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3MDL",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37VM",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WGKM",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3PY1",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R25X",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "160",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WYJV",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "35D9",
        whenPoured: "2019-12-16T19:01:57",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "120",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Small Jar Pour Test Birch Vetiver Lavender",
    fragranceAddTemperatureFahrenheit: "195",
    dyeAddTemperatureFahrenheit: "180"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "25.06" },
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "fragrance-oil", hashId: "GVXP", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "48DE", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "1.09" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "36JY",
        whenPoured: "2019-12-17T18:31:03",
        preppedContainerWeightOunces: "6.99",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3DJJ",
        whenPoured: "2019-12-17T18:31:03",
        preppedContainerWeightOunces: "7.07",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RJY8",
        whenPoured: "2019-12-17T18:31:03",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RXD2",
        whenPoured: "2019-12-17T18:31:03",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W1LV",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Juniper Mint Library Gift Batch 1",
    fragranceAddTemperatureFahrenheit: "165",
    dyeAddTemperatureFahrenheit: "180"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "3M41", weightOunces: "6.00" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "fragrance-oil", hashId: "GVXP", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "48DE", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "1.09" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.2" },
      { type: "wax", hashId: "3NRP", weightOunces: "19.06" }
    ],
    layers: [
      {
        candleHashId: "REX9",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "6.89",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WNEK",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "7.07",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3ZXJ",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WL25",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RVL5",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3K1Q",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "0.163",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "REY7",
        whenPoured: "2019-12-17T18:40:40",
        preppedContainerWeightOunces: "0.163",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Juniper Mint Library Gift Batch 2",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "165"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "3NRP", weightOunces: "25.06" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "fragrance-oil", hashId: "OKVV", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "GYXM", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "41ZW", weightOunces: "1.20" },
      { type: "dye-blocks", hashId: "V29B", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "W9ZP",
        whenPoured: "2019-12-17T19:42:59",
        preppedContainerWeightOunces: "7.11",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3QE7",
        whenPoured: "2019-12-17T19:42:59",
        preppedContainerWeightOunces: "6.69",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3M2L",
        whenPoured: "2019-12-17T19:42:59",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37XM",
        whenPoured: "2019-12-17T19:42:59",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WNLD",
        whenPoured: "2019-12-17T19:42:59",
        preppedContainerWeightOunces: "4.18",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Holiday Punch Gift Batch 1",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "3NRP", weightOunces: "21.88" },
      { type: "wax", hashId: "157P", weightOunces: "0.35" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.17" },
      { type: "fragrance-oil", hashId: "41ZW", weightOunces: "1.05" },
      { type: "fragrance-oil", hashId: "OKVV", weightOunces: "1.05" },
      { type: "fragrance-oil", hashId: "GYXM", weightOunces: "1.05" },
      { type: "dye-blocks", hashId: "74ZV", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "WYEV",
        whenPoured: "2019-12-17T19:57:54",
        preppedContainerWeightOunces: "6.96",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3549",
        whenPoured: "2019-12-17T19:57:54",
        preppedContainerWeightOunces: "7.08",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WBDV",
        whenPoured: "2019-12-17T19:57:54",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Holiday Punch Gift Batch 2",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "165"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "3NRP", weightOunces: "25.06" },
      { type: "fragrance-oil", hashId: "OK3V", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "G7Q8", weightOunces: "0.88" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.36" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "36MQ",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "6.95",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3DX5",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "7.06",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RJ8K",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RXQY",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "W9QE",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3Q2Q",
        whenPoured: "2019-12-17T20:48:37",
        preppedContainerWeightOunces: "0.16",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Salty Tobacco Caramel Gift Batch 1",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "3NRP", weightOunces: "25.06" },
      { type: "fragrance-oil", hashId: "OK3V", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "GV68", weightOunces: "0.45" },
      { type: "fragrance-oil", hashId: "G597", weightOunces: "0.75" },
      { type: "fragrance-oil", hashId: "G7Q8", weightOunces: "0.88" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.36" },
      { type: "dye-blocks", hashId: "VP1O", pieces: "0.1" }
    ],
    layers: [
      {
        candleHashId: "RE17",
        whenPoured: "2019-12-17T20:48:55",
        preppedContainerWeightOunces: "6.78",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WN8D",
        whenPoured: "2019-12-17T20:48:55",
        preppedContainerWeightOunces: "6.96",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3ZGZ",
        whenPoured: "2019-12-17T20:48:55",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "65",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WLG8",
        whenPoured: "2019-12-17T20:48:55",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3MG7",
        whenPoured: "2019-12-17T20:48:55",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Salty Tobacco Caramel Gift Batch 2",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "3NRP", weightOunces: "25.06" },
      { type: "fragrance-oil", hashId: "OERB", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "G5W7", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "42J4", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "GW7X", weightOunces: "1.28" },
      { type: "dye-blocks", hashId: "OWXV", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "W91E",
        whenPoured: "2019-12-17T21:36:20",
        preppedContainerWeightOunces: "6.88",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3QLQ",
        whenPoured: "2019-12-17T21:36:20",
        preppedContainerWeightOunces: "7.10",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3MK7",
        whenPoured: "2019-12-17T21:36:20",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37J1",
        whenPoured: "2019-12-17T21:36:20",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37Y1",
        whenPoured: "2019-12-17T21:36:20",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus Gift Batch 1",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2019-12-17",
    batchItems: [
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.34" },
      { type: "wax", hashId: "3NRP", weightOunces: "19.23" },
      { type: "wax", hashId: "38J3", weightOunces: "5.83" },
      { type: "fragrance-oil", hashId: "OERB", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "4JYB", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "G5W7", weightOunces: "1.28" },
      { type: "fragrance-oil", hashId: "42J4", weightOunces: "0.36" },
      { type: "fragrance-oil", hashId: "GW7X", weightOunces: "1.28" },
      { type: "dye-blocks", hashId: "OWXV", pieces: "0.2" }
    ],
    layers: [
      {
        candleHashId: "WY2J",
        whenPoured: "2019-12-17T21:36:33",
        preppedContainerWeightOunces: "7.03",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3564",
        whenPoured: "2019-12-17T21:36:33",
        preppedContainerWeightOunces: "7.05",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WB44",
        whenPoured: "2019-12-17T21:36:33",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "36DQ",
        whenPoured: "2019-12-17T21:36:33",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "130",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WGLV",
        whenPoured: "2019-12-17T21:36:33",
        preppedContainerWeightOunces: "4.19",
        containerTemperatureFahrenheit: "68",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "68",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Krampus Gift Batch 2",
    dyeAddTemperatureFahrenheit: "180",
    fragranceAddTemperatureFahrenheit: "195",
    notes: "not 100% accurate soy data"
  },
  {
    whenCreated: "2020-01-09",
    batchItems: [
      { type: "wax", hashId: "38J3", weightOunces: "25.06" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.36" },
      { type: "wax", hashId: "157P", weightOunces: "0.40" },
      { type: "fragrance-oil", hashId: "OE78", weightOunces: "2.48" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.83" }
    ],
    layers: [
      {
        candleHashId: "3P9K",
        whenPoured: "2020-01-09T21:40:54",
        preppedContainerWeightOunces: "7.19",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R2MQ",
        whenPoured: "2020-01-09T21:40:54",
        preppedContainerWeightOunces: "7.19",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WY9J",
        whenPoured: "2020-01-09T21:40:54",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3584",
        whenPoured: "2020-01-09T21:40:54",
        preppedContainerWeightOunces: "4.23",
        containerTemperatureFahrenheit: "77",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "77",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Fig Tree Bergamot Heat Lamp Test",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2020-01-10",
    batchItems: [
      { type: "wax", hashId: "38J3", weightOunces: "12.53" },
      { type: "wax", hashId: "157P", weightOunces: "0.20" },
      { type: "wax", hashId: "P4J1", weightOunces: "0.67" },
      { type: "fragrance-oil", hashId: "OE78", weightOunces: "1.12" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.37" }
    ],
    layers: [
      {
        candleHashId: "RJPK",
        whenPoured: "2020-01-10T15:52:42",
        preppedContainerWeightOunces: "7.08",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RXMY",
        whenPoured: "2020-01-10T15:52:42",
        preppedContainerWeightOunces: "4.22",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Higher Heat Lamp Lower FO Fig Bergamot Test",
    fragranceAddTemperatureFahrenheit: "195",
    notes: "250w heat lamp but higher up on the counter light"
  },
  {
    whenCreated: "2020-01-10",
    batchItems: [
      { type: "wax", hashId: "38J3", weightOunces: "12.53" },
      { type: "wax", hashId: "157P", weightOunces: "0.20" },
      { type: "wax", hashId: "P4J1", weightOunces: "0.71" },
      { type: "fragrance-oil", hashId: "OE78", weightOunces: "1.12" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.37" }
    ],
    layers: [
      {
        candleHashId: "W1ZV",
        whenPoured: "2020-01-10T15:53:01",
        preppedContainerWeightOunces: "7.12",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "RV45",
        whenPoured: "2020-01-10T15:53:01",
        preppedContainerWeightOunces: "4.17",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "No A/C Test ~76 degrees",
    fragranceAddTemperatureFahrenheit: "195",
    notes: ""
  },
  {
    whenCreated: "2020-01-11",
    batchItems: [
      { type: "wax", hashId: "38J3", weightOunces: "18.7" },
      { type: "wax", hashId: "157P", weightOunces: "0.30" },
      { type: "wax", hashId: "P4J1", weightOunces: "1.00" },
      { type: "fragrance-oil", hashId: "OD3Q", weightOunces: "1.11" },
      { type: "fragrance-oil", hashId: "GQQK", weightOunces: "1.11" }
    ],
    layers: [
      {
        candleHashId: "3ZQZ",
        whenPoured: "2020-01-11T17:19:21",
        preppedContainerWeightOunces: "6.95",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WLQ8",
        whenPoured: "2020-01-11T17:19:21",
        preppedContainerWeightOunces: "7.09",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "165",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Orange Vanilla Soy blend warm apartment take 2",
    fragranceAddTemperatureFahrenheit: "195"
  },
  {
    whenCreated: "2020-01-11",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "19.00" },
      { type: "wax", hashId: "157P", weightOunces: "1.00" },
      { type: "fragrance-oil", hashId: "OD3Q", weightOunces: "1.36" },
      { type: "fragrance-oil", hashId: "GQQK", weightOunces: "1.36" }
    ],
    layers: [
      {
        candleHashId: "RO9O",
        whenPoured: "2020-01-11T18:48:29",
        preppedContainerWeightOunces: "7.11",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "38OG",
        whenPoured: "2020-01-11T18:48:29",
        preppedContainerWeightOunces: "7.29",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "Coco-83 5% Beeswax First Try",
    fragranceAddTemperatureFahrenheit: "205",
    notes: ""
  },
  {
    whenCreated: "2020-01-13",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "47.5" },
      { type: "wax", hashId: "157P", weightOunces: "2.5" },
      { type: "fragrance-oil", hashId: "4L32", weightOunces: "3.41" },
      { type: "fragrance-oil", hashId: "46M9", weightOunces: "3.41" }
    ],
    layers: [
      {
        candleHashId: "3QPQ",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "6.97",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "3ME7",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.25",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "37E1",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.11",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "WGDV",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.17",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "3PGK",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "6.87",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "R2JQ",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.18",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "WY7J",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "6.92",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "35V4",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.10",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        candleHashId: "WBM4",
        whenPoured: "2020-01-13T20:05:15",
        preppedContainerWeightOunces: "7.23",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      },
      {
        whenPoured: "2020-01-13T20:16:54",
        candleHashId: "36KQ",
        preppedContainerWeightOunces: "7.13",
        containerTemperatureFahrenheit: "75",
        pourTemperatureFahrenheit: "180",
        coolingRoomTemperatureFahrenheit: "75",
        coolingRoomHumidityPercent: "59"
      }
    ],
    name: "83/Bees 95/5 Wick Test",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-15",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "28.5" },
      { type: "wax", hashId: "157P", weightOunces: "1.50" },
      { type: "fragrance-oil", hashId: "OE78", weightOunces: "3.07" },
      { type: "fragrance-oil", hashId: "4N58", weightOunces: "0.34" },
      { type: "fragrance-oil", hashId: "498N", weightOunces: "0.68" }
    ],
    layers: [
      {
        candleHashId: "3KVQ",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "REB7",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WNND",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        preppedContainerWeightOunces: "7.13",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3ZLZ",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WLK8",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "341Z",
        whenPoured: "2020-01-15T16:31:29",
        containerTemperatureFahrenheit: "76",
        preppedContainerWeightOunces: "7.13",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "76",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "95/5 83/Bees Fig Bergamot Wick Series",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-16",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "38.8" },
      { type: "wax", hashId: "157P", weightOunces: "1.20" },
      { type: "fragrance-oil", hashId: "G597", weightOunces: "3.60" },
      { type: "fragrance-oil", hashId: "498N", weightOunces: "1.20" }
    ],
    layers: [
      {
        candleHashId: "38NG",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3QDQ",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3MZ7",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        preppedContainerWeightOunces: "7.13",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "37B1",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "WGXV",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "3P6K",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        preppedContainerWeightOunces: "7.13",

        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      },
      {
        candleHashId: "R2OQ",
        whenPoured: "2020-01-16T17:58:40",
        containerTemperatureFahrenheit: "73",
        preppedContainerWeightOunces: "7.13",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "50"
      }
    ],
    name: "97/3 98/Bees Test",
    fragranceAddTemperatureFahrenheit: "185"
  },
  {
    whenCreated: "2020-01-17",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "8.7" },
      { type: "wax", hashId: "157P", weightOunces: "0.30" },
      { type: "fragrance-oil", hashId: "GWW9", weightOunces: "0.50" },
      { type: "fragrance-oil", hashId: "GZXE", weightOunces: "0.50" }
    ],
    layers: [
      {
        whenPoured: "2020-01-24T21:22:01",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "205",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50",
        candleHashId: "365L",
        preppedContainerWeightOunces: "7.10"
      }
    ],
    name: "Candle Party Rita",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-17",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "8.7" },
      { type: "wax", hashId: "157P", weightOunces: "0.30" },
      { type: "fragrance-oil", hashId: "OEW8", weightOunces: "0.50" },
      { type: "fragrance-oil", hashId: "4NDL", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "OPQX", weightOunces: "0.25" }
    ],
    layers: [
      {
        whenPoured: "2020-01-24T21:22:01",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "205",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50",
        candleHashId: "3D6L",
        preppedContainerWeightOunces: "7.10"
      }
    ],
    name: "Candle Party Sameera",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-17",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "8.7" },
      { type: "wax", hashId: "157P", weightOunces: "0.30" },
      { type: "fragrance-oil", hashId: "GBZW", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "G5E9", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "GWV9", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "OEW8", weightOunces: "0.25" }
    ],
    layers: [
      {
        whenPoured: "2020-01-24T21:22:01",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "205",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50",
        candleHashId: "RJKM",
        preppedContainerWeightOunces: "7.10"
      }
    ],
    name: "Candle Party Vijay",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-17",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "8.7" },
      { type: "wax", hashId: "157P", weightOunces: "0.30" },
      { type: "fragrance-oil", hashId: "OPWX", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "GXX6", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "GZQE", weightOunces: "0.25" },
      { type: "fragrance-oil", hashId: "GZXE", weightOunces: "0.25" }
    ],
    layers: [
      {
        whenPoured: "2020-01-24T21:22:01",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "205",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "50",
        candleHashId: "RXNZ",
        preppedContainerWeightOunces: "7.10"
      }
    ],
    name: "Candle Party Al",
    dyeAddTemperatureFahrenheit: "",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-24",
    batchItems: [
      { type: "wax", hashId: "3GEP", weightOunces: "24.25" },
      { type: "wax", hashId: "157P", weightOunces: "0.75" },
      { type: "fragrance-oil", hashId: "46D2", weightOunces: "1.47" },
      { type: "fragrance-oil", hashId: "GZVB", weightOunces: "1.47" }
    ],
    layers: [
      {
        candleHashId: "REDV",
        whenPoured: "2020-01-25T20:15:10",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "49",
        preppedContainerWeightOunces: "7.10"
      },
      {
        candleHashId: "WN54",
        whenPoured: "2020-01-25T20:15:10",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "49",
        preppedContainerWeightOunces: "7.10"
      },
      {
        candleHashId: "3Z57",
        whenPoured: "2020-01-25T20:15:10",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "49",
        preppedContainerWeightOunces: "7.10"
      },
      {
        candleHashId: "WLDE",
        whenPoured: "2020-01-25T20:15:10",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "49",
        preppedContainerWeightOunces: "7.10"
      },
      {
        candleHashId: "34X5",
        whenPoured: "2020-01-25T20:15:10",
        containerTemperatureFahrenheit: "74",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "74",
        coolingRoomHumidityPercent: "49",
        preppedContainerWeightOunces: "7.10"
      }
    ],
    name: "97/3 Wick test 3 Pineapple Sherbert Mango",
    fragranceAddTemperatureFahrenheit: "205"
  },
  {
    whenCreated: "2020-01-28",
    batchItems: [
      { type: "wax", hashId: "PQ41", weightOunces: "24.00" },
      { type: "wax", hashId: "157P", weightOunces: "1.00" },
      { type: "fragrance-oil", hashId: "G597", weightOunces: "1.47" },
      { type: "fragrance-oil", hashId: "43EY", weightOunces: "1.47" }
    ],
    layers: [
      {
        candleHashId: "W9NK",
        whenPoured: "2020-01-28T20:19:34",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "45",
        preppedContainerWeightOunces: "7.68"
      },
      {
        candleHashId: "3QK4",
        whenPoured: "2020-01-28T20:19:34",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "45",
        preppedContainerWeightOunces: "7.72"
      },
      {
        candleHashId: "3MJD",
        whenPoured: "2020-01-28T20:19:34",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "45",
        preppedContainerWeightOunces: "7.77"
      },
      {
        candleHashId: "37KX",
        whenPoured: "2020-01-28T20:20:04",
        coolingRoomHumidityPercent: "45",
        preppedContainerWeightOunces: "7.54",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73"
      },
      {
        whenPoured: "2020-01-28T20:34:25",
        containerTemperatureFahrenheit: "73",
        pourTemperatureFahrenheit: "185",
        coolingRoomTemperatureFahrenheit: "73",
        coolingRoomHumidityPercent: "45",
        candleHashId: "WG98",
        preppedContainerWeightOunces: "7.53"
      }
    ],
    name: "96/4 Coco-83/Bees Hotter Double Wick",
    fragranceAddTemperatureFahrenheit: "205"
  }
];
