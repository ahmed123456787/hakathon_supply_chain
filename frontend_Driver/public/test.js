import fs from "fs"

// Read the file
fs.readFile("/home/bidjed/Documents/Hakathon/hakathon_supply_chain/frontend_Driver/public/dataexample.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Remove escape characters and convert to JSON
    let cleanedData = data.replace(/\\/g, ""); // Remove backslashes
    let jsonData = JSON.parse(cleanedData);

    console.log("Parsed JSON:", jsonData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
