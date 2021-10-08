

window.onload = function() {
    let els= document.querySelectorAll("#board > div");
    Object.values(els).forEach((val) =>  {
        let classes = val.classList;
        classes.add("square");
    });

    let i = 1;
};
