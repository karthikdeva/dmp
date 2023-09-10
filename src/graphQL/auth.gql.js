import { gql } from "@apollo/client";

export const USER_FIELDS = gql `
  fragment UserFields on  UserNode {
    id
      firstName,
      lastName,
      username,
      email,
      dateJoined,
      lastLogin
  }
`;
const LOGIN = gql `mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      refreshExpiresIn
      token
      user{
        ...UserFields
      }
    }
  }${USER_FIELDS}`;

const CURRENR_USER = gql ` {
    userInfo:me {
      ...UserFields
    }
  }${USER_FIELDS}`;


export {
    LOGIN,
    CURRENR_USER
}