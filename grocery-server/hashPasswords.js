const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Admin = require('./models/Admin');

// MongoDB Connection
mongoose.connect('<connection_string>', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const hashExistingPasswords = async () => {
    try {
        const users = await User.find();
        const admins = await Admin.find();

        for (let user of users) {
            if (!user.password.startsWith("$2a$")) {  // Only hash if it's not already hashed
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                console.log(`🔹 Hashed password for user: ${user.email}`);
            }
        }

        for (let admin of admins) {
            if (!admin.password.startsWith("$2a$")) {  
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
                await admin.save();
                console.log(`🔹 Hashed password for admin: ${admin.email}`);
            }
        }

        console.log("✅ Password hashing complete");
        mongoose.connection.close();
    } catch (error) {
        console.error("🔥 Error hashing passwords:", error);
        mongoose.connection.close();
    }
};

hashExistingPasswords();
