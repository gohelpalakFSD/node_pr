const fs = require('fs');
const path = require('path');

const usersmodel = require('../models/movie.model');

const addpage = (req, res) => {
    return res.render('add');
}

// ========== view Data ==========
const viewpage = async (req, res) => {
    try {
        const users = await usersmodel.find()
        return res.render('view', { users })
    } catch (error) {
        console.log(error);
    }
}

// ========== Add Data ==========

const adddata = async (req, res) => {
    // console.log(req.body);
    console.log(req.file);
    // return res.redirect("/views")
    let imagePath = "";
    if (req.file) {
        imagePath = `/uploads/admins/${req.file.filename}`
    }
    req.body.image = imagePath;
    let newProduct = await usersmodel.create(req.body);
    if (newProduct) {
        console.log('Movie Added');
        return res.redirect('/views');
    } else {
        console.log("Somthing Wrong");
        return res.redirect("/views");
    }
}

// ========== Delete Data ==========

const deletedata = async (req, res) => {
    // console.log(req.params);
    
    
    let rec = await usersmodel.findById(req.params.id);
    console.log(req.params.id);
    // console.log(rec);
    if (rec) {
        try {
            let imagepath = path.join(__dirname, "..", rec.image)
            await fs.unlinkSync(imagepath);
        } catch (error) {
            console.log(error)
        }
        await usersmodel.findByIdAndDelete(req.params.id);
        console.log("Delete Success");
        return res.redirect('/views');
    } else {
        console.log('Somthing Wrong');
        return res.redirect('/views');
    }

}

// ========== Edit Data ==========

const edit = async (req, res) => {


    let rec = await usersmodel.findById(req.params.id);
    if (rec) {
        return res.render('edit', { product: rec })
    }
}

// ========== update Data ==========

const update = async(req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    
    try {
        let rec = await usersmodel.findById(req.params.id);
        if (rec) {
            if (req.file) {
                let imagepath = path.join(__dirname, "..", rec.image)
                await fs.unlinkSync(imagepath);
                imagepath = `/uploads/admins/${req.file.filename}`
                req.body.image = imagepath;
            }
            await usersmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log('Update Success');
            return res.redirect("/views");
        }
    } catch (error) {
        console.log("something wrong");
    }


}

module.exports = {
    addpage,
    viewpage,
    adddata,
    deletedata,
    edit,
    update
}