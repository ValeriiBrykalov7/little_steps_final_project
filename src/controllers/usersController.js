export const getCurrentUserController = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully found current user',
    data: req.user,
  });
};
