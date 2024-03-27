const Employee = require('../models/employee');
const multer = require('multer');
const path= require('path');
const fs = require('fs');
const { log } = require('console');
const DIR = '../storage/images';
// const cloudinaryUpload = require('../cloudinary');


module.exports = class EmployeeController {
    static getAllEmployees = async (req, res) => {
        try {
            // Pagination parameters
            const page = parseInt(req.query.page) || 1; // Default page is 1
            const limit = parseInt(req.query.limit) || 10; // Default limit is 10

            // Calculate skip value based on page and limit
            const skip = (page - 1) * limit;

            // Query employees with pagination
            const employees = await Employee.find()
              .skip(skip)
              .limit(limit);

            // Construct employee data
            const employeeData = employees.map(employee => ({
                _id: employee._id,
                department: employee.department,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                address: employee.address,
                image: employee?.image != '' ? `http://localhost:5000/${employee.image}` : '' // Construct the image URL
            }));


            res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(await Employee.countDocuments() / limit),
                totalEmployees: await Employee.countDocuments(),
                employees: employeeData
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static createEmployee = async (req, res) => {
        try {
            console.log(req.body, 'req.body')
            const { firstName ,lastName, department, email, address, phone } = req.body;
            let image = '';

            if (req.file) {
                image = `images/${req.file.filename}`;
            } else {
                image = '';
            }

            if (!department || !firstName || !lastName || !phone || !email || !address) {
                const missingFields = ['department', 'lastName', 'email', 'firstName', 'phone', 'address'].filter(field => !req.body[field]);
                return res.status(400).json({ error: `The ${missingFields.join(", ")} fields are required` });
            }

            const newEmployee = new Employee({
                department,
                firstName,
                lastName,
                email,
                address,
                phone,
                image
            });

            const savedEmployee = await newEmployee.save();
            return res.status(201).json(savedEmployee);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    static editEmployee = async (req, res) =>{
        try {
            const {id} = req.params;
            const employee = await Employee.findById(id);
            if (!employee){
                return res.status(404).json({
                    message:'Employee not Found'
                })
            }
            employee['image'] = employee.image ? `http://localhost:5000/${employee.image}` : ''
            return res.json(employee);
        }catch (err){
            res.status(400).json({error : err.message})
        }
    }

    static updateEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName ,lastName, department, email, address, phone } = req.body;
            let image = '';
            // Find the employee by ID
            const employee = await Employee.findById(id);
            // Check if an image file is uploaded
            if (req.file ) {
                    image = `images/${req.file.filename}`;
            } else {
                image = employee.image;
                // return res.status(400).json({ error: 'Image file is required.' });
            }

            // Check if required fields are provided
            if (!department || !firstName || !lastName || !phone || !email || !address) {
                const missingFields = ['department', 'lastName', 'email', 'firstName', 'phone', 'address'].filter(field => !req.body[field]);
                return res.status(400).json({ error: `The ${missingFields.join(", ")} fields are required` });
            }

            // If the employee is not found, return a 404 error
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found.' });
            }

            // Update employee details in the database
            const updatedEmployee = await Employee.findByIdAndUpdate(id, { firstName ,lastName, department, email, address, phone }, { new: true });

            // If the employee is not found or not updated, return a 404 error
            if (!updatedEmployee) {
                return res.status(404).json({ error: 'Failed to update employee.' });
            }

            // Return the updated employee details
            res.json(updatedEmployee);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static deleteEmployee = async (req, res) => {
        try {
            const {id} = req.params;
            const employeeInfo = await Employee.findById(id);
            const employeeImage = employeeInfo.image;
            if (employeeImage){
                fs.unlinkSync('./storage/'+employeeImage)
            }

            const deletedEmployee = await Employee.deleteOne({_id: id})
            if (!deletedEmployee){
                return res.status(404).json({message: 'Employee Not Found'});
            }
            // const imagePath = path.join(__dirname, 'storage', 'images', deletedEmployee.image);
            // fs.unlinkSync(imagePath);
            res.json({
                message: deletedEmployee.image
            })
        }catch (err){
            res.status(404).json({error : err.message})
        }
    }
}
