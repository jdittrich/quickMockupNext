import qmDocElement from './components/qmDocElement.js'
import qmDocHandleScale from './components/qmDocHandleScale.js'
import store from './store/index.js';
import dragDropManager from './dragDropManager.js';

//import documentElements from './testData.js'
// function createProxyCopy(documentElement){
//     let proxyElement = JSON.parse(JSON.stringify(documentElement)); //deep copy trick
//     proxyElement.originalId = proxyElement.id;
//     proxyElement.id = "proxy" + proxyElement.id;

//     proxyElement.originalPosition={};
//     proxyElement.originalPosition.pos_x = proxyElement.pos_x;
//     proxyElement.originalPosition.pos_y = proxyElement.pos_y;

//     return proxyElement;
// }


export default {
    name:'app',
    components: {
        "qm-doc-element": qmDocElement
    },
    created: function() {
        dragDropManager.setProxyCallback(proxyElement => this.$store.commit("PROXY_ELEMENT", proxyElement));
        dragDropManager.setFallbackProxyFactory(() => {
            let boundingBox = { x: 0, y: 0, width: 0, height: 0};
            for(id in this.$store.state.selectedElementIds) {
                const element = this.findElement(id);
                if (!element) return;

                boundingBox = this.expandBoundingBox(boundingBox, element);
            }

            return boundingBox;
        });
    },
    data:function(){
        return {
            canvas:{
                pos_x:0,
                pos_y:0,
                width:1000,
                height:1000
            },
            dragInProgress:false,
            pos_mousedown:{
                x:null,
                y:null
            },
            selectedElementProxys:[],
        };
    },
    computed: {
        documentElements:function(){
            return this.$store.state.document.documentElements;
        },
        selectedDocumentElementId:function(){
            return this.$store.state.document.selectedElementId;
        }
    },
    methods:{
        mousedown(event){
            this.$store.commit("DRAG_START");
            dragDropManager.mousedownAction(event)
            //create a duplicate of the element(s to be moved) //hide corresponding elements
        },
        mousemove(event){
            if (this.$store.state.inDragDrop) {
                dragDropManager.mousemoveAction(event)
            }

        },
        mouseup(event){
            this.$store.commit("DRAG_END");
            dragDropManager.mouseupAction(event);
        },
        findElement(id) {
            return this.$store.state.document.documentElements.find(element => element.id === id);
        },
        expandBoundingBox(boundingBox, element) {
            const zoomFactor = 1;
            const scrollX = 0;
            const scrollY = 0;

            const elementBoundingBox = {
                x: element.pox_x,
                y: element.pox_y,
                width: element.width,
                height: element.height
            };

            const startX = Math.min(boundingBox.x, element.x);
            const startY = Math.min(boundingBox.y, element.y);

            const elementEndX = element.x + element.width;
            const elementEndY = element.y + element.height;

            const boundingBoxEndX = boundingBox.x + boundingBox.width;
            const boundingBoxEndY = boundingBox.y + boundingBox.height;

            return {
                x: startX,
                y: startY,
                width: (elementEndX > boundingBoxEndX ? elementEndX : boundingBoxEndX) - startX,
                height: (elementEndY > boundingBoxEndY ? elementEndY : boundingBoxEndY) - startY,
            }
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;"
        v-on:mousedown.left="mousedown"
        v-on:mousemove="mousemove"
        v-on:mouseup = "mouseup"
    >
        <qm-doc-element
            v-for="documentElement in documentElements" :key="documentElement.id"
            v-bind:pos_x  = "documentElement.pos_x"
            v-bind:pos_y  = "documentElement.pos_y"
            v-bind:width  = "documentElement.width"
            v-bind:height = "documentElement.height"
            v-bind:text   = "documentElement.text"
            v-bind:id     = "documentElement.id"
            >
        </qm-doc-element>

        <!--elements affecting selected -->
        <!-- <qm-doc-element-handle-scale></qm-doc-element-handle-scale> -->
    </div>
    `
}
