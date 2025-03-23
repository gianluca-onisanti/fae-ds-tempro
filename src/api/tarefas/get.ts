export default async (req: any, res: any) => {
  const { param } = req.query;

  try {
    const result = {};
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(403).json({ err: "Ocorreu um erro." });
  }
};
