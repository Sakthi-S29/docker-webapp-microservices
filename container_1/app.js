const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 6000;
const fs = require('fs');

app.use(express.json());

app.post('/calculate',async(req,res) => {

    if (!req.body.file) {
        res.send({
            "file": null,
            "error": "Invalid JSON input."
            });
    }
    else if (!fs.existsSync(`/files/${req.body.file}`)) {
        res.send(
            {
            "file": req.body.file,
            "error": "File not found."
            });
    }

    else
    {
        try{
            //Calling microservice /calculateSum at 6060.
            const response = await axios.post('http://container2:6060/calculateSum',req.body);
            res.send(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
}
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});