const repo = require('./category.repo');

const addCategory = async (category_name) => {
    if(!category_name) throw new Error('Category name required');
    return await repo.createCategory(category_name);
};

const getCategories = async () => {
    return await repo.getAllCategories();
};

const deleteCategory = async (id) => {
    if(!id) throw new Error('Category id required');
    return await repo.deleteCategory(id);
}

module.exports = { addCategory, getCategories, deleteCategory }; 