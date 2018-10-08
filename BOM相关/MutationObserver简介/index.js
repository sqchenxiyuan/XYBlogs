// let targetNode = document.getElementById("parent")

// let config = { attributes: true, childList: true, subtree: false, characterData: true }

// let callback = function(mutationsList) {
//     console.log(mutationsList)
//     for (let mutation of mutationsList) {
//         if (mutation.type == "childList") {
//             console.log("A child node has been added or removed.")
//         }
//         else if (mutation.type == "attributes") {
//             console.log("The " + mutation.attributeName + " attribute was modified.")
//         }
//     }
// }

// let observer = new MutationObserver(callback)

// observer.observe(targetNode, config)


// //监听事件
// let btnAddChildNode = document.querySelector("#btn-addchildnode")
// btnAddChildNode.addEventListener("click", _ => {
//     let div = document.createElement("div")
//     div.style = "background: black; width:100px;height:100px;"
//     targetNode.appendChild(div)
// })

//属性改变
let attributesChangeEl = document.querySelector("#attributes-change")
let config1 = { attributes: true, attributeOldValue: true, attributeFilter: ["data-a"] }
let observer1 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer1.observe(attributesChangeEl, config1)

//文本改变
let characterdataChangeEl = document.querySelector("#characterdata-change")
let config2 = { characterData: true, subtree: true }
let observer2 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer2.observe(characterdataChangeEl, config2)

//子节点改变
let childlistChangeEl = document.querySelector("#childlist-change")
let config3 = { childList: true }
let observer3 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer3.observe(childlistChangeEl, config3)

document.querySelector("#childlist-change-btn").addEventListener("click", function(){
    childlistChangeEl.removeChild(childlistChangeEl.children[0])
    let div = document.createElement("div")
    div.innerHTML = Date.now()
    childlistChangeEl.appendChild(div)
})