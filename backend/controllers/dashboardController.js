export const someProtectedRoute = async (req, res) => {
  res.json({ message: `Welcome ${req.user.email || req.user.phone}, this is your dashboard!` });
};
