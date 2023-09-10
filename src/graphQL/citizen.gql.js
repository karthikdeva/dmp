import { gql } from "@apollo/client";

export const CITIZEN_FIELDS = gql `
  fragment CitizenFields on  CitizenNode {
    id,
    citizenId
    name
    mobile1
    mobile2
    doorNumber
    AadhaarNumber
    nameOnNamePlate
    geoLocation
    street
    locality
    area
    noOneAtHome
    createdBy {
      id,
      username
    }
    createdAt,
    modifiedAt,
  }
`;

const CITIZENS = gql `query citizen($first: Int!, $offset: Int!,  $search:String!) {
  items: citizen(first: $first, offset: $offset,  name_Icontains:$search) {
      totalCount
      edgeCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
           ...CitizenFields
        }
        
      }
    }
  }
  ${CITIZEN_FIELDS}
  `;


const NEW_CITIZEN = gql `
mutation CreateCitizen($citizenData:CitizenInput!){
createCitizen(citizenData:$citizenData){
  citizen{
        ...CitizenFields
 }
 }
}${CITIZEN_FIELDS}`;

const UPDATE_CITIZEN = gql `
mutation updateCitizen($citizenData:CitizenInput!){
  updateCitizen(citizenData:$citizenData){
    citizen{
        ...CitizenFields
 }
 }
}${CITIZEN_FIELDS}`;


const DELETE_CITIZEN = gql `
mutation deleteCitizen($id:String!){  
	deleteCitizen(id:$id){ __typename}
}`

export {
    CITIZENS,
    NEW_CITIZEN,
    UPDATE_CITIZEN,
    DELETE_CITIZEN
}