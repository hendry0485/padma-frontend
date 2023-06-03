import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

axios.defaults.baseURL = "http://pelita.local:81/cano/api";

const useAxios = ({url, method, body = null, headers=null}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    try {
        axios[method](url,JSON.parse(headers), JSON.parse(body))
        .then(function (response) {
          setResponse(response.data);
        })
        .catch(function (error) {
            setError(error);
        })
        .finally(function () {
          // always executed
          setLoading(false);
        }); 
    } catch (err) {
        if (!err?.response) {
            setError("No Server Response");
        }else if (err.response?.status === 409) {
            setError("Username Taken");
        } else {
            setError("Transaction Failed");
        }
    }

    return {response, error, loading}
    
}

export default useAxios;