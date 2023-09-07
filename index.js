const express = require('express');
const app = express();
const port = 3046; // You can change this to your desired port

// Define a route that accepts two GET parameters
app.get('/api', (req, res) => {
    console.log("hello")
    const { slack_name, track } = req.query;


    // Validate the 'offset' parameter to be within +/- 2
    const offsetValue = parseInt(0);
    if (isNaN(offsetValue) || Math.abs(offsetValue) > 2) {
        return res.status(400).json({ error: 'Invalid offset value. It should be between -2 and 2.' });
    }


    const now = new Date();
    now.setUTCHours(now.getUTCHours() + offsetValue);

    const isoString = now.toISOString().slice(0,19)+'Z';

    var stat_code = res.statusCode

    const info = {
        slack_name: slack_name || 'Unknown',
        current_day: now.toLocaleString('en-US', { weekday: 'long' }),
        utc_time: isoString,
        track: track,
        github_file_url: 'https://github.com/IniBen/info/blob/master/index.js',
        github_repo_url: 'https://github.com/IniBen/info',
        status_code: stat_code.toString()
    };

    res.status(200).json(info);

});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
