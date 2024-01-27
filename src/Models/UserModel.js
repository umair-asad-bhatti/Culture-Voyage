class UserModel {
    constructor(email) {
        this["Email"]=email;
        this["First Name"] = "";
        this["Last Name"] =  "";
        this["Username"] =  "";
        this["Country"] =  "";
        this["Country Code"] = "";
        this["Country Dial Code"] = "";
        this["National Number"] = "";
        this["Phone Number"] = "";
        this["Gender"] = "";
        this["Avatar"] = "";
        this["Date Of Birth"] = "";
        this["Phone Verified"] = false;
        this["User Created Communities"]=[]
    }
}
export {UserModel}