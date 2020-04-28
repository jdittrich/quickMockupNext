const proxyElementPolicyManager = {
/**
* @property { function } createProxyElement - a function creating a dom element based on relatedDOMElement
* @property { object}  relatedElement - a DOM element
*/
  policy:{
    createProxyElement(relatedDOMElement){
      throw error("no proxy element implemented")
    },
    //DOMElement
    relatedDOMElement:null 
  },
  //set policy
  setProxyElementPolicy:function(policy){
    this.policy = policy;
  }
  
  _relatedDOMElement:null,
  getProxyElement(){
    return proxyElement
  }
}