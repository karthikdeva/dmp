import { MAX_LENGTH_EXCEEDED, ALLOWED_ONLY_ALPHABETS, REQUIRED_ERROR_MESSAGE } from "./common.constants";

export const COLUMNS = [
    { field: 'node.citizenId', header: 'Id' },
    { field: 'node.name', header: 'Name' },
    { field: 'node.mobile1', header: 'Mobile' },
    { field: 'node.mobile2', header: 'Phone' },

    { field: 'node.doorNumber', header: 'Door Number' },
    { field: 'node.AadhaarNumber', header: 'Aadhaar' },
    { field: 'node.nameOnNamePlate', header: 'Name On Name Plate' },
    { field: 'node.geoLocation', header: 'Geo Location' },
    { field: 'node.street', header: 'Street' },
    { field: 'node.locality', header: 'Locality' },
    { field: 'node.area', header: 'Area' },
    { field: 'node.createdBy.username', header: 'created By' },
    { field: 'node.modifiedAt', header: 'Last Modified' },

];


export const CITIZEN_FIELDS = [{
        label: "Name",
        key: "name",
        type: "text",
        validation: {
            required: REQUIRED_ERROR_MESSAGE,
            pattern: {
                value: /^[A-Za-z\s]+$/,
                message: ALLOWED_ONLY_ALPHABETS
            },

            maxLength: {
                value: 50,
                message: MAX_LENGTH_EXCEEDED
            }
        }
    },
    {
        label: "Mobile",
        key: "mobile1",
        type: "text",
        validation: {
            pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number"
            }
        }

    },
    {
        label: "Alternative mobile",
        key: "mobile2",
        type: "text",
        pattern: {
            value: /^\d{10}$/,
            message: "Invalid mobile number"
        }
    }, {
        label: "Door Number",
        key: "doorNumber",
        type: "text"
    }, {
        label: "Aadhaar Number",
        key: "AadhaarNumber",
        type: "text"
    }, {
        label: "Name On Name Plate",
        key: "nameOnNamePlate",
        type: "text"
    }, {
        label: "Geo Location",
        key: "geoLocation",
        type: "text"
    },
    {
        label: "Street",
        key: "street",
        type: "text"
    }, {
        label: "Locality",
        key: "locality",
        type: "text"
    },
    {
        label: "Area",
        key: "area",
        type: "text"
    },
    {
        label: "No One At Home",
        key: "noOneAtHome",
        type: "checkbox"
    }
]

export const DEFAULT_CITIZEN = {
    name: "",
    mobile1: "",
    mobile2: "",
    doorNumber: "",
    AadhaarNumber: "",
    nameOnNamePlate: "",
    geoLocation: "",
    street: "",
    locality: "",
    area: "",
    noOneAtHome: false,
}