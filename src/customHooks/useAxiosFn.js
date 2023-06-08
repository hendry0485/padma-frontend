import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

const fnAxios = async (configParams) => {
    let data = [];
    let errorMsg = "";
    
    try {
        await axios.request(configParams)
        .then(function (response) {
          data = response.data;
        })
        .catch(function (error) {
            errorMsg = error;
        })
        .finally(function () {
          // always executed
        }); 
    } catch (err) {
        if (!err?.response) {
            errorMsg = ("No Server Response");
        }else if (err.response?.status === 409) {
            errorMsg = ("Username Taken");
        } else {
            errorMsg = ("Transaction Failed");
        }
    }

    return {response: data, errorMsg : errorMsg}
    
}

export default fnAxios;