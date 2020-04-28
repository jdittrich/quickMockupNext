import dragDropManager from '../dragDropManager.js'
import store from '../store/index.js';

//DOES NOT WORK
// function domFromString(string,styleObject){
//   var parser = new DOMParser();
//   var domElement = parser.parseFromString(domString, 'text/html');
//   Object.assign(domElement.style,styleObject)
//   return domElement;
// }


/**
 * Event passing to app (or canvas)
 * Proxy element function returning dom of proxy
 *
 * "when I am [evented] then do…"
 * "just register implementation and then the element triggers it"
 * for many elements have a many elements components like the selection rectangle
 * which would do all the actions for the whole selection.
 *
 * When a new element is added the central element can inject what ever it likes
 * to the components
 *
 * How d2D does policies (seems to be basically interface pattern?): `  circle.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());`
 * Objects also bring template methods, to be overwritten in child classes (but that might be overly java )
 *
 * App provides class -> class provides hook to register different thingies on ->
 *
 * Pseudocode:
 *
 * app.dragdrop.registerHandler("name",{
 * on…
 * on…
 * createproxy:…
 * })
 *
 * and:
 * app.dragdrop.removeHandler("name");
 * -----
 * or we do this with the standard "on"… "emit" by vue. Pro using existing event bus, contra… how does the drag, drop selected?
 *
 * Strategy pattern: https://www.youtube.com/watch?v=SicL4fYCz8w
 * and https://robdodson.me/javascript-design-patterns-strategy/ has, at the end, pretty much "our" example
 *
 */

/**
 * @implements {dragDropPolicy}
 */
 const scalingDragDropPolicy = {
  mousedown:function(event){

  },
  mousemove: function(event,pos_mousedown){
    store.commit(
      "SCALESELECTEDELEMENTSBY",
      {
        'width_diff' : event.pageX - pos_mousedown.pos_x,
        'height_diff': event.pageY -pos_mousedown.pos_y,
      }
    );
  },
  mouseup: function (event,pos_mousedown){
    store.commit(
      "SCALESELECTEDELEMENTSBY",
      {
        'width_diff' : event.pageX - pos_mousedown.pos_x,
        'height_diff': event.pageY -pos_mousedown.pos_y
      }
    );
  },
  // createProxyElement:function(){
  //   return domFromString('<div style="width:10px;height:10px">O</div>')
  // }
 };



export default {
    name: 'qm-doc-selection-handle-scale',
    props:{
      pos_x:Number,
      pos_y:Number,
    },
    methods:{
      mouseDownScale(){
        dragDropManager.setPolicy(scalingDragDropPolicy);
        // dragDropManager.setRelatedElement();
      }
    },
    computed:{
      styleObject:function(){
        return{
          width:10+"px",
          height: 10+"px",
          left: 0+"px",
          top: 0+"px",
          position:"absolute",
          "background-color":"rgba(20,40,220,0.8)",
          "user-select":"none"
        };
      }
    },
    data:function(){
      return{}
    },
    template:`
    <div
      class="qmDocElementScale"
      :style="styleObject"
      v-on:mousedown="mouseDownScale"
      >
      o
    </div>
    `
};
