const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Solar link+ Backend is organised");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
