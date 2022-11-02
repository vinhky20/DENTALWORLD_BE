module.exports = function (app) {
    let clinicScheduleCtrl = require('../controllers/ClinicScheduleController.js');

    // todoList Routes
    app.route('/clinicSchedule')
        .get(clinicScheduleCtrl.get)
        .post(clinicScheduleCtrl.store);

    app.route('/clinicSchedule/bookedTimeSlot/:scheduleClinic/:scheduleDate')
        .get(clinicScheduleCtrl.getBookedTimeSlot)

    // app.route('/clinicSchedule/availableTimeSlot/:scheduleClinic/:scheduleDate')
    //     .get(clinicScheduleCtrl.getAvailableTimeSlot)

    app.route('/clinicSchedule/:clinicScheduletId')
        .get(clinicScheduleCtrl.detail)
        .put(clinicScheduleCtrl.update)
        .delete(clinicScheduleCtrl.delete);
};