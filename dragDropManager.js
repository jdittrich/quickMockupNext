 /**
  * @interface DragDropPolicy
  */
const dragDropManager = {
    //mock policy
    policy:{
        mousedown(){
            // throw new Error("mousedown policy not implemented")
        },
        mousemove(){
            // throw new Error("mousemove policy not implemented")
        },
        mouseup(){
            // throw new Error("mouseup policy not implemented");
        },
    },
    //store initial mousedown coordinates
    _mousedownPosition:{
        pos_x:null,
        pos_y:null
    },
    //replace current policy with another one
    setPolicy(policy){
        this.policy=policy;
    },
    setProxyCallback(cb) {
        this._proxyCallback = cb;
    },
    //Call these to execute actions of the policy
    mousedownAction(event){
        this.mousedownPosition={
            pos_x:event.clientX,
            pos_y:event.clientY
        };
        this._proxyCallback && this._proxyCallback(
            (this.policy.createProxyElement && this.policy.createProxyElement()) || this.makeFallbackProxy()
        );
    },
    //should get the proxy element
    mousemoveAction(event){
        this.policy && this.policy.mousemove(event, this.mousedownPosition,this.proxy);
    },
    //should get the proxy element?
    mouseupAction(event){
        this.policy && this.policy.mouseup(event, this.mousedownPosition);
    },

    setFallbackProxyFactory(factory) {
        this._fallbackProxyFactory = factory;
    },

    makeFallbackProxy() {
        if (this._fallbackProxyFactory) {
            return this._fallbackProxyFactory();
        }
    }
};

export default dragDropManager;
