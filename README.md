# SAP-Coversation-AI---NodeJS
Connection of SAP ERP With SAP Conversational AI with the use of NodeJS

# Connection between NodeJS API and SAP Conversational AI
1) Create Intents and Entities in SAP Conversational AI
2) Connect with nodeJS endpoint with the use of webhook
3) After following the step 2, we will be able to make a 2 way communication between node application and out virtual assistant.

# Connection between NodeJs and SAP Systems
1) We will make a OData request(restful) to SAP Systems. Since node can handle async request efficiently, query processing would be really fast in our case as SAP sytems has tons of data.
2) All the information from virtual assistant will be passed with the use of restAPIs to the SAP Systems with the integration of nodeJS

#Code
1) app.js runs the server
2) All the routes have different functionalities -
   get_data_routes - Get Order Data From SAP Systems
   Delivery_data_routes - Get Delivery Dates corresponding to above Orders
   get_Price_routes - Get Price for above orders from SAP Systems
   get_Sales_order_routes - Get Sales Order Data from SAP Systems

