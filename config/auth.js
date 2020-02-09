module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
       
      if (!req.isAuthenticated()) {
        console.log('Register');
        return next();
      }
      res.redirect('/dashboard');      
    }
};