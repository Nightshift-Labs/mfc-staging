import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "apisauce";

const api = create({
  baseURL: process.env.SENDINBLUE_API,
  headers: {
    "api-key": process.env.SENDINBLUE_API_KEY,
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const SENDINBLUE_LIST_IDS = process.env.SENDINBLUE_LIST_IDS;

  const { email } = req.body;
  const listIds = SENDINBLUE_LIST_IDS.split(",").map((id) => Number(id));
  const data = { email: email, listIds: listIds };

  api.post(`/contacts`, data);

  res.status(200).json({});
}
