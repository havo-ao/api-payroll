import { LegalBonusService } from "../domain/legalBonuses/legalBonus.service.js";

const service = new LegalBonusService();

export const registerBonus = async (req, res) => {
  const { employee_id, year, period } = req.body;
  try {
    const result = await service.register({ employee_id, year, period });
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
