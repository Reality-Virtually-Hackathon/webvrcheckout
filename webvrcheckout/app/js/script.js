AFRAME.registerComponent('interactable', {
    schema: {
        on: {default: 'click'},
        clickAction: {type: 'string'},
        hoverAction: {type: 'string'},
        keyCode: {type: 'number', default: null},
    },
    init: function () {
        var _this = this;
        var data = this.data;
        var el = this.el;

        if(data.keyCode){
            window.addEventListener("keydown", function (event) {
                if(event.keyCode == data.keyCode){                  
                    console.log("key press by interactable : " + data.keyCode);
                    el.emit('click');
                }
                event.preventDefault();
            }, true);
        }

        el.addEventListener(data.on, function (evt) {            
            var clickActionFunctionName = _this.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });

    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
    setClickAction: function (action) {
        this.data.clickAction = action; //change function dynamically
    },
});
