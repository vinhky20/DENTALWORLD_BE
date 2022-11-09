
module.exports = function (app) {
    let clinicsCtrl = require('../controllers/ClinicsController.js')
    // todoList Routes
    app.route('/clinics')
        .get(clinicsCtrl.get)
        .post(clinicsCtrl.store);

    app.route('/clinics/search/:keyword')
        .get(clinicsCtrl.search);

    app.route('/clinics/:clinicId')
        .get(clinicsCtrl.detail)
        .put(clinicsCtrl.update)
        .delete(clinicsCtrl.delete);
};
