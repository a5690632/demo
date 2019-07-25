//Component Object
Component({
    properties: {
        innerText: {
            type: String,
            value: "",
            observer: function() {}
        }
    },
    data: {
        text: "1"
    },
    methods: {
        demo() {
            this.setData({
                text: "2"
            });
            // this.triggerEvent("haha");
        }
    },
    lifetimes: {}
});