/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/common/matrixHelper', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 
  'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'ojs/ojcheckboxset', 'ojs/ojvalidation-number', 'ojs/ojvalidation-datetime',
  'ojs/ojtable', 'ojs/ojcollectiontabledatasource', 'ojs/ojdatacollection-utils'],
 function(oj, ko, matrixHelper, $) {
  
    function IncidentsViewModel() {
      var self = this;
      
      self.matrixList = matrixHelper.createMatrixCollection();
      self.datasource = ko.observable();
      self.datasource(new oj.CollectionTableDataSource(self.matrixList));      
      
//    var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, Type: 'Finance', Currency: 'USD', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2013, 0, 1)), Primary: ['checked']},
//                     {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, Type:'Sales', Currency: 'JPY', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2014, 0, 1)), Primary: []},
//                     {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, Type: 'HR', Currency: 'EUR', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2011, 0, 1)), Primary: ['checked']},
//                     {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, Type: 'Sales', Currency: 'USD', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2010, 0, 1)), Primary: []}];
//    self.deptObservableArray = ko.observableArray(deptArray);
//    self.dataprovider = new ArrayDataProvider(self.deptObservableArray, {keyAttributes: 'DepartmentId'});
    
    //// NUMBER AND DATE CONVERTER ////
    var numberConverterFactory = oj.Validation.converterFactory("number");
    this.numberConverter = numberConverterFactory.createConverter();	   

    var dateConverterFactory = oj.Validation.converterFactory("datetime");
    this.dateConverter = dateConverterFactory.createConverter();
//    var self = this;
    this.beforeRowEditEndListener = function(event)
    {
       var data = event.detail;
       var rowIdx = data.rowContext.status.rowIndex;
       self.dataprovider.fetchByOffset({offset: rowIdx}).then(function(value)
       {
         var row = value['results'][0]['data'];
         var rowCopy = {};
         Object.keys(row).forEach(function(attr) {
          rowCopy[attr] = row[attr];
         });
         $('#rowDataDump').val(JSON.stringify(rowCopy));  
       });
       if (oj.DataCollectionEditUtils.basicHandleRowEditEnd(event, data) === false) {
         event.preventDefault();
       }
    }
      
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
