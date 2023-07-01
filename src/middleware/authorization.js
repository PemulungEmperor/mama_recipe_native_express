module.exports = {
  isAdmin: (req, res, next) => {
    if (req.userData.data.level === 0) {
      next()
    } else {
      res.status(403).send('Only admins can access this!')
    }
  },

  isCustomer: (req, res, next) => {
    if (req.userData.data.level === 1) {
      next()
    } else {
      res.status(403).send('Only customers can access this!')
    }
  }
}
