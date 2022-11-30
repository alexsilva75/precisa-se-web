import { usersActions } from "./users";

import axios from "axios";
import options from "../../globalOptions";

export const fetchAndSetUsers = (params: any) => {
  return async (dispatch: any) => {
    // console.log(
    //   "URL: ",
    //   `${options.baseURL}/api/v1/users?firstInitial=${params.firstInitial}`
    // );
    const response = await axios.get(
      `${options.baseURL}/api/v1/users?firstInitial=${params.firstInitial}`,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );

    console.log("Fetch users response: ", response.data);
    if (response.status === 200) {
      dispatch(usersActions.setUsers(response.data.users));
    }
  };
};
