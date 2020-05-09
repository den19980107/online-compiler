import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import history from "../history";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import UserProvider from "../context/UserProvider";
const Home = () => {
    const [apiKey, setApiKey] = useState("");
    const user = useContext(UserProvider.context);
    const getApiKey = async () => {
        console.log("click");
        let res = await axios.get("/api/user/getApiKey");
        setApiKey(res.data.apiKey);
    };
    return (
        <div className="container" style={{ marginTop: "10rem" }}>
            <h3>user Id</h3>
            <InputGroup className="mb-3">
                <FormControl value={user._id} />
            </InputGroup>
            <h3>取得 api key</h3>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="api key will show here"
                    value={apiKey}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={getApiKey}>
                        取得
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            <p>
                複製上面的 api key 與 user id 並在 request api 前放入 body 的
                api-key 詳情請看{" "}
                <a href="" onClick={() => history.push("/document")}>
                    文件
                </a>
            </p>
        </div>
    );
};

export default Home;
