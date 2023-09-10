/* eslint-disable react/prop-types */
import React, { useContext } from "react";

import {
    ApolloProvider as Provider,
    ApolloClient,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { API_ENDPOINT_GPQL } from '../constants/common.constants';
import { AuthContext } from "./AuthProvider";
import { getAuthInfo } from "../utilities";

export function ApolloProvider({ children }) {
    const authContext = useContext(AuthContext);
    let authInfo = authContext?.authInfo?.token ? authContext?.authInfo : getAuthInfo();
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `${API_ENDPOINT_GPQL}graphql`,
            headers: authInfo ? { Authorization: `JWT ${authInfo?.token}` } : undefined
        }),
        credentials: "same-origin"
    });

    return client ? <Provider client = { client } > { children } </Provider> : null;
}