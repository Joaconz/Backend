export default class UserVisible {
    constructor(newUser){
        this.first_name = newUser.first_name
        this.last_name  = newUser.last_name
        this.full_name  = `${newUser.first_name} ${newUser.last_name}`
        this.email      = newUser.email
    }
}