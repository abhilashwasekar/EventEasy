// Example route for admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
  
    const hardcodedUsername = "admin";
    const hardcodedPassword = "password123";
  
    if (username === admin && password === password123) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
  