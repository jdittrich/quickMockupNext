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
            },
            dragging:false,
            pos_dragstart:{},
            selectedElementProxys:[]
        }   
    },
    computed: {
        documentElements:function(){
            return this.$store.state.document.documentElements;
        },
        selectedDocumentElement:function(){
            return this.$store.state.document.selectedElementId;
        },
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
            //if the left mouse button is not pressed
            if (event.buttons !== 1) { // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                return 
            }

            //if this is the first move event
            if(this.dragdropstate ===false){
                this.pos_dragstart = {
                    pos_x:event.pageX,
                    pos_y:event.pageY
                }
                this.dragdropstate = true
                 //find currently selected elements
                let selectedElements = this.$store.state.document.documentElements.filter(element =>
                    element.id === this.$store.state.document.selectedElementId); //this only works cause there is only one element selected.
               
                let proxyCopys = selectedElements.map(function (element) {
                    let proxyElement = JSON.parse(JSON.stringify(element));
                    proxyElement.originalId = proxyElement.id;
                    proxyElement.id = "proxy" + proxyElement.id;
                    return proxyElement;
                });
                this.selectedElementProxys=proxyCopys;

            } //end of "if this is the first move event"

            this.selectedElementProxys.forEach(element => {
                element.pos_x += event.movementX;
                element.pos_y += event.movementY;
            });
                                   
        },
        endElementDrag(event){
            moveIDs = this.selectedElementProxys.map(element=>originalId)
            //CONTINUE HERE: TODO: Needs to compare pos_dragstart:{},
            // and get a difference vector

            //commit the changes
            this.$store.commit("MOVELEMENTBY",{       
                new_pos_x = 
                new_pos_y =
            })

            this.dragdropstate = false;
            this.selectedElementProxys = [];
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;"    

        v-on:mousemove.left.ctrl="moveselected"
        v-on:mouseup = "endElementDrag"
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

        <!--element proxies to be displayed during drag --> 
        <qm-doc-element
            v-for="documentElement in selectedElementProxys" :key="documentElement.id"
            v-bind:pos_x  = "documentElement.pos_x"
            v-bind:pos_y  = "documentElement.pos_y"
            v-bind:width  = "documentElement.width"
            v-bind:height = "documentElement.height"
            v-bind:text   = "documentElement.text" 
            v-bind:id     = "documentElement.id"

            style="border:solid 1px green"
            >
        </qm-doc-element>
    </div>
    `
}