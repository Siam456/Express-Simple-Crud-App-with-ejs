const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model');


const {stuvalidator , checkvalidation} = require('./validation');
const {check} = require('express-validator');

const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.set('view engine', 'ejs');



mongoose.connect('mongodb://localhost:27017/expresscurd',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connection ok'))
.catch((err) => {throw err});



app.get('/', async (req, res) => {
    const student = await Student.find({});
    //console.log(student);
    res.render('index',{
        data: student
    });
});

app.post('/', stuvalidator, checkvalidation, async (req, res) => {

    const Stu = new Student(req.body);
    //console.log(req.body);
    try{
        const ress = await Stu.save();
        res.status(200).json({
            ress,
        })
    } catch(err){
        res.status(500).json({
            err: req.body,
        });
    }

}); 

app.put('/:id', async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.id);
    console.log(req.body.section);
    console.log(req.params.id);

    try{
        const up = await Student.updateOne({_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    id:req.body.id,
                    section: req.body.section,
                }
            });

        res.status(200).json({
            msg: "Updated Successfully!!"
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }

    
    
});

app.delete('/:id', async (req, res) => {
    
    try{
        const resp = await Student.deleteOne({_id: req.params.id});
        res.json({
            resp
        })
    } catch(err){
        res.json({
            err
        })
    }
});

app.use((req, res, next) => {
    res.render("error");
});


app.listen(3000, () => { console.log('starting')});