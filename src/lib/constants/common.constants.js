 const API_ENDPOINT = 'http://localhost:8000/api/';
 const API_ENDPOINT_GPQL = `http://localhost:8000/`;
 const COMPANY_NAME = "inFiNiti";
 const NO_OF_RECORDS_PER_PAGE = 10;
 const LABEL_ADD = "ADD";

 const PAGE_404 = `Ohhhh Hooo, Wrong Landing, Pathway doesn't exist.`;

 const REQUIRED_ERROR_MESSAGE = "This field is required";
 const ALLOWED_ONLY_ALPHABETS = "Enter only alphabets";
 const MAX_LENGTH_EXCEEDED = 'Max length exceeded';

 const customerConstants = {
     GET_ALL_CUSTOMERS: 'GET_ALL_CUSTOMERS',
     SET_ALL_CUSTOMERS: 'SET_ALL_CUSTOMERS'
 }
 const DEFAULT_PAGEINATION_CONFIG = {
     first: 0,
     rows: NO_OF_RECORDS_PER_PAGE,
     page: 1
 }

 const MENUITEMS = [{
     label: "Home",
     icon: "fas fa-home",
     page: "/",
     path: "/"
 }, {
     label: "Citizens",
     icon: "fas fa-users",
     page: "/citizens",
     path: "/citizens"
 }, {
     label: "Users",
     icon: "fas fa-user-tie",
     page: "/users",
     path: "/users",
 }];

 const SETTINGS_LIST = [{
         label: "Payment mode",
         icon: "fas fa-home",
         page: "/accounts/settings/paymentmode",
         path: "/accounts/settings/paymentmode"
     },
     {
         label: "Accounts list",
         icon: "fas fa-home",
         page: "/accounts/settings/accounts_list",
         path: "/accounts/settings/accounts_list"
     },
     {
         label: "Expense mode",
         icon: "fas fa-home",
         page: "/accounts/settings/expensemode",
         path: "/accounts/settings/expensemode"
     }
 ]
 export {
     API_ENDPOINT,
     API_ENDPOINT_GPQL,
     NO_OF_RECORDS_PER_PAGE,
     LABEL_ADD,
     customerConstants,
     DEFAULT_PAGEINATION_CONFIG,
     COMPANY_NAME,
     MENUITEMS,
     SETTINGS_LIST,
     PAGE_404,
     REQUIRED_ERROR_MESSAGE,
     ALLOWED_ONLY_ALPHABETS,
     MAX_LENGTH_EXCEEDED
 }