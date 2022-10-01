import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/prisma';

// POST endpoint
export default async function handle(req: NextApiRequest, res: NextApiResponse){
    const {category, etsyLink, categoryImage} = req.body;

    const result = await prisma.category.create({
        data: {
            category:category,
            etsyLink:etsyLink,
        }
    }).then((async category => {
        await prisma.categoryImage.create({
            data:{
                filename:categoryImage,
                categoryId:category.id,
            }
        })
    }));
    res.json(result);
}