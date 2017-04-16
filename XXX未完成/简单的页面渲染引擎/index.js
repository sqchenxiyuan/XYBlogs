let str = "<div>{{msg}}{{msg}}{{msg}}{{msg}}</div>{{msg}}";

let fornt = "{{",
    end = "}}";
let regstr = fornt + "(.*?)" + end;

let reg = new RegExp(regstr,'g');

console.log(render(str, {msg:123}));






function render(template, data){
    console.log(template.split(reg))
    console.log(template.match(reg))


    return template;
}
