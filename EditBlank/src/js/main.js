/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * Example of Require.js boostrap javascript
 */
/* eslint-disable quote-props */

requirejs.config(
  {
    baseUrl: 'js',

    // Path mappings for the logical module names
    // Update the main-release-paths.json for release mode when updating the mappings
    paths:
    //injector:mainReleasePaths
    {
      'knockout': 'libs/knockout/knockout-3.4.2.debug',
      'jquery': 'libs/jquery/jquery-3.3.1',
      'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
      'promise': 'libs/es6-promise/es6-promise',
      'hammerjs': 'libs/hammer/hammer-2.0.8',
      'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
      'ojs': 'libs/oj/v6.0.0/debug',
      'ojL10n': 'libs/oj/v6.0.0/ojL10n',
      'ojtranslations': 'libs/oj/v6.0.0/resources',
      'text': 'libs/require/text',
      'signals': 'libs/js-signals/signals',
      'customElements': 'libs/webcomponents/custom-elements.min',
      'proj4': 'libs/proj4js/dist/proj4-src',
      'css': 'libs/require-css/css',
      'touchr': 'libs/touchr/touchr',
      'persist': 'libs/persist/min'
    }
    //endinjector
    ,

    // Shim configurations for modules that do not expose AMD
    shim:
    {
      'jquery':
      {
        exports: ['jQuery', '$']
      }
    }
  }
);


require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojinputtext', 
  'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'ojs/ojcheckboxset', 'ojs/ojvalidation-number', 'ojs/ojvalidation-datetime',
  'ojs/ojtable', 'ojs/ojdatacollection-utils'],
function(oj, ko, $, ArrayDataProvider)
{   
  function viewModel()
  {
    var self = this;

    var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, Type: 'Finance', Currency: 'USD', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2013, 0, 1)), Primary: ['checked']},
                     {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, Type:'Sales', Currency: 'JPY', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2014, 0, 1)), Primary: []},
                     {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, Type: 'HR', Currency: 'EUR', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2011, 0, 1)), Primary: ['checked']},
                     {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, Type: 'Sales', Currency: 'USD', Date: oj.IntlConverterUtils.dateToLocalIso(new Date(2010, 0, 1)), Primary: []}];
    self.deptObservableArray = ko.observableArray(deptArray);
    self.dataprovider = new ArrayDataProvider(self.deptObservableArray, {keyAttributes: 'DepartmentId'});
    
    //// NUMBER AND DATE CONVERTER ////
    var numberConverterFactory = oj.Validation.converterFactory("number");
    this.numberConverter = numberConverterFactory.createConverter();	   

    var dateConverterFactory = oj.Validation.converterFactory("datetime");
    this.dateConverter = dateConverterFactory.createConverter();
    var self = this;
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
  }
  var vm = new viewModel;    
  
  $(document).ready
  (
    function()
    {
      var element = document.getElementById('table');
      ko.applyBindings(vm, element);
      element.addEventListener('ojBeforeRowEditEnd', vm.beforeRowEditEndListener);
    }
  );
});	

