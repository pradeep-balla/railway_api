const db = require('../config/dbconfig');

const Booking = {
  create: async (userId, trainId, seats) => {
    const connection = await db.getConnection(); 
    await connection.beginTransaction(); 

    try {
      const query = `
        INSERT INTO bookings (user_id, train_id, seats)
        VALUES (?, ?, ?)
      `;
      const [result] = await connection.query(query, [userId, trainId, seats]);

      await connection.commit(); 
      connection.release(); 

      console.log(`✅ Booking successful! Booking ID: ${result.insertId}`);
      return result.insertId;
    } catch (err) {
      await connection.rollback(); 
      connection.release();

      console.error('❌ Booking failed:', err.message);
      throw new Error('Error creating booking: ' + err.message);
    }
  },
};

module.exports = Booking;
