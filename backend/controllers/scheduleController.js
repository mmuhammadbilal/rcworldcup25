import Schedule from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSchedule = async (req, res) => {
  const schedule = await Schedule.find().sort({ matchDate: 1 });
  res.json(schedule);
};
