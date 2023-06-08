import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const UseAxios = (configParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    const fetchData = async() => {
        try {
            axios.request(configParams)
            .then(function (response) {
                setResponse(response.data);
            })
            .catch(function (error) {
                setError(error);
            })
            .finally(function () {
                // always executed
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
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
    }

    useEffect(() => {
        if (configParams.url == '' && configParams.method == '') return;
        setLoading(true);
        fetchData();
    }, [(configParams.method.toString().toLowerCase() === 'get' ? null : configParams.url)])

    return {response, error, loading}
}

export default UseAxios;