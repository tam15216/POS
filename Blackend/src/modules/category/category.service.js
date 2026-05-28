const repo = require('./category.repo');

const addCategory = async (category_name) => {
    if(!category_name) throw new Error('Category name required');
    return await repo.createCategory(category_name);
};

const getCategories = async () => {
    return await repo.getAllCategories();
};

const getCategoriesnotall = async () => {
    return await repo.getnotAllCategories();
};

const toggleCategory = async (id) => {
    if(!id) throw new Error('Category id required');
    return await repo.toggleCategory(id);
}

module.exports = { addCategory, getCategories, toggleCategory, getCategoriesnotall }; 