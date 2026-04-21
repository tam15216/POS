const repo = require('./category.repo');

const addCategory = async (name) => {
    if(!name) throw new Error('Category name required');
    return await repo.createCategory(name);
};

module.exports = { addCategory }; 