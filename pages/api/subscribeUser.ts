import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    const {email} = req.body;
        const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
        const API_KEY = process.env.MAILCHIMP_API_KEY;
        const DATACENTER = process.env.MAILCHIMP_API_SERVER;

        axios.post(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,{
            email_address: email,
            status: 'subscribed',
        }, {
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200){
                // Added subscriber
                res.json({status:200});
            }
        }).catch(error => {
            console.log(error)
            res.json({status:400, data:error.data});
        }) 
}