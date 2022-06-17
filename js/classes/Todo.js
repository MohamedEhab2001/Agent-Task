class Todo{
    constructor(status , title , id){
        this.status = status ? "completed" : "none"
        this.title = title
        this.id = id
    }
    render(){
        const parent = document.createElement("div")
        const paragraph = document.createElement("p")
        const buttons = document.createElement("div")
        buttons.classList.add("btns")
        const button = document.createElement("button")
        const update = document.createElement("button")
        button.classList.add("btn")
        update.classList.add("btn")
        this.status == "completed" ? button.classList.add("btn-warning") : button.classList.add("btn-danger")
        button.innerHTML = "<i class='fas fa-eraser'></i>"
        update.innerHTML = "<i class='far fa-edit'></i>"
        update.classList.add("btn-success")
        parent.classList.add("task")
        paragraph.textContent = this.title
        parent.append(paragraph)
        buttons.append(button)
        buttons.append(update)
        parent.append(buttons)
        const con = document.getElementById("conTod")
        if(this.status == "completed"){
            parent.classList.add("done")
        }
        button.onclick = () => {
            let todos = JSON.parse(localStorage.getItem("todos"))
            let newTodos = todos.filter(e => e.id != this.id)
            console.log(newTodos)
            localStorage.setItem("todos" , JSON.stringify(newTodos))
            window.location.reload()
        }
        parent.ondblclick = () => {
            if(parent.classList.contains("done")){
                button.classList.remove("btn-warning")
                parent.classList.remove("done")
                button.classList.add("btn-danger")
            }else{
                button.classList.remove("btn-danger")
                parent.classList.add("done")
                button.classList.add("btn-warning")
            }
        }

        con.append(parent)
    }
    static getUserTodos(){
        return async () => {
           try {
            const id = JSON.parse(localStorage.getItem("token")).id;
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
            return res.data
           } catch (error) {
                return {msg : "error occured"}
           }
        }
    }
}