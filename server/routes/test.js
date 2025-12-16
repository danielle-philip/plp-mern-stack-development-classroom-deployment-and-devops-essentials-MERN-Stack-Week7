// test MongoDB connection
app.get('/test-mongo', async (req, res) => {
  try {
    // List all collections in the current database
    const collections = await mongoose.connection.db.listCollections().toArray();

    // Optionally, show number of documents in each collection
    const stats = {};
    for (let col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      stats[col.name] = count;
    }

    res.json({
      message: 'MongoDB is connected!',
      database: mongoose.connection.name,
      collections: stats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
