const service = require("./option.service");

const addOption = async (req, res) => {
  try {
    const result = await service.createOption(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loadIngredients = async (req, res) => {
  try {
    const data = await service.getAllIngredients();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const mapIngredients = async (req, res) => {
  try {
    const optionId = req.params.id;
    const result = await service.updateOptionMapping(
      optionId,
      req.body.ingredients,
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loadOptionRecipe = async (req, res) => {
  try {
    const optionId = req.params.id;
    const data = await service.getOptionRecipe(optionId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editOption = async (req, res) => {
  try {
    const optionId = req.params.id;
    const { Option_name, Price } = req.body;

    const result = await service.updateOption(optionId, { Option_name, Price });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleOptionStatus = async (req, res) => {
  try {
    const optionId = req.params.id;
    const { Is_active } = req.body;

    const result = await service.updateOptionStatus(optionId, Is_active);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loadActiveOptions = async (req, res) => {
  try {
    const data = await service.getActiveOptions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addOption,
  loadIngredients,
  mapIngredients,
  loadOptionRecipe,
  editOption,
  toggleOptionStatus,
  loadActiveOptions
  
};
