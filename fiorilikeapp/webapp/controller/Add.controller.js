sap.ui.define([
    'com/emc/fin/ap/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,JSONModel, MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend("com.emc.fin.ap.controller.Add",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("add").attachMatched(this.herculis, this);

            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "prodData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "",
                    "CATEGORY": "Notebooks",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000051",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "0.00",
                    "CURRENCY_CODE": "EUR",
                    "DIM_UNIT": "CM",
                    "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"
                }
            });
            this.getView().setModel(this.oLocalModel,"prod");
        },
        herculis: function(oEvent){

        },
        
        onSave: function(){
            //Step 1: Prepare payload
            var payload = this.oLocalModel.getProperty("/prodData");
            //Step 2: Pre-checks
            if(payload.PRODUCT_ID === ""){
                MessageBox.error("Please enter a valid new product Id");
                return;
            }
            //Step 3: Get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 4: post this data to backend
            oDataModel.create("/ProductSet", payload,{
                //Step 5: get the response - success, error
                success: function(data){
                    MessageToast.show("Congratulations! The data has been posted to SAP");
                },
                error: function(oError){
                    debugger;
                }
            });
        },
        onClear: function(){
            this.oLocalModel.setProperty("/prodData",{
                "PRODUCT_ID": "",
                "TYPE_CODE": "",
                "CATEGORY": "Notebooks",
                "NAME": "",
                "DESCRIPTION": "",
                "SUPPLIER_ID": "0100000051",
                "SUPPLIER_NAME": "TECUM",
                "TAX_TARIF_CODE": "1 ",
                "MEASURE_UNIT": "EA",
                "PRICE": "0.00",
                "CURRENCY_CODE": "EUR",
                "DIM_UNIT": "CM",
                "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"
            });
        }
    });
});