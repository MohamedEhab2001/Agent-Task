class Route{
    static goto(link){
        const anchor = document.createElement("a")
        anchor.href = link
        anchor.click()
    }
}