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
}

export default {
    name:'app',
    components: {
        "qm-doc-element": qmDocElement
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
            selectedElementProxys:[]
        };   
    },
    computed: {
        documentElements:function(){
            return this.$store.state.document.documentElements;
        },
        selectedDocumentElementId:function(){
            return this.$store.state.document.selectedElementId;
        },
    },
    methods:{
        mousedown(event){
            dragDropManager.mousedownAction(event)
            //create a duplicate of the element(s to be moved) //hide corresponding elements
        },
        mousemove(event){
            dragDropManager.mousemoveAction(event)
            
        },
        mouseup(event){
            dragDropManager.mouseupAction(event); 
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;"    
        v-on:mousedown="mousedown"
        v-on:mousemove.left="mousemove"
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
        <qm-doc-element-handle-scale></qm-doc-element-handle-scale>  
    </div>
    `
}