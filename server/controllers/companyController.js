import Company from "../models/companyModel.js";

export const registerCompany = async (req,res) =>{
    try{

        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({message: 'Company name is required'});
        }

        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({message: 'Company already exists'});
        }

        company = new Company({
            name: companyName,
            description: req.body.description || '',
            location: req.body.location || '',
            website: req.body.website || '',
            logo: req.body.logo || '',
            userId: req.user.id 
        });
        await company.save();
        return res.status(201).json({message: 'Company registered successfully', company});

    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}

export const getAllCompanies = async(req,res)=>{
    try{
        const userId = req.user.id;
        const companies = await Company.find({userId}).select('-__v -createdAt');
        if(!companies || companies.length === 0){
            return res.status(404).json({message: 'No companies found'});
        }
        return res.status(200).json({companies});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const {id} = req.params;
        const company = await Company.findById(id).select('-__v -createdAt');
        if(!company){
            return res.status(404).json({message: 'Company not found'});
        }
        return res.status(200).json({company});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}

export const updateCompany = async(req,res)=>{
    try{
        const {id} = req.params;
        const {companyName, description, location, website, logo} = req.body;
        if(!companyName){
            return res.status(400).json({message: 'Company name is required'});
        }
        let company = await Company.findById(id);
        if(!company){
            return res.status(404).json({message: 'Company not found'});
        }
        company.name = companyName;
        company.description = description || company.description;
        company.location = location || company.location;
        company.website = website || company.website;
        company.logo = logo || company.logo;
        await company.save();
        return res.status(200).json({message: 'Company updated successfully', company});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}