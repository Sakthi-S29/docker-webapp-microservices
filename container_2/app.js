const express = require('express');
const app = express();
const PORT = 6060;
const fs = require('fs');

app.use(express.json());

app.post('/calculateSum',(req,res) => {
    const input = req.body;
    const filePath = `/files/${req.body.file}`;
    function isCSV(filePath) {
        try {
            // Read file contents as a UTF-8 string
            const data = fs.readFileSync(filePath, 'utf8');  
    
            // Split file into an array of lines (handles both Windows '\r\n' and Unix '\n')
            const lines = data.split(/\r?\n/).filter(line => line.trim() !== "");  
    
            if (lines.length < 2) 
                return false; // If there's only one line, it's likely not CSV

            for (let i = 1; i < lines.length; i++) {
                const [product, amount] = lines[i].split(',');
                
                if (!amount) {
                    console.warn(`⚠️ Invalid row (line ${i}): Missing amount.`);
                    return false;  // If a row has missing columns, it's an invalid CSV
                }
            }
    
            // Count the number of columns (commas) in each row
            const columnCounts = lines.map(line => line.split(',').length);  
    
            // Check if all rows have the same number of columns
            const isConsistent = columnCounts.every(count => count === columnCounts[0]);  
    
            return isConsistent;
        } catch (error) {
            console.error("❌ Error reading file:", error);
            return false;
        }
    }
    if (isCSV(filePath)) {
        let sum = 0;
        const data = fs.readFileSync(filePath, 'utf8');
        const productName = req.body.product;

        // Split the data into lines (rows of the CSV)
        const lines = data.split('\n');

        // Loop through each line (skip the header row)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines
            if (!line) continue;

            // Split the line by commas to extract product and amount
            const [product, amount] = line.split(',');

            // Check if the product matches the given product name
            if (product && product.trim() === productName) {
                // Add the amount to the total sum
                sum += parseFloat(amount);  // Convert the amount to a float for summing
            }
        }
        res.send({
            "file": req.body.file,
            "sum": sum
            });
    }
    else
    {
        res.send({
            "file": req.body.file,
            "error": "Input file not in CSV format."
            })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});