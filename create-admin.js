const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const { User } = require('./models/models');
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@mjroberts.com' });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash('Admin123456', 10);
      admin = await User.create({
        name: 'Super Admin',
        email: 'admin@mjroberts.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('⚠️ Admin already exists, updating password...');
      const hashedPassword = await bcrypt.hash('Admin123456', 10);
      admin.password = hashedPassword;
      await admin.save();
      console.log('✅ Password updated!');
    }
    
    console.log('\n��� Admin Login Credentials:');
    console.log('   Email: admin@mjroberts.com');
    console.log('   Password: Admin123456');
    console.log('   User ID:', admin._id);
    
    await mongoose.disconnect();
    console.log('\n✅ Setup complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
