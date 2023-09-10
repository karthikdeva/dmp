import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import sidebar from "./sidebar.reducer";
const reducer = combineReducers({
    authentication,
    sidebar
});
export default reducer;