const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;


const DB= "mongodb+srv://ralegaonkarvaishnavi:nWRyqxJW6Jo2Rspt@cluster0.n5dxfdr.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database: ', error);
  });


const userSchema = new mongoose.Schema({
  name: String,
  mobile :String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());


app.post('/signup', async (req, res) => {
  const { name,mobile,password } = req.body;

  try {
    
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(409).json({ message: 'User with mobile no. already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const taskSchema = new mongoose.Schema({
  title: String,
  
});

const Task = mongoose.model('Task', taskSchema);


app.post('/add-task', async (req, res) => {
  const { title, description } = req.body;

  try {
    
    const newTask = new Task({
      title,
      description,
    });

    await newTask.save();

    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
