import { NextApiRequest, NextApiResponse } from "next";

// GET Endpoint
export default function handle(req: NextApiRequest, res: NextApiResponse){
    res.json([
        {
          image:"/images/collections/pumkins.jpg",
          category: "Pumpkins",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=29378110"
        },
        {
          image:"/images/collections/baskets.jpeg",
          category: "Fabric Baskets",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=22914008"
        },
        {
          image:"/images/collections/pouches.jpg",
          category: "Purses and Pouches",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=21804003"
        },
        {
          image:"/images/collections/bookmarks.jpg",
          category: "Bookmarks",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=24655291"
        },
        {
          image:"/images/collections/zipbag.jpg",
          category: "Large Zip Bags",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=37258436"
        },
        {
          image:"/images/collections/bunting.jpg",
          category: "Garlands",
          href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=23547704"
        },
      ])
}