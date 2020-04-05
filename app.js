import qmDocElement from './components/qmDocElement.js'
import { mapMutations } from './vuex.esm.browser.js'
import store from './store/index.js';

//import documentElements from './testData.js'
function createProxyCopy(documentElement){
    let proxyElement = JSON.parse(JSON.stringify(documentElement)); //deep copy trick
    proxyElement.originalId = proxyElement.id; 
    proxyElement.id = "proxy" + proxyElement.id;

    proxyElement.originalPosition={};
    proxyElement.originalPosition.pos_x = proxyElement.pos_x;
    proxyElement.originalPosition.pos_y = proxyElement.pos_y;
    
    return proxyElement;
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
            console.log("mousedown on app.js")
            //change mousedown variable
            this.dragInProgress = true; 

            //copy to selected elements to the proxy array
            let selectedElement = this.$store.state.document.documentElements.filter(element =>
                element.id === this.$store.state.document.selectedElementId)[0]; //filter returns an array, so [0]
            console.log("app.js","selected element is ", selectedElement);
            //TODO: It easily happens that this does not work, cause there might no be an element if people just click the canvas. 
            let proxyCopy = createProxyCopy(selectedElement);
            
            this.selectedElementProxys = [proxyCopy];
            
            //store coordinates; later use for drag
            this.pos_mousedown={
                pos_x: event.pageX,
                pos_y: event.pageY
            };  
            console.log("proxies",this.selectedElementProxys )
            //hide original element (optional for now)
        },
        moveselected(event){
            console.log("moveselect on app.js")
            //if the left mouse button is not pressed
            if (event.buttons !== 1) { // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                return 
            }

            this.selectedElementProxys.forEach(element => {
                element.pos_x = element.originalPosition.pos_x + event.pageX - this.pos_mousedown.pos_x;
                element.pos_y = element.originalPosition.pos_y + event.pageY - this.pos_mousedown.pos_y;
            });
            
        },
        mouseup(event){
            console.log("mouseup on app.js")
            if (!this.dragInProgress){
                return
            } else {
                this.dragInProgress=false;
            }

            //commit the changes
            this.$store.commit("MOVEELEMENTBY",{       
                'id': this.selectedDocumentElementId,
                'pos_x_diff': event.pageX- this.pos_mousedown.pos_x,
                'pos_y_diff': event.pageY- this.pos_mousedown.pos_y
            });

            
            this.selectedElementProxys = [];
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;"    
        v-on:mousedown="mousedown"
        v-on:mousemove.left="moveselected"
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