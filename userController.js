exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        console.log('User found:', user); // Add this line
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Add this line
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
