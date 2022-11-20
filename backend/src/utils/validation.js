const isEmail = function(email){
    let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
const isPassword=function(password){
    let passwordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    return passwordRegex.test(password)
}
const isAlpha=function(value){
    let alphaRegex=/^[a-z]{15}$/
    return value.match(alphaRegex)
}
const isPhone=function(number){
    let phoneRegex=/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
    return phoneRegex.test(number)
}
module.exports={isEmail,isPassword,isAlpha,isPhone}