 /**
  * @interface DragDropPolicy
  */
const dragDropManager ={
    //mock policy
    policy:{
        mousedown(){
            throw new Error("mousedown policy not implemented")
        },
        mousemove(){
            throw new Error("mousemove policy not implemented")
        },
        mouseup(){
            throw new Error("mouseup policy not implemented");
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
    //Call these to execute actions of the policy
    mousedownAction(event){
        this.mousedownPosition={
            pos_x:event.clientX,
            pos_y:event.clientY
        };
    },
    //should get the proxy element
    mousemoveAction(event){
        this.policy.mousemove(event, this.mousedownPosition,this.proxy);
    },
    //should get the proxy element?
    mouseupAction(event){
        this.policy.mouseup(event, this.mousedownPosition);
    },
};