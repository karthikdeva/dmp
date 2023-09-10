import { gql } from "@apollo/client";


const UNITS = gql ` {
    units {
        id
      unitName
      unitType
    }
  }
  `;
const CATEGORY = gql ` 
  {
    category {
      id,
      categoryName
         }
  } `;


export {
    UNITS,
    CATEGORY
}