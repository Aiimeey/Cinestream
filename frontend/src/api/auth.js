    // Axios will generate response.data: The body of the response (often contains an error message or more details from the server)
    import client from "./client";

    export const createUser = async (userInfo) => {
      try {
        const { data } = await client.post("/user/create", userInfo);
        return data;
      } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;
    
        return { error: error.message || error };
      }
    };
   
    export const signInUser = async (userInfo) => {
      try {
        const { data } = await client.post("/user/sign-in", userInfo);
        return data;
      } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;
    
        return { error: error.message || error };
      }
    };
