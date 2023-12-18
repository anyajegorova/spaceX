const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/api/capsules', async (req, res) => {
    try {
        const response = await axios.get('https://api.spacexdata.com/v4/capsules');
        const capsules = response.data;
        res.json(capsules);
    } catch (error) {
        console.log('Error fetching data:' + error.message);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port || 3001, () => {
    console.log(`Server is running on port ${port}`);
})