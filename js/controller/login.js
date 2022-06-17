const loginForm = document.getElementById("loginForm")
loginForm.onsubmit = async (e) => {
    e.preventDefault()
    const response = await User.getUser()({
        email : loginForm[0].value,
        password : loginForm[1].value
    })
        if(!('msg' in response)){
            document.getElementById("error-message").style.display = "none"
            let user = new User(Number(response.token.split("X")[1]))
            user.login(response.token)
            window.location.reload()
        }else{
            document.getElementById("error-message").textContent= response.msg
            document.getElementById("error-message").style.display = "block"
        }
}


const Authanticated = () => {
    if(localStorage.getItem("token")){
        Route.goto("./todos.html")
    }
}

Authanticated()
