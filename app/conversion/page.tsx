'use client'

import {Button} from "@mui/material";
import {useState} from "react";

interface API_TYPE {
    text: string
}

const Conversion = () => {
    const [apiData, setApiData] = useState<API_TYPE>();

    async function handleFetch() {
        const api = await fetch("/api/hello")
        const data = await api.json()
        console.log(data)
        setApiData(data)
    }

    return <div>Conversion page {apiData?.text}<Button onClick={handleFetch}>Fetch</Button></div>
}
export default Conversion;