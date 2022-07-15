const router = require('express').Router();
const { User } = require('../../models');

//get users
router.get('/', (req, res)=>{
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//get user 1
router.get('/:id',(req, res) =>{
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData =>{
        if(!dbUserData){
            res.status(404).json({ message: 'No User found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });

});

//post new user (create)
router.post('/',(req, res )=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});


router.put('/:id',(req, res)=>{

});

router.delete('/:id', (req, res)=>{

});


module.exports = router;

