import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse){
    const {title, price, link, filename} = req.body;
    const result = await prisma.product.create({
        data: {
            title:title,
            price:price,
            link:link
        }
    }).then((async product => {
        await prisma.productImage.create({
            data:{
                filename:filename,
                productId:product.id
            }
        })
    }));
    res.json(result);
}