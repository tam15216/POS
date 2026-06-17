const ingredientService = require("./ingredient.service");

const createIngredient = async (req, res) => {
  try {
    const result = await ingredientService.createIngredient(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getIngredients = async (req, res) => {
  try {
    const data = await ingredientService.getIngredients(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ingredientService.updateIngredient(id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const toggleIngredientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ingredientService.toggleIngredientStatus(id, req.body);
    res.json({
      success: true,
      message:
        result.Is_active === 1
          ? "เปิดใช้งานวัตถุดิบเรียบร้อย"
          : "ปิดใช้งานวัตถุดิบเรียบร้อย",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStockHistory = async (req, res) => {
  try {
    const data = await ingredientService.getStockHistory();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const restockIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity_received, buy_price, ref_id, action_type } = req.body;

    if (quantity_received === undefined || buy_price === undefined) {
      return res.status(400).json({
        error: "Missing required fields: quantity_received or buy_price",
      });
    }

    const result = await ingredientService.restockIngredient(id, {
      quantity_received,
      buy_price,
      ref_id,
      action_type: action_type || "restock",
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStockQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ingredientService.updateStockQuantity(id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createIngredient,
  getIngredients,
  updateIngredient,
  toggleIngredientStatus,
  getStockHistory,
  updateStockQuantity,
  restockIngredient,
};
