require('isomorphic-fetch');
const url = `https://www.instagram.com/graphql/query/?query_hash=69cba40317214236af40e7efa697781d&variables={"id":"6160805228","first":3}`

async function getPosts(){
    const data = await fetch(url).then(res => res.json());
    return cleanData(data);
}

function cleanData(response) {
    console.log(response)
    return response.data.user.edge_owner_to_timeline_media.edges.map(edge => ({
        url: edge.node.thumbnail_src,
        id: edge.node.id,
        instagramUrl:`https://instagram.com/p/${edge.node.shortcode}`
    }))
}

exports.handler = async function(event, context, callback){
    const posts = await getPosts();
    callback(null, {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(posts),
    })
}