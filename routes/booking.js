module.exports = function (app) {
    let bookingsCtrl = require('../controllers/BookingsController.js');

    // todoList Routes
    app.route('/bookings')
        .get(bookingsCtrl.get)
        .post(bookingsCtrl.store);

    app.route('/bookings/clinic/:clinicId')
        .get(bookingsCtrl.getBookingInfo)

    app.route('/bookings/sendMail')
        .post(bookingsCtrl.sendMail)

    app.route('/bookings/customer/:customerId')
        .get(bookingsCtrl.getHistory)

    app.route('/bookings/:bookingId')
        .get(bookingsCtrl.detail)
        .put(bookingsCtrl.update)
        .delete(bookingsCtrl.delete);
};