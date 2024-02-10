const upload = require(`./upload-image`).single(`image`);
const eventModel = require(`../models/index`).event;
const Op = require(`sequelize`).Op;
const path = require(`path`);
const fs = require(`fs`);

exports.getAllEvent = async (req, res) => {
  try {
    let events = await eventModel.findAll();
    return res.json({
      success: true,
      data: events,
      message: `All Events have been loaded`,
    });
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Data Events is empty",
    });
  }
};

exports.findEvent = async (req, res) => {
  let keyword = req.params.key;

  try {
    let events = await eventModel.findAll({
      where: {
        [Op.or]: [
          { eventName: { [Op.substring]: keyword } },
          { eventDate: { [Op.substring]: keyword } },
          { venue: { [Op.substring]: keyword } },
          { price: { [Op.substring]: keyword } },
        ],
      },
    });

    if (!events) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Data Events not found",
      });
    }

    return res.json({
      success: true,
      data: events,
      message: `All Events have been loaded`,
    });
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

exports.addEvent = (req, res) => {
  upload(req, res, async (error) => {
    if (error) return res.json({ message: error });

    if (!req.file) return res.json({ message: `Nothing to Upload` });

    let newEvent = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      venue: req.body.venue,
      price: req.body.price,
      image: req.file.filename,
    };

    eventModel
      .create(newEvent)
      .then((result) => {
        return res.json({
          success: true,
          data: result,
          message: `New event has been inserted`,
        });
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.updateEvent = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) return res.json({ message: error });

    let eventID = req.params.id;

    let dataEvent = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      venue: req.body.venue,
      price: req.body.price,
    };

    if (req.file) {
      const selectedEvent = await eventModel.findOne({
        where: { id: eventID },
      });

      const oldImage = selectedEvent.image;

      const pathImage = path.join(__dirname, `../images`, oldImage);

      if (fs.existsSync(pathImage)) {
        fs.unlink(pathImage, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }

      dataEvent.image = req.file.filename;
    }

    eventModel
      .update(dataEvent, { where: { id: eventID } })
      .then((result) => {
        return res.json({
          success: true,
          message: `Data event has been updated`,
        });
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deleteEvent = async (req, res) => {
  const eventID = req.params.id;

  const event = await eventModel.findOne({ where: { id: eventID } });
  const oldImage = event.image;

  const pathImage = path.join(__dirname, `../images`, oldImage);

  if (fs.existsSync(pathImage)) {
    fs.unlink(pathImage, (error) => console.log(error));
  }

  eventModel
    .destroy({ where: { id: eventID } })
    .then((result) => {
      return res.json({
        success: true,
        message: `Data event has been deleted`,
      });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};
