router.get('/createRole', function(req, res, next) {
    //first create a new user
    const result = sequelize.transaction((t) => {
        // With CLS enabled, the user will be created inside the transaction
        let outUser = User;
        let outRole = Role;
        return User.create({
            firstName: 'something',
            lastName: 'someLastname',
            email: 'someEmail@gmail.com',
            password: hashPassword('mohammad')
        }, { transaction: t }).then(user => {
            outUser = user
            console.log('users created', user)
            return Role.create({
                    name: 'admin',
                    description: 'some description',
                }, { transaction: t })
                .then(role => {
                    console.log(role)
                    return outUser.addRole({
                            outRole
                        }, {
                            through: "user_roles"
                        }, { transaction: t })
                        //redirect to users page
                })
                //redirect to users page
        })
    })

    result.then(data => {
        res.redirect('/users')
    }).catch(error => {
        console.log(error)
        res.redirect('/users/createRole')
    })



});