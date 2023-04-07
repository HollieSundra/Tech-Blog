const withAuth = (req, res, next) => {
    const { user_id } = req.session;
    
    if (!user_id) {
      // If user is not authenticated, redirect to the login page
      return res.redirect('/login');
    }
    
    // Call the next middleware if the user is authenticated
    next();
  };
  
  module.exports = withAuth;
  