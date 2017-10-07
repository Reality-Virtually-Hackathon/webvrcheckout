AFRAME.registerComponent('product', {
    schema: {
        hoverColor: { default: '#fff'},
        rating: { default: '' },
        latestReview: { default: '' }
    },    
    init: function () {
        var _this = this;  
        var el = this.el;  
        
        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', _this.data.hoverColor);  
        });
        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', '#fff');  
        });
        el.addEventListener('click', function () {
            console.log("clicked " + el);
        });
    } 
});