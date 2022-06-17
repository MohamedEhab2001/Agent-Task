class User{
    constructor(id){
        this.id = id
    }
    login(token){
        localStorage.setItem("token" , JSON.stringify({
            id : this.id,
            token
        }))
    }
    logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("todos")
    }
    static getUser (){
        return async (data) => {
            document.getElementById("loading").style.display = "flex"
            try {
                const res = await axios.post("https://reqres.in/api/login" , data)
                document.getElementById("loading").style.display = "none"
                return res.data
            } catch (error) {
                document.getElementById("loading").style.display = "none"
                return {msg : "Try another email"}
            }
        }
    }
}