const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config({ path: "../.env" });

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//   await Listing.deleteMany({});
//    initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: new mongoose.Types.ObjectId("69ccf99265869de9c38454b6")
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };
const initDB = async () => {
  await Listing.deleteMany({});

  for (let obj of initData.data) {
    let response = await geocoder.forwardGeocode({
      query: obj.location,
      limit: 1
    }).send();

    obj.geometry = response.body.features[0].geometry;
    obj.owner = new mongoose.Types.ObjectId("69ccf99265869de9c38454b6");
  }

  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();