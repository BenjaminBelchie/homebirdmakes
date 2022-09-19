import { ImageList } from "@mui/material";
import { useEffect, useState } from "react";
import ImageButton from "../ImageButton";

const url = "http://localhost:8888/.netlify/functions/instagram";

function useInstagram(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {setPosts(data)})
    },[])
    return posts;
}

export default function InstagramFeed(){
    const feed = useInstagram();
    console.log(feed)
    return(
        <>
            <ImageList sx={{ width: "80%", height:800, margin:4 }} cols={3} rowHeight={250}>
            {feed.map((item) => (<a download key={item.id} href={item.url}>Download</a>))}
        </ImageList>
        </>
    )
}