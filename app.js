import qmDocElement from './components/qmDocElement.js'
import { mapMutations } from './vuex.esm.browser.js'
import store from './store/index.js';

//import documentElements from './testData.js'


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
            }
        }   
    },
    computed: {
        documentElements:function(){
            return this.$store.state.document.documentElements;
        },
        selectedDocumentElement:function(){
            return this.$store.state.document.selectedElementId;
        }
    },
    methods:{
        unselectAll(){
            this.$store.commit("UNSELECTALL")
        },
        moveselected(event){
            
            //if nothing is selected…
            if (this.selectedDocumentElement===""){
                return
            }

            
            //create a copy
            //TBD
            // hide the original
            //TBD
            //move element

            let id = this.selectedDocumentElement;
                        
            this.$store.commit("MOVEELEMENTBY",{
                "id": id,
                 "x":event.movementX,
                 "y":event.movementY
            });            
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;"    

        v-on:mousemove.left.ctrl="moveselected"
    >
        <button v-on:click="unselectAll">unselect</button>
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
    </div>
    `
}