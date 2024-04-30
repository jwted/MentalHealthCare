const categoria=require('../Models/Categorias/Categoria.js');
const categoria_objetivo=require('../Models/Categorias/Categoria_Objetivo.js');
const categoria_atividade=require('../Models/Categorias/Categoria_Atividade.js');

exports.createCategory = async (req, res) => {
    try {
        const data = await categoria.create(req.body);
        return res.status(201).json({
            success: "Category created successfully",
            Category: data,
        });
    } catch {
        return res.status(500).json({
            error: "Something went wrong. Please try again later",
        });
    }

}

exports.getCategories = async (req, res) => {
    try {
        const data = await categoria.findAll();
        return res.status(200).json({
            success: "Successful request",
            Categories: data,
        });
    } catch {
        return res.status(500).json({
            error: "Something went wrong. Please try again later",
        });
    }
}

