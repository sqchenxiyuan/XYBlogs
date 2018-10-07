let targetNode = document.getElementById("parent")

let config = { attributes: true, childList: true, subtree: false, characterData: true }

let callback = function(mutationsList) {
    console.log(mutationsList)
    for (let mutation of mutationsList) {
        if (mutation.type == "childList") {
            console.log("A child node has been added or removed.")
        }
        else if (mutation.type == "attributes") {
            console.log("The " + mutation.attributeName + " attribute was modified.")
        }
    }
}

let observer = new MutationObserver(callback)

observer.observe(targetNode, config)


//监听事件
let btnAddChildNode = document.querySelector("#btn-addchildnode")
btnAddChildNode.addEventListener("click", _ => {
    let div = document.createElement("div")
    div.style = "background: black; width:100px;height:100px;"
    targetNode.appendChild(div)
})