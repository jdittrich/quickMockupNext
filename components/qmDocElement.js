import { mapMutations } from '../vuex.esm.browser.js'
import dragDropManager from '../dragDropManager.js'

/**
 * @implements {dragDropPolicy}
 */
const makeMovingDragDropPolicy = function(store) {
  return {
    mousedown: function (event) {
      //I wonder if I just should call super (get proxy element and attach it (how?) to the mouse cursor)
    },
    mousemove: function (event, pos_mousedown, proxy) {
      //get difference to start event
      // let x_diff = event.pageX - pos_mousedown.pos_x;
      // let y_diff = event.pageY - pos_mousedown.pos_y;

      // //move proxy by start event position
      // proxy.el.left += x_diff;
      // proxy.el.top  += y_diff;
      store.commit(
        "MOVEELEMENTBY",
        {
          'pos_x_diff': event.pageX - pos_mousedown.pos_x,
          'pos_y_diff': event.pageY - pos_mousedown.pos_y
        }
      );
    },
    mouseup: function (event, pos_mousedown) {
      store.commit(
        "MOVEELEMENTBY",
        {
          'pos_x_diff': event.pageX - pos_mousedown.pos_x,
          'pos_y_diff': event.pageY - pos_mousedown.pos_y
        }
      );
    },
  };
  //do return unappended element, leave proxy management to drag drop manager
  //Possible TODO: get some standard functions that copy elements…
  // createProxyElement: function (relatedElement) {
  //   let proxyElement = document.createElement("div");
  //   let styles = {
  //     top    :relatedElement.top,
  //     left   :relatedElement.left,
  //     width  :relatedElement.width,
  //     height :relatedElement.height,
  //     outline:"black solid 1px"
  //   }
  //   //mixin styles to proxy element
  //   Object.assign(proxyElement.style,styles);
  //   return proxyElement;
  // }
};


export default {
    name: 'qm-Doc-Element',
    props:{
      width:Number,
      height:Number,
      pos_x:Number,
      pos_y:Number,
      id:String,
      text:String
    },
    methods:{
      selectThisElement(){
        this.$store.commit('SELECTELEMENT',this.id);
        dragDropManager.setPolicy(makeMovingDragDropPolicy(this.$store));
        // dragDropManager.setRelatedDOMElement(this.$el);
      }
    },
    computed:{
      styleObject:function(){
        return{
          width:this.width+"px",
          height: this.height+"px",
          left: this.pos_x+"px",
          top: this.pos_y+"px",
          position:"absolute",
          "background-color":"rgba(100,160,220,0.5)",
          "user-select":"none"
        };
      }
    },
    data:function(){
      return{}
    },
    template:`
    <div
      class="qmDocElement"
      :style="styleObject"
      v-on:mousedown="selectThisElement"
      >
      {{text}},{{id}},{{pos_x}},{{pos_y}}
    </div>
    `
}
