

AFRAME.registerComponent('product', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        latestReview: {type: 'string', default: ''},
        rating: {type: 'string', default: ''}
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        console.log("in button, guiItem: "+JSON.stringify(guiItem));
        var guiInteractable = el.getAttribute("gui-interactable");
        console.log("in button, guiInteractable: "+JSON.stringify(guiInteractable));
        var toggleState = this.toggleState = data.toggle;

        console.log("in gui-button init, data: "+JSON.stringify(data));

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', '#333');
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                el.setAttribute('material', 'color', "#fff");
            }
        });

        el.addEventListener(data.on, function (evt) {            
            if (!(data.toggle)) { // if not toggling flashing active state
            }else{
            }
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
    update: function (oldData) {
        console.log("In button update, toggle: "+this.toggleState);
    },
    setActiveState: function (activeState) {
        console.log("in setActiveState function");
        this.data.toggle = this.toggleState = activeState;
        if (!activeState) {
            console.log('state toggle off');
        } else {
            console.log('state toggle on');
        }
    }
});
