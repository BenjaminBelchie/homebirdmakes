import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabase";

// GET Endpoint
export default async function handle(req: NextApiRequest, res: NextApiResponse){
  let {data} = await supabase.from("collections").select("*");
  res.json(data);
}