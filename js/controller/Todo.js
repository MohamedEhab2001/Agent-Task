let user = {}
if(!localStorage.getItem("token")){
    Route.goto("./index.html")
}else{
    user = new User(JSON.parse(localStorage.getItem("token")).id)
}

//            

const formUpdate = document.getElementById("FormUp")
formUpdate.onsubmit = (e) => {
    e.preventDefault();
    Todo.update("title" , formUpdate[0].value , formUpdate[0].id)
}
if(!localStorage.getItem("todos")){
    Todo.getUserTodos()().then(res => {
        let arr = []
        res.forEach(e => {
            arr.push(e)
            const todo = new Todo(e.completed , e.title , e.id)
            todo.render()
        })
        localStorage.setItem("todos" , JSON.stringify(arr))
    })
}
let dark = false
document.getElementById("dark").onclick = () => {

    if(dark){
        document.documentElement.setAttribute('data-theme', 'light')
        dark = false
    }else{
        document.documentElement.setAttribute('data-theme', 'dark')
        dark = true
    }
}

document.getElementById("logout").onclick = () => {
    user.logout();
    window.location.reload()
}

const todoForm = document.getElementById("todo")
todoForm.onsubmit = (e) => {
    e.preventDefault();
    const todolist = JSON.parse(localStorage.getItem("todos"))
    todolist.push({
        id : todolist.length + 1,
        title : todoForm[0].value,
        completed : false,
        userId : JSON.parse(localStorage.getItem("token")).id
    })
    localStorage.setItem("todos" , JSON.stringify(todolist))
    window.location.reload()
}

const todos = JSON.parse(localStorage.getItem("todos"))
todos.forEach(e => {
    const todo = new Todo(e.completed , e.title , e.id)
    todo.render()
})