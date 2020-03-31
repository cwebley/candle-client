create database candles;
use candles;

create table if not exists fragrance_oil_categories (
  id int not null auto_increment primary key,
  name varchar(255) not null,
  slug varchar(255) not null,
  color varchar(255)
);

insert into fragrance_oil_categories (`name`, `slug`, `color`)
  values ("earthy", "earthy", "brown"),
  ("food and drink", "food-and-drink", "blue"),
  ("flowers and herbs", "flowers-and-herbs", "pink"),
  ("spice", "spice", "red"),
  ("other", "other", "purple");

create table if not exists resource_types (
  id int not null auto_increment primary key,
  name varchar(255) not null,
  slug varchar(255) not null,
  -- helps for serving data to client side forms
  -- waxes and FOs are added on the batch level
  -- where everything else is specific to a single candle
  scope varchar(255)
);

insert into resource_types (`name`, `slug`, `scope`)
  values ("wax", "wax", "batch"),
  ("fragrance oil", "fragrance-oil", "batch"),
  ("additives", "additives", "batch"),
  ("dye blocks", "dye-blocks", "batch"),
  ("jars", "jars", "candle"),
  ("lids", "lids", "candle"),
  ("boxes", "boxes", "candle"),
  ("wicks", "wicks", "candle"),
  ("wick stickers", "wick-stickers", "candle"),
  ("warning labels", "warning-labels", "candle"),
  ("misc equipment", "misc-equipment", "candle");

create table if not exists supply_orders (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  source varchar(255),
  -- might be useful for estimating share of shipping cost etc
  item_count int,
  subtotal_cost decimal(13,4) default 0,
  taxes_and_fees decimal(13,4) default 0,
  shipping_cost decimal(13,4) default 0,
  total_cost decimal(13,4) default 0,
  open_date datetime,
  notes text
);

create table if not exists fragrance_oils (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  category_id int,
  order_id int,
  weight_ounces decimal(9,4),
  remaining decimal(9,4),
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (category_id) references fragrance_oil_categories(id),
  foreign key (order_id) references supply_orders(id)
);

create table if not exists waxes (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  material varchar(255),
  weight_pounds decimal(9,4),
  remaining decimal(9,4),
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists additives (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  weight_ounces decimal(9,4),
  remaining decimal(9,4),
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists boxes (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists dye_blocks (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  color varchar(255) not null,
  order_id int,
  pieces decimal(9,4),
  remaining decimal(9,4),
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists jars (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  color varchar(255),
  order_id int,
  overflow_volume_ounces decimal(9,4),
  wax_to_fill_line_ounces decimal(9,4),
  wax_to_overflow_ounces decimal(9,4),
  diameter_inches decimal(9,4),
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists lids (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  color varchar(255),
  order_id int,
  diameter_inches decimal(9,4),
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists misc_equipment (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists warning_labels (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  color varchar(255) not null,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists wicks (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  length decimal(9,4),
  series varchar(255),
  size varchar(255),
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

create table if not exists wick_stickers (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255) not null,
  slug varchar(255) not null,
  order_id int,
  count int,
  remaining int,
  -- confirmed to be finished/discarded
  finished tinyint(1) default 0,
  price decimal(13,4) default 0,
  share_of_shipping_percent decimal(6,2) default 0,
  notes text,
  foreign key (order_id) references supply_orders(id)
);

-- it might be useful to know who has what candle at times to
-- ask questions, prevent duplicate gifts etc
create table if not exists owners (
  id int not null auto_increment primary key,
  name varchar(255) not null,
  slug varchar(255) not null,
  notes text
);

create table if not exists batches (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255),
  slug varchar(255),
  color_description varchar(255),
  total_wax_weight_ounces decimal(9,4),
  total_fragrance_weight_ounces decimal(9,4),
  total_additive_weight_ounces decimal(9,4),
  -- percent fragrance by weight
  fragrance_load decimal(9,4),
  fragrance_add_temperature_fahrenheit decimal (6,2),
  dye_add_temperature_fahrenheit decimal(6,2),
  when_created datetime,
  -- limit of ~65k characters
  notes text
);

create table if not exists candles (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  name varchar(255),
  slug varchar(255),

  completed_candle_weight_ounces decimal (6,2),

  volume_overflow_percent decimal (5,2),

  color_description varchar(255),

  jar_id int,
  lid_id int,
  box_id int,
  wick_sticker_id int,
  -- presumes multi-wicks candles are all the same type of wick
  wick_id int,
  wick_count int,
  warning_label_id int,
  wick_layout varchar(255),
  -- checked if the candle is known to have burned all the wax
  finished tinyint(1) default 0,
  -- hours spent lit to date
  owner_id int,
  -- limit of ~65k characters
  notes text,
  foreign key (jar_id) references jars(id),
  foreign key (lid_id) references lids(id),
  foreign key (box_id) references boxes(id),
  foreign key (wick_sticker_id) references wick_stickers(id),
  foreign key (wick_id) references wicks(id),
  foreign key (warning_label_id) references warning_labels(id),
  foreign key (owner_id) references owners(id)
);

create table if not exists layers (
  id int not null auto_increment primary key,
  hash_id varchar(255) unique,
  batch_id int,
  candle_id int,

  -- this can be used with the same value in other layers
  -- or the completed_candle_weight_ounces column
  -- to determine the weight of the pour
  prepped_container_weight_ounces decimal(6,2),

  -- this probably wont be super exact...
  container_temperature_fahrenheit decimal(6,2),

  pour_temperature_fahrenheit decimal(6,2),

  when_poured datetime,
  cooling_room_temperature_fahrenheit decimal(6,2),
  cooling_room_humidity_percent decimal(6,2),

  -- limit of ~65k characters
  notes text,
  foreign key (batch_id) references batches(id),
  foreign key (candle_id) references candles(id)
);

create table if not exists batches_waxes (
  id int not null auto_increment primary key,
  batch_id int not null,
  wax_id int not null,
  weight_ounces decimal(9,4),
   -- items with the same combine_id are meant to be displayed as combined
  combine_id int,
  foreign key (batch_id) references batches(id),
  foreign key (wax_id) references waxes(id)
);

create table if not exists batches_additives (
  id int not null auto_increment primary key,
  batch_id int not null,
  additive_id int not null,
  weight_ounces decimal(9,4),
    -- percent additive by weight
  additive_load decimal(5,2),
   -- items with the same combine_id are meant to be displayed as combined
  combine_id int,
  foreign key (batch_id) references batches(id),
  foreign key (additive_id) references additives(id)
);

create table if not exists batches_fragrances (
  id int not null auto_increment primary key,
  batch_id int not null,
  fragrance_id int not null,
  weight_ounces decimal(9,4),
  -- percent fragrance by weight
  fragrance_load decimal(5,2),
  -- items with the same combine_id are meant to be displayed as combined
  combine_id int,
  foreign key (batch_id) references batches(id),
  foreign key (fragrance_id) references fragrance_oils(id)
);

create table if not exists batches_dye_blocks (
  id int not null auto_increment primary key,
  batch_id int not null,
  dye_block_id int not null,
  pieces decimal(9,4),
   -- items with the same combine_id are meant to be displayed as combined
  combine_id int,
  foreign key (batch_id) references batches(id),
  foreign key (dye_block_id) references dye_blocks(id)
);

create table if not exists candles_burns (
  id int not null auto_increment primary key,
  candle_id int not null,
  when_started datetime,
  when_stopped datetime,
  notes text,
  foreign key (candle_id) references candles(id)
);
