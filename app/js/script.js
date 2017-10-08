

AFRAME.registerComponent('product', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        latestReview: {type: 'string', default: ''},
        rating: {type: 'string', default: ''},
        texture: {default: 'team.jpg'},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        console.log("in button, guiItem: "+JSON.stringify(guiItem));
        var guiInteractable = el.getAttribute("gui-interactable");
        console.log("in button, guiInteractable: "+JSON.stringify(guiInteractable));
        var toggleState = this.toggleState = data.toggle;

        this.vector = new THREE.Vector3();
        console.log("in gui-button init, data: "+JSON.stringify(data));

        var base = document.createElement("a-entity");
        base.setAttribute('geometry', 'primitive: sphere; radius:0.17;');
        base.setAttribute('material', 'color:white; shader: flat; src: url(assets/' + data.texture + ');');
        base.setAttribute('position', '0 0 0');
        el.appendChild(base);
        this.base = base;

        var panel = document.createElement("a-entity");
        panel.setAttribute('geometry', 'primitive: plane; width:0.45; height:0.3;');
        panel.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
        panel.setAttribute('position', '0 0.3 0');
        panel.setAttribute('visible', 'false');
        el.appendChild(panel);
        this.panel = panel;


        var text = document.createElement("a-text");
        text.setAttribute('material', 'color: #fff; shader: flat; opacity:0.25;');
        text.setAttribute('position', '0 0 0');
        text.setAttribute('scale', '0.2 0.2 0.2');
        text.setAttribute('text', 'value' , data.latestReview);
        text.setAttribute('text', 'align' , 'center');
        panel.appendChild(text);


        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', '#333');
            panel.setAttribute('visible', 'true');
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                el.setAttribute('material', 'color', "#fff");
                panel.setAttribute('visible', 'false');
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
    tick: function(t) { //  orient towards camera

        var self = this;
        var target = self.el.sceneEl.camera;
        var object3D = self.el.object3D;

        // make sure camera is set
        if (target) {
            target.updateMatrixWorld();
            this.vector.setFromMatrixPosition(target.matrixWorld);
            if (object3D.parent) {
                object3D.parent.updateMatrixWorld();
                object3D.parent.worldToLocal(this.vector);

            }
            //    return object3D.lookAt(this.vector); ignore camera pitch
            return object3D.lookAt(new THREE.Vector3(this.vector.x, object3D.position.y, this.vector.z));
        }
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
