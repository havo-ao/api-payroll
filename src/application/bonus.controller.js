import { BonusService } from "../domain/bonuses/bonus.service.js";

const service = new BonusService();

export const registerBonus = async (req, res) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBonusesByYear = async (req, res) => {
  try {
    const bonuses = await service.listByYear(parseInt(req.params.year));
    res.json(bonuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBonusesByEmployee = async (req, res) => {
  try {
    const bonuses = await service.listByEmployee(
      parseInt(req.params.employeeId),
      parseInt(req.params.year)
    );
    res.json(bonuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
