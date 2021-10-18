const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TicketsController = require('../controllers/tickets');

router.get('/', checkAuth, TicketsController.getAllTickets);

router.post('/', checkAuth, TicketsController.bookOneTicket);

router.get('/:ticketId', checkAuth, TicketsController.getOneTicket);

router.get('/user/:userId', checkAuth, TicketsController.getTicketsByUserId);

router.get('/cancelled/:userId', checkAuth, TicketsController.getCancelledTicketsByUserId);

router.patch('/:ticketId', checkAuth, TicketsController.cancelOneTicket);

module.exports = router;
