/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['ojs/ojcore', 'knockout'], function (oj, ko) {

    function MatrixHelperViewModule() {
        var self = this;
        var urlMatrix = "http://localhost:3000/Matrix";

        self.createMatrixModel = function () {
            var MatrixModel = oj.Model.extend({
                urlRoot: urlMatrix,
                idAttribute: "DepartmentId"
            });

            return new MatrixModel();
        };

        self.createMatrixCollection = function () {
            var MatrixCollection = oj.Collection.extend({
                url: urlMatrix,
                fetchSize: -1,
                model: this.createMatrixModel()
            });

            return new MatrixCollection();
        };
    }

    return new MatrixHelperViewModule();
});