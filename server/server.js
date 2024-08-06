const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config.js')

const authRoutes = require('./routes/authRoutes.js');
const fileRoutes = require('./routes/fileRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const tagRoutes = require('./routes/tagRoutes.js');
const permissionRoutes = require('./routes/permissionRoutes.js')

const authenticateToken = require('./middleware/authenticateToken.js');


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/group', groupRoutes);
app.use('/api/v1/tag', tagRoutes);
app.use('/api/v1/permission', permissionRoutes);

app.use('/api/v1/thumbnails', express.static(path.join(__dirname, 'uploads/thumbnails')));
app.use('/api/v1/images', express.static(path.join(__dirname, 'uploads/')));

app.get('/api/v1/protected', authenticateToken, (req, res) => {
  res.send('protected route');
});

const PORT = config.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
