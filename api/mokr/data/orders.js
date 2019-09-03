const faker = require("faker");

module.exports = [
  {
    openDate: "2018-01-05",
    items: [
      {
        type: "misc-equipment",
        name: "8 Inch Glass Thermometer",
        count: "1",
        remaining: "0",
        price: "4.48",
        shareOfShippingPercent: "2.8",
        notes: "This broke after a drop"
      },
      {
        type: "misc-equipment",
        name: "Wick Bar",
        count: "12",
        remaining: "12",
        price: "4.93",
        shareOfShippingPercent: "2.8",
        notes: "Some of these are definitely lost..."
      },
      {
        type: "wax",
        category: "earthy",
        name: "Golden Brands 464 Soy Wax",
        material: "soy",
        weightPounds: "10",
        remaining: "0",
        price: "15.68",
        shareOfShippingPercent: "25"
      },
      {
        type: "wicks",
        name: 'Eco 2 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "10",
        series: "Eco",
        size: "12",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wick-stickers",
        name: "Wick Sticker (large)",
        count: "100",
        remaining: "0",
        price: "4.95",
        shareOfShippingPercent: "2.8"
      },
      {
        type: "jars",
        name: "8 oz. Candle Tin",
        waxToFillLineOunces: "5",
        overflowVolumeOunces: "8.5",
        waxToOverflowOunces: "",
        diameterInches: "2.95",
        color: "gray",
        count: "12",
        remaining: "0",
        price: "10.51",
        shareOfShippingPercent: "8.3"
      },
      {
        type: "jars",
        name: "8 oz. Jelly Jar",
        waxToFillLineOunces: "6.2",
        waxToOverflowOunces: "",
        overflowVolumeOunces: "8.3",
        diameterInches: "2.5",
        color: "clear",
        count: "12",
        remaining: "0",
        price: "4.91",
        shareOfShippingPercent: "8.3"
      },
      {
        type: "jars",
        name: "8 oz. Apothecary Jar",
        waxToFillLineOunces: "9.9",
        waxToOverflowOunces: "",
        overflowVolumeOunces: "14.5",
        diameterInches: "4",
        color: "clear",
        count: "12",
        remaining: "0",
        price: "8.91",
        shareOfShippingPercent: "8.3"
      },
      {
        type: "wicks",
        name: 'Eco 4 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "7",
        series: "Eco",
        size: "4",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 6 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "4",
        series: "Eco",
        size: "6",
        price: "2.25",
        shareOfShippingPercent: ".25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 8 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "0",
        series: "Eco",
        size: "6",
        price: "8",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 10 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "0",
        series: "Eco",
        size: "10",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 12 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "1",
        series: "Eco",
        size: "12",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 14 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "0",
        series: "Eco",
        size: "14",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 16 6" Pretabbed Wick',
        length: "6",
        count: "10",
        remaining: "3",
        series: "Eco",
        size: "16",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "wicks",
        name: 'Eco 1 3" Pretabbed Wick',
        length: "3",
        count: "10",
        remaining: "10",
        series: "Eco",
        size: "1",
        price: "2.25",
        shareOfShippingPercent: "0.25",
        notes:
          "Part of the ECO Wick Sample Kit 1 Wick kit item. But this is actually 2 of those combined."
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Antique Sandalwood",
        weightOunces: "1",
        remaining: "0.7",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Black Currant Tea",
        weightOunces: "1",
        remaining: "0.2",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Egyptian Amber",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Very Vanilla",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Caramelized Pralines",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Fraser Fir",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Apples and Maple Bourbon",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Cinnamon Chai",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Garden Mint",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "2.25"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Frankincense and Myrrh",
        weightOunces: "1",
        remaining: "0",
        price: "0",
        shareOfShippingPercent: "2.25",
        notes: "This was a free sample."
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Honeysuckle Jasmine",
        weightOunces: "0.5",
        remaining: "0",
        price: "0",
        shareOfShippingPercent: "2.25",
        notes: "This was a free sample."
      },
      {
        type: "dye-blocks",
        name: "Red Dye Block",
        pieces: "1",
        remaining: "0",
        color: "red",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8-piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        notes: "Part of an 8 piece Dye Block Sample Pack",
        name: "Lavender Dye Block",
        pieces: "1",
        remaining: "0",
        color: "lavender",
        price: "0.88",
        shareOfShippingPercent: "0.3"
      },
      {
        type: "dye-blocks",
        name: "Pink Dye Block",
        pieces: "1",
        remaining: "0.5",
        color: "pink",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        name: "Brown Dye Block",
        pieces: "1",
        remaining: "0.3",
        color: "brown",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        name: "Navy Blue Dye Block",
        pieces: "1",
        remaining: "0.1",
        color: "navy blue",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        name: "Pumpkin Dye Block",
        pieces: "1",
        remaining: "0.2",
        color: "pumpkin",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        name: "Canary Yellow Dye Block",
        pieces: "1",
        remaining: "0.3",
        color: "canary yellow",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      },
      {
        type: "dye-blocks",
        name: "Forest Green Dye Block",
        pieces: "1",
        remaining: "0.7",
        color: "forest green",
        price: "0.88",
        shareOfShippingPercent: "0.3",
        notes: "Part of an 8 piece Dye Block Sample Pack"
      }
    ],
    source: "Candle Science",
    subtotalCost: "103.44",
    shippingCost: "33.71",
    taxesAndFees: "0",
    totalCost: "137.15"
  },
  {
    openDate: "2018-05-07",
    items: [
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Frankincense and Myrrh",
        weightOunces: "4",
        remaining: "2",
        price: "8.50",
        shareOfShippingPercent: "38"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Coriander and Tonka",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "12"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Grapefruit and Mint",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "12"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Rain Water",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "12"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Sea Salt and Orchid",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "12",
        notes: ""
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Lavender",
        weightOunces: "1",
        remaining: "0.1",
        price: "2.41",
        shareOfShippingPercent: "12"
      }
    ],
    source: "Candle Science",
    subtotalCost: "20.55",
    shippingCost: "10.65",
    taxesAndFees: "0",
    totalCost: "31.20"
  },
  {
    openDate: "2018-05-21",
    items: [
      {
        type: "wicks",
        notes: "art of the ECO Wick Sample Kit.",
        name: 'ECO 1 3" Pretabbed Wick',
        length: "3",
        count: "5",
        remaining: "5",
        series: "Eco",
        size: "1",
        price: "1",
        shareOfShippingPercent: "0.5"
      },
      {
        type: "wicks",
        name: 'ECO 2 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "5",
        series: "Eco",
        size: "2",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 4 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "5",
        series: "Eco",
        size: "4",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 6 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "5",
        series: "Eco",
        size: "6",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 8 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "4",
        series: "Eco",
        size: "6",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 10 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "3",
        series: "Eco",
        size: "10",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 12 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "0",
        series: "Eco",
        size: "12",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 14 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "3",
        series: "Eco",
        size: "14",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "wicks",
        name: 'ECO 16 6" Pretabbed Wick',
        length: "6",
        count: "5",
        remaining: "3",
        series: "Eco",
        size: "16",
        price: "1",
        shareOfShippingPercent: "0.5",
        notes: "art of the ECO Wick Sample Kit."
      },
      {
        type: "jars",
        name: "8 oz. Candle Tin",
        diameterInches: "2.95",
        waxToFillLineOunces: "5",
        overflowVolumeOunces: "8.5",
        color: "gray",
        count: "12",
        remaining: "0",
        price: "10.51",
        shareOfShippingPercent: "10"
      },
      {
        type: "jars",
        name: "8 oz. Jelly Jar",
        diameterInches: "2.5",
        waxToFillLineOunces: "6.2",
        overflowVolumeOunces: "8.3",
        color: "clear",
        count: "12",
        remaining: "0",
        price: "5.16",
        shareOfShippingPercent: "20"
      },
      {
        type: "jars",
        name: "8 oz. Apothecary Jar",
        waxToFillLineOunces: "9.9",
        overflowVolumeOunces: "14.5",
        diameterInches: "4",
        color: "clear",
        count: "12",
        remaining: "0",
        price: "9.36",
        shareOfShippingPercent: "20"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Sandalwood",
        weightOunces: "1",
        remaining: "0.4",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Coriander and Tonka",
        weightOunces: "4",
        remaining: "4",
        price: "8.5",
        shareOfShippingPercent: "7"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Tomato Leaf",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Blue Spruce",
        weightOunces: "1",
        remaining: "0",
        price: "0",
        shareOfShippingPercent: "2.5",
        notes: "This was a free sample."
      },
      {
        type: "wicks",
        name: 'ECO .75 1" Pretabbed Wick',
        length: "1",
        count: "100",
        remaining: "58",
        series: "Eco",
        size: "0.75",
        price: "5.03",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Cedarwood Vanilla",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Fireside",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Hazelnut Coffee",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Orange Blossom",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Cool Citrus Basil",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Peppermint and Eucalyptus",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Vetiver",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Red Ginger Saffron",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Himalayan Bamboo",
        weightOunces: "1",
        remaining: "0.7",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Oakmoss and Amber",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Caribbean Teakwood",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Amber Noir",
        weightOunces: "1",
        remaining: "0.4",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Black Sea",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "2.5"
      },
      {
        type: "jars",
        name: "Clear Plastic Tealight Cup",
        diameterInches: "1.5",
        waxToFillLineOunces: "0.5",
        overflowVolumeOunces: "1",
        color: "clear",
        count: "100",
        remaining: "0",
        price: "8.39",
        shareOfShippingPercent: "10"
      }
    ],
    source: "Candle Science",
    subtotalCost: "92.10",
    shippingCost: "24.14",
    totalCost: "116.23",
    taxesAndFees: "0"
  },
  {
    openDate: "2018-11-14",
    items: [
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Leather",
        weightOunces: "1",
        remaining: "0.5",
        price: "0",
        shareOfShippingPercent: "5",
        notes: "This was a free sample."
      },
      {
        type: "dye-blocks",
        name: "Honeycomb Dye Block",
        pieces: "1",
        remaining: "0.8",
        color: "honeycomb",
        price: "0.99",
        shareOfShippingPercent: "5"
      },
      {
        type: "dye-blocks",
        name: "Black Dye Block",
        pieces: "1",
        remaining: "1",
        color: "black",
        price: "0.99",
        shareOfShippingPercent: "5"
      },
      {
        type: "dye-blocks",
        name: "Caribbean Blue Dye Block",
        pieces: "1",
        remaining: "1",
        color: "0.7",
        price: "0.99",
        shareOfShippingPercent: "5"
      },
      {
        type: "dye-blocks",
        name: "Seafoam Dye Block",
        pieces: "1",
        remaining: "0.40",
        color: "seafoam",
        price: "0.99",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Rosemary",
        weightOunces: "1",
        remaining: "0.8",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "other",
        name: "Moon Lake Musk",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Mango And Tangerine",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Lavender Chamomile",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Honeysuckle Jasmine",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Fireside",
        weightOunces: "1",
        remaining: "0.8",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Cypress and Bayberry",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "other",
        name: "Day at the Spa",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "other",
        name: "Christmas Hearth",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Red Ginger Saffron",
        weightOunces: "4",
        remaining: "3.2",
        price: "8.98",
        shareOfShippingPercent: "8"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Fallen Leaves",
        weightOunces: "1",
        remaining: "0.7",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Cinnamon Stick",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Whiskey",
        weightOunces: "4",
        remaining: "2.7",
        price: "8.98",
        shareOfShippingPercent: "8"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Cinnamon and Vanilla",
        weightOunces: "1",
        remaining: "0.4",
        price: "2.41",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Blue Spruce",
        weightOunces: "4",
        remaining: "4",
        price: "7.88",
        shareOfShippingPercent: "8"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Toasted Pumpkin Spice",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.41",
        shareOfShippingPercent: "5"
      }
    ],
    source: "Candle Science",
    subtotalCost: "61.13",
    shippingCost: "16.45",
    totalCost: "77.58"
  },
  {
    openDate: "2018-11-15",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Citron and Mandarin",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Fruit Slices",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Sparkling Pomelo",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Orange and Goji Berry",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Green Tea and Lemongrass",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Lemon Verbena",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "14"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Lemon Pound Cake",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "14"
      }
    ],
    source: "Candle Science",
    subtotalCost: "16.87",
    shippingCost: "13.88",
    totalCost: "30.75"
  },
  {
    openDate: "2018-12-01",
    items: [
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "White Birch",
        weightOunces: "1",
        remaining: "0",
        price: "0",
        notes: "This was a free sample.",
        shareOfShippingPercent: "13"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Oakmoss and Amber",
        weightOunces: "8",
        remaining: "7.6",
        price: "12.88",
        shareOfShippingPercent: "37"
      },
      {
        type: "wicks",
        name: 'ECO 14 6" Pretabbed Wick',
        length: "6",
        count: "100",
        remaining: "80",
        series: "Eco",
        size: "14",
        price: "8.44",
        shareOfShippingPercent: "13"
      },
      {
        type: "wicks",
        name: 'ECO 10 6" Pretabbed Wick',
        length: "6",
        count: "100",
        remaining: "90",
        series: "Eco",
        size: "10",
        price: "8.41",
        shareOfShippingPercent: "13"
      },
      {
        type: "wicks",
        name: 'ECO 12 6" Pretabbed Wick',
        length: "6",
        count: "100",
        remaining: "90",
        series: "Eco",
        size: "12",
        price: "8.42",
        shareOfShippingPercent: "13"
      },
      {
        type: "wick-stickers",
        name: "Wick Sticker Pro",
        count: "120",
        remaining: "63",
        price: "5.96",
        shareOfShippingPercent: "10"
      }
    ],
    source: "Candle Science",
    subtotalCost: "44.11",
    shippingCost: "9.47",
    totalCost: "53.58"
  },
  {
    openDate: "2019-01-03",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Fresh Coffee (unrevised version)",
        weightOunces: "1",
        remaining: "1",
        price: "0",
        shareOfShippingPercent: "4",
        notes:
          "This was a free sample. And this scent was revised by CS on 5/13/2019."
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Caribbean Teakwood",
        weightOunces: "4",
        remaining: "4",
        price: "8.28",
        shareOfShippingPercent: "18"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Cardamom and Star Anise",
        weightOunces: "1",
        remaining: "0",
        price: "2.41",
        shareOfShippingPercent: "4"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "White Birch",
        weightOunces: "4",
        remaining: "3.3",
        price: "8.98",
        shareOfShippingPercent: "18",
        notes: ""
      },
      {
        type: "dye-blocks",
        name: "Pumpkin Dye Block",
        pieces: "1",
        remaining: "1",
        color: "pumpkin",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Teal Dye Block",
        pieces: "1",
        remaining: "0.8",
        color: "teal",
        price: "1.19",
        shareOfShippingPercent: "4",
        notes: ""
      },
      {
        type: "dye-blocks",
        name: "Yellow Dye Block",
        pieces: "1",
        remaining: "1",
        color: "yellow",
        price: "0.99",
        shareOfShippingPercent: "4",
        notes: ""
      },
      {
        type: "dye-blocks",
        name: "Royal Blue Dye Block",
        pieces: "1",
        remaining: "0.8",
        color: "royal blue",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Royal Blue Dye Block",
        pieces: "1",
        remaining: "1",
        color: "royal blue",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Navy Blue Dye Block",
        pieces: "1",
        remaining: "1",
        color: "navy blue",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Avocado Dye Block",
        pieces: "1",
        remaining: "0.9",
        color: "avocado",
        price: "0.99",
        shareOfShippingPercent: "0"
      },
      {
        type: "dye-blocks",
        name: "Forest Green Dye Block",
        pieces: "2",
        remaining: "1",
        color: "forest green",
        price: "1.98",
        shareOfShippingPercent: "8",
        notes: "This was actually 2 that I've combined into one package"
      },
      {
        type: "dye-blocks",
        name: "Orchid Dye Block",
        pieces: "1",
        remaining: "1",
        color: "orchid",
        price: "1.19",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Merlot Dye Block",
        pieces: "1",
        remaining: "1",
        color: "merlot",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Merlot Dye Block",
        pieces: "1",
        remaining: "1",
        color: "merlot",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Orchid Dye Block",
        pieces: "1",
        remaining: "1",
        color: "orchid",
        price: "1.19",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Brown Dye Block",
        pieces: "1",
        remaining: "1",
        color: "brown",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Brown Dye Block",
        pieces: "1",
        remaining: "1",
        color: "brown",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Brown Dye Block",
        pieces: "1",
        remaining: "1",
        color: "brown",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Black Dye Block",
        pieces: "1",
        remaining: "1",
        color: "black",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Black Dye Block",
        pieces: "1",
        remaining: "1",
        color: "black",
        price: "0.99",
        shareOfShippingPercent: "4"
      },
      {
        type: "dye-blocks",
        name: "Black Dye Block",
        pieces: "1",
        remaining: "0",
        color: "black",
        price: "0.99",
        shareOfShippingPercent: "4",
        notes: "I have no idea where this went or if I ever got it."
      }
    ],
    source: "Candle Science",
    subtotalCost: "39.08",
    shippingCost: "9.47",
    totalCost: "48.55"
  },
  {
    openDate: "2018-12-12",
    items: [
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Sea Salt and Orchid",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Golden Rose",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Ocean Rose",
        weightOunces: "1",
        remaining: "0.6",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Hydrangea",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "wicks",
        name: 'ECO 8 6" Pretabbed Wicks',
        length: "6",
        count: "100",
        remaining: "41",
        series: "Eco",
        size: "8",
        price: "8.65",
        shareOfShippingPercent: "3"
      },
      {
        type: "jars",
        name: "8 oz. Apothecary Jar",
        waxToFillLineOunces: "9.9",
        overflowVolumeOunces: "14.5",
        diameterInches: "4",
        color: "clear",
        count: "12",
        remaining: "7",
        price: "9.36",
        shareOfShippingPercent: "26"
      },
      {
        type: "jars",
        name: "8 oz. Candle Tin",
        waxToFillLineOunces: "5",
        overflowVolumeOunces: "8.5",
        diameterInches: "2.95",
        color: "gray",
        count: "12",
        remaining: "3",
        price: "11.11",
        shareOfShippingPercent: "26"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Driftwood",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Frasier Fir",
        weightOunces: "4",
        remaining: "2.6",
        price: "8.50",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Holly Berry",
        weightOunces: "1",
        remaining: "0.8",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Honeysuckle",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Leather",
        weightOunces: "4",
        remaining: "4",
        price: "8.50",
        shareOfShippingPercent: "5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Sandalwood",
        weightOunces: "8",
        remaining: "8",
        price: "12.88",
        shareOfShippingPercent: "8"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Vetiver",
        weightOunces: "4",
        remaining: "0",
        price: "8.98",
        shareOfShippingPercent: "6"
      },
      {
        type: "warning-labels",
        name: "Kraft Warning Labels",
        color: "tan",
        count: "100",
        remaining: "70",
        price: "3.96",
        shareOfShippingPercent: "3",
        notes: "I think I left these in Orchard Lake."
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Chardonnay",
        weightOunces: "1",
        remaining: "0.6",
        price: "0",
        shareOfShippingPercent: "3",
        notes: "This was a free sample."
      }
    ],
    source: "Candle Science",
    subtotalCost: "88.81",
    shippingCost: "19.63",
    totalCost: "108.44"
  },
  {
    openDate: "2018-12-01",
    items: [
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Cardamom and Star Anise",
        weightOunces: "1",
        remaining: "0.4",
        price: "0",
        shareOfShippingPercent: "1",
        notes: "This was a free sample"
      },
      {
        type: "dye-blocks",
        name: "Red Dye Block",
        pieces: "1",
        remaining: "0",
        color: "red",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample pack"
      },
      {
        type: "dye-blocks",
        name: "Brown Dye Block",
        pieces: "1",
        remaining: "0",
        color: "brown",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Forest Green Dye Block",
        pieces: "1",
        remaining: "0",
        color: "forest green",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Pumpkin Dye Block",
        pieces: "1",
        remaining: "1",
        color: "pumpkin",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Canary Yellow Dye Block",
        pieces: "1",
        remaining: "0.8",
        color: "canary yello",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Lavender Dye Block",
        pieces: "1",
        remaining: "0.75",
        color: "lavender",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Pink Dye Block",
        pieces: "1",
        remaining: "1",
        color: "pink",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "dye-blocks",
        name: "Navy Blue Dye Block",
        pieces: "1",
        remaining: "1",
        color: "navy blue",
        price: "1",
        shareOfShippingPercent: "0.25",
        notes: "Part of a sample set"
      },
      {
        type: "wax",
        name: "Golden Brands 464 Soy Wax",
        material: "soy",
        weightPounds: "10",
        remaining: "0",
        price: "16.46",
        shareOfShippingPercent: "80"
      },
      {
        type: "jars",
        name: "8 oz. Candle Tin",
        waxToFillLineOunces: "5",
        overflowVolumeOunces: "8.5",
        diameterInches: "2.95",
        color: "gray",
        count: "12",
        remaining: "0",
        price: "11.11",
        shareOfShippingPercent: "13"
      }
    ],
    source: "Candle Science",
    subtotalCost: "35.57",
    shippingCost: "21.05",
    totalCost: "56.62"
  },
  {
    openDate: "2019-04-01",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Blood Orange",
        weightOunces: "1",
        remaining: "1",
        price: "0",
        shareOfShippingPercent: "3",
        notes: "This was a free sample"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "White Sage and Lavender",
        weightOunces: "1",
        remaining: "0.9",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Fresh Picked Cucumber",
        weightOunces: "4",
        remaining: "4",
        price: "8.27",
        shareOfShippingPercent: "9"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Cactus Flower and Jade",
        weightOunces: "4",
        remaining: "4",
        price: "8.98",
        shareOfShippingPercent: "9"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Black Cherry Merlot",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Magnolia and Peony",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Hibiscus Palm",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Strawberry Guava",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Tomato Leaf",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "3"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Very Vanilla",
        weightOunces: "4",
        remaining: "4",
        price: "8.02",
        shareOfShippingPercent: "9"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Lavender",
        weightOunces: "4",
        remaining: "3.6",
        price: "8.27",
        shareOfShippingPercent: "9"
      },
      {
        type: "jars",
        name: "Straight Sided Tumbler (Libbey) ",
        waxToFillLineOunces: "8.5",
        overflowVolumeOunces: "11.16",
        diameterInches: "3.06",
        color: "clear",
        count: "12",
        remaining: "3",
        price: "11.53",
        shareOfShippingPercent: "40"
      },
      {
        type: "lids",
        name: "Silver Metal Flat",
        diameterInches: "3.25",
        color: "silver",
        count: "12",
        remaining: "0",
        price: "9.48",
        shareOfShippingPercent: "10"
      }
    ],
    source: "Candle Science",
    subtotalCost: "69.01",
    shippingCost: "20.13",
    totalCost: "89.14"
  },
  {
    openDate: "2019-04-16",
    items: [
      {
        type: "jars",
        name: "Clear Plastic Tealight Cup",
        waxToFillLineOunces: "0.5",
        overflowVolumeOunces: "1",
        diameterInches: "1.5",
        color: "clear",
        count: "100",
        remaining: "80",
        price: "8.39",
        shareOfShippingPercent: "15"
      },
      {
        type: "wick-stickers",
        name: "Wick Stickers (large)",
        count: "100",
        remaining: "100",
        price: "4.44",
        shareOfShippingPercent: "7"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Vetiver",
        weightOunces: "8",
        remaining: "8",
        price: "13.90",
        shareOfShippingPercent: "20"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Cardamom and Star Anise",
        weightOunces: "4",
        remaining: "4",
        price: "8.5",
        shareOfShippingPercent: "20"
      },
      {
        type: "jars",
        name: "Straight Sided Tumbler",
        diameterInches: "3.06",
        color: "black",
        count: "12",
        remaining: "12",
        waxToFillLineOunces: "8.5",
        overflowVolumeOunces: "11.16",
        price: "16.51",
        shareOfShippingPercent: "30"
      },
      {
        type: "lids",
        name: "Black Metal Flat Lid",
        diameterInches: "3.25",
        color: "black",
        count: "12",
        remaining: "12",
        price: "10.37",
        shareOfShippingPercent: "10"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "English Garden",
        price: "0",
        weightOunces: "1",
        remaining: "1",
        shareOfShippingPercent: "8",
        notes: "This was a free sample"
      }
    ],
    source: "Candle Science",
    subtotalCost: "62.11",
    shippingCost: "19.61",
    totalCost: "81.72"
  },
  {
    openDate: "2019-05-03",
    items: [
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Lilac",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "10"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Citronella",
        weightOunces: "6",
        remaining: "6",
        price: "10.46",
        shareOfShippingPercent: "50"
      },
      {
        type: "lids",
        name: "#70 G Black Threaded Lid",
        diameterInches: "2.25",
        color: "black",
        count: "12",
        remaining: "12",
        price: "3.08",
        shareOfShippingPercent: "10"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Mediterranean Fig",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "10"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Gardenia Tuberose",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "10"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Fresh Coffee",
        weightOunces: "1",
        remaining: "1",
        price: "2.41",
        shareOfShippingPercent: "10"
      }
    ],
    source: "Candle Science",
    subtotalCost: "23.18",
    shippingCost: "15.84",
    totalCost: "39.02"
  },
  {
    openDate: "2018-11-23",
    items: [
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Arugula",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Bergamot",
        weightOunces: "4",
        remaining: "3.5",
        price: "6.95",
        shareOfShippingPercent: "6"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Black Cherry",
        weightOunces: "4",
        remaining: "3.5",
        price: "6.95",
        shareOfShippingPercent: "6"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Bluebonnet",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.50",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Brown Sugar",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Butternut Pumpkin",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Butterscotch",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Cedar",
        weightOunces: "1",
        remaining: "0.5",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Chardonnay",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.50",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Indian Sandalwood",
        weightOunces: "1",
        remaining: "0.5",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Icicles",
        weightOunces: "1",
        remaining: "0.8",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Jasmine",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Lilac",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Nagchampa",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Oakmoss",
        weightOunces: "4",
        remaining: "2.5",
        price: "8.95",
        shareOfShippingPercent: "6"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Patchouli",
        weightOunces: "4",
        remaining: "3.5",
        price: "8.95",
        shareOfShippingPercent: "6"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Pine",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Pumpkin Seeds & Oud",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Sweet Snow",
        weightOunces: "1",
        remaining: "0.8",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Vanilla Bean",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Verbena Bamboo",
        weightOunces: "1",
        remaining: "1",
        price: "2",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Zanzibar Clove",
        weightOunces: "1",
        remaining: "0.8",
        price: "2.50",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Zanzibar Clove",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "1.5"
      },
      {
        type: "misc-equipment",
        name: "Large Pouring Pot (Seamless Aluminum)",
        count: "1",
        remaining: "1",
        price: "10.95",
        shareOfShippingPercent: "10"
      },
      {
        type: "jars",
        name: "Libbey Cube 14oz",
        diameterInches: "3.5",
        waxToFillLineOunces: "9.2",
        waxToOverflowOunces: "11.6",
        overflowVolumeOunces: "14",
        color: "clear",
        count: "12",
        remaining: "0",
        price: "16.61",
        shareOfShippingPercent: "50"
      }
    ],
    source: "Lone Star Candle Supply",
    subtotalCost: "102.87",
    shippingCost: "20.48",
    taxesAndFees: "2.03",
    totalCost: "125.38"
  },
  {
    openDate: "2019-04-10",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Black Tea",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Clove",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Cuban Cigar",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Sage",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Thyme",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Whiskey",
        weightOunces: "1",
        remaining: "1",
        price: "2.39",
        shareOfShippingPercent: "17"
      }
    ],
    source: "The Flaming Candle",
    subtotalCost: "14.34",
    shippingCost: "8",
    totalCost: "22.34"
  },
  {
    openDate: "2018-11-14",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Lemon Fresh",
        weightOunces: "2",
        remaining: "2",
        price: "6.35",
        shareOfShippingPercent: "100",
        notes: "From Amazon"
      }
    ],
    source: "Virginia Candle Supply",
    subtotalCost: "6.35",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "6.35"
  },
  {
    openDate: "2018-11-14",
    items: [
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Lemon",
        weightOunces: "1",
        remaining: "1",
        price: "6.25",
        shareOfShippingPercent: "100",
        notes: ""
      }
    ],
    source: "P & J Trading",
    subtotalCost: "6.25",
    shippingCost: "2.95",
    taxesAndFees: "0",
    totalCost: "9.20"
  },
  {
    openDate: "2018-01-12",
    items: [
      {
        type: "misc-equipment",
        name: "Top Grade Candle Making Pitcher - Double Boiler Pot",
        count: "1",
        remaining: "1",
        price: "9.39",
        shareOfShippingPercent: "100",
        notes: "From Amazon"
      }
    ],
    source: "Top Grade Goods",
    subtotalCost: "9.39",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "9.39"
  },
  {
    openDate: "2018-05-21",
    items: [
      {
        type: "wax",
        name: "Natural Soy 464 Wax",
        material: "soy",
        weightPounds: "10",
        remaining: "0",
        price: "23.75",
        shareOfShippingPercent: "100",
        notes: "From Amazon"
      }
    ],
    source: "The Candlemaker's Store",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "23.75",
    subtotalCost: "23.75"
  },
  {
    openDate: "2018-11-13",
    items: [
      {
        type: "wick-stickers",
        name: "EricX Light 120 pcs Candle Wick Stickers",
        count: "120",
        remaining: "0",
        price: "7.95",
        shareOfShippingPercent: "100",
        notes: "From Amazon"
      }
    ],
    source: "EricX",
    subtotalCost: "7.95",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "7.95"
  },
  {
    openDate: "2018-11-13",
    items: [
      {
        type: "wicks",
        name: "Tea Light Wicks",
        length: "1.125",
        count: "96",
        remaining: "39",
        series: "",
        price: "9.49",
        shareOfShippingPercent: "100",
        notes: ""
      }
    ],
    source: "The Candlemaker's Store",
    notes: "From Amazon",
    subtotalCost: "9.49",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "9.49"
  },
  {
    openDate: "2018-05-21",
    items: [
      {
        type: "wax",
        name: "Natural Soy 464 Wax",
        material: "soy",
        weightPounds: "10",
        remaining: "0",
        price: "23.75",
        shareOfShippingPercent: "100"
      }
    ],
    source: "The Candlemaker's Store",
    subtotalCost: "23.75",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "23.75",
    notes: "From Amazon"
  },
  {
    openDate: "2018-12-01",
    items: [
      {
        type: "wicks",
        name: 'ECO 10 Cotton Core Pretabbed Wicks 6" Length',
        length: "6",
        count: "50",
        remaining: "30",
        series: "Eco",
        size: "10",
        price: "10.50",
        shareOfShippingPercent: "100"
      }
    ],
    source: "Mariposa CA",
    subtotalCost: "10.50",
    notes: "From Amazon",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "10.50"
  },
  {
    openDate: "2018-12-18",
    items: [
      {
        type: "misc-equipment",
        name: "Metal Wick Bars",
        count: "20",
        remaining: "20",
        price: "9.99",
        shareOfShippingPercent: "100"
      }
    ],
    source: "Forever Cases & More",
    notes: "From Amazon",
    subtotalCost: "9.99",
    totalCost: "9.99",
    taxesAndFees: "0",
    shippingCost: "0"
  },
  {
    openDate: "2018-12-18",
    items: [
      {
        type: "wax",
        name: "Natural Soy 464 Wax",
        material: "soy",
        weightPounds: "10",
        remaining: "0",
        price: "27.45",
        shareOfShippingPercent: "100"
      }
    ],
    source: "Brandon's Candles, LLC",
    notes: "From Amazon",
    subtotalCost: "27.45",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "27.45"
  },
  {
    openDate: "2018-12-22",
    items: [
      {
        type: "wax",
        name: "Natural Soy Wax 464",
        material: "soy",
        weightPounds: "20",
        remaining: "15",
        price: "58",
        shareOfShippingPercent: "100",
        notes: "Packaged in 2 10-lb bags"
      }
    ],
    source: "Virginia Candle Supply",
    notes: "From Amazon",
    subtotalCost: "58",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "58"
  },
  {
    openDate: "2019-05-03",
    items: [
      {
        type: "misc-equipment",
        name: "Wagner Spraytech Wagner 0503008 HT1000 Heat Gun",
        count: "1",
        remaining: "1",
        price: "27.85",
        shareOfShippingPercent: "100",
        notes: "2 Temp settings: 750 and 100"
      }
    ],
    source: "Amazon",
    subtotalCost: "27.85",
    notes: "From Amazon",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "27.85"
  },
  {
    openDate: "2019-04-24",
    items: [
      {
        type: "misc-equipment",
        name: "Glass Beaker Set Tall Form",
        count: "3",
        remaining: "3",
        price: "8.99",
        shareOfShippingPercent: "100"
      }
    ],
    source: "Lake Charles Manufacturing",
    subtotalCost: "8.99",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "8.99",
    notes: "From Amazon"
  },
  {
    openDate: "2019-04-23",
    items: [
      {
        type: "misc-equipment",
        name:
          "Greater Goods 480 Di Digital Kitchen Food Scale-Ultra Slim, Multifunction",
        count: "1",
        remaining: "1",
        price: "12.85",
        shareOfShippingPercent: "100"
      }
    ],
    source: "Greater Goods",
    notes: "From Amazon",
    subtotalCost: "12.85",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "12.85"
  },
  {
    openDate: "2019-05-17",
    items: [
      {
        type: "jars",
        name: "Mason Thin Screw",
        waxToFillLineOunces: "11.8",
        overflowVolumeOunces: "16",
        diameterInches: "3",
        color: "clear",
        count: "10",
        remaining: "10",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from a Clint's Salsa jar"
      },
      {
        type: "jars",
        name: "Ball Mason",
        waxToFillLineOunces: "11.8",
        overflowVolumeOunces: "16",
        diameterInches: "3",
        color: "clear",
        count: "1",
        remaining: "1",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from a farmer's market salsa"
      },
      {
        type: "jars",
        name: "Mason No Marking",
        waxToFillLineOunces: "11.8",
        overflowVolumeOunces: "16",
        diameterInches: "3",
        color: "clear",
        count: "2",
        remaining: "2",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from Mark's Salsa"
      },
      {
        type: "jars",
        name: "Ball Mason Thick Neck",
        waxToFillLineOunces: "11.84",
        waxToOverflowOunces: "",
        overflowVolumeOunces: "16",
        diameterInches: "3",
        color: "clear",
        count: "2",
        remaining: "2",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from a farmer's market salsa. Non standard lid."
      },
      {
        type: "jars",
        name: "Large Ball Mason",
        waxToFillLineOunces: "24",
        waxToOverflowOunces: "",
        overflowVolumeOunces: "42",
        diameterInches: "3",
        color: "clear",
        count: "1",
        remaining: "1",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from a farmer's market salsa."
      },
      {
        type: "jars",
        name: "Libby Cube",
        waxToFillLineOunces: "10.1",
        overflowVolumeOunces: "13.5",
        diameterInches: "3.44",
        color: "clear",
        count: "3",
        remaining: "3",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled."
      },
      {
        type: "jars",
        name: "8 oz. Apothecary Jar",
        waxToFillLineOunces: "9.9",
        waxToOverflowOunces: "",
        overflowVolumeOunces: "14.5",
        diameterInches: "4",
        color: "clear",
        count: "3",
        remaining: "3",
        price: "8.91",
        shareOfShippingPercent: "8.3"
      },
      {
        type: "lids",
        name: "Mason Thin Screw Lid",
        diameterInches: "2.75",
        color: "light gold",
        count: "3",
        remaining: "3",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from Clint's Salsa"
      },
      {
        type: "lids",
        name: "Mason Thin Screw Lid",
        diameterInches: "2.75",
        color: "gold",
        count: "3",
        remaining: "3",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled From Clint's Salsa"
      },
      {
        type: "lids",
        name: "Mason Screw Top",
        diameterInches: "2.75",
        color: "gold",
        count: "3",
        remaining: "3",
        price: "0",
        shareOfShippingPercent: "0",
        notes: "Recycled from a farmer's market salsa"
      }
    ],
    source: "Recycled",
    subtotalCost: "0",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "0"
  },
  {
    openDate: "2019-05-21",
    items: [
      {
        type: "wax",
        name: "Triple Filtered Beeswax",
        material: "beeswax",
        weightPounds: "0.28",
        remaining: "0.28",
        price: "0",
        shareOfShippingPercent: "0"
      }
    ],
    source: "The Frogs Pond",
    notes:
      "From Amazon, used for a wood cutting board, discovered in the cupboard so recycled, I guess",
    subtotalCost: "0",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "0"
  },
  {
    openDate: "2019-05-23",
    items: [
      {
        type: "wax",
        name: "NatureWax Coconut 1",
        material: "coconut",
        weightPounds: "2",
        remaining: "2",
        price: "8.00",
        shareOfShippingPercent: "40"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Patchouli",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Nag Champa",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Green Apple",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Red Apple",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Gingerbread",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Grapefruit",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "earthy",
        name: "Lemon Grass",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "French Vanilla",
        weightOunces: "1",
        remaining: "1",
        price: "2.50",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Coconut",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Orange Pekoe Tea",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "Cocoa Therapy",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "food-and-drink",
        name: "French Pair",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "spice",
        name: "Bayberry Cinnamon",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      },
      {
        type: "fragrance-oil",
        category: "flowers-and-herbs",
        name: "Clove",
        weightOunces: "1",
        remaining: "1",
        price: "2.5",
        shareOfShippingPercent: "4.5"
      }
    ],
    source: "Fillmore Container",
    subtotalCost: "43.00",
    shippingCost: "15.30",
    taxesAndFees: "0",
    totalCost: "58.30"
  },
  {
    openDate: "2019-08-21",
    items: [
      {
        type: "wax",
        name:
          "Your Natural Planet (Now Beesworks 1lb White Beeswax Pellets 2 Pack (2-1lb Packages)-Cosmetic Grade All Natural White Beeswax Pellets",
        material: "beeswax",
        weightPounds: "2",
        remaining: "2",
        price: "18.99",
        shareOfShippingPercent: "100",
        notes: "Ordered on Amazon"
      }
    ],
    source: "Natural Planet",
    subtotalCost: "18.99",
    shippingCost: "0",
    taxesAndFees: "0",
    totalCost: "18.99"
  }
];
