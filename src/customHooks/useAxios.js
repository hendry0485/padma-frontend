import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

axios.defaults.baseURL = "http://192.168.2.26:8001";
axios.defaults.withCredentials = true;

const UseAxios = (configParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async() => {
        try {
            axios.request(configParams)
            .then(function (response) {
                if(configParams.url.includes('user')){
                    const res = response.data[0];
                    const nList = {
                        id:res.id,
                        username:res.username,
                        posisi_id:res.posisi_id
                    }
                    setResponse(nList);

                }else{
                    setResponse(response.data);
                };
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
    }, [configParams.url, configParams.data, configParams.params])

    return {response, error, loading}
}

export default UseAxios;