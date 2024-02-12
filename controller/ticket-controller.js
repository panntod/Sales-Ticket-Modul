const seatModel = require(`../models/index`).seat
const userModel = require(`../models/index`).user
const eventModel = require(`../models/index`).event
const ticketModel = require(`../models/index`).ticket

const Op = require(`sequelize`).Op

exports.addTicket = async (req, res) => {
    const today = new Date()
    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    const { eventID, userID, seats } = req.body;

    try {
        const seatIDs = await Promise.all(seats.map(async seat => {
          const { rowNum, seatNum } = seat;
          const createdSeat = await seatModel.create({
            eventID,
            rowNum,
            seatNum,
            status: 'true'
          });
          return createdSeat.seatID;
        }));
    
        const tickets = await ticketModel.bulkCreate(seatIDs.map(seatID => ({
          eventID,
          userID,
          seatID,
          bookedDate
        })));
    
        res.status(201).json(tickets);
      } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
      }
}

exports.getAllTicket = async (req, res) => {
    let tickets = await ticketModel.findAll(
        {
            include: [
                { model: eventModel, attributes: ['eventName','eventDate','venue']},
                { model: userModel, attributes: ['firstName', 'lastName']},
                { model: seatModel, attributes: ['rowNum', 'seatNum']},
            ]
        }
    )
    return res.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

exports.ticketByID = async (req, res) => {
    let ticketID = req.params.id

    let tickets = await ticketModel.findAll({
        where: {
            ticketID: { [Op.substring]: ticketID } 
        },
        include: [
            { model: eventModel, attributes: ['eventName','eventDate','venue']},
            { model: userModel, attributes: ['firstName', 'lastName','email']},
            { model: seatModel, attributes: ['rowNum', 'seatNum']},
        ]
    })
    return res.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

