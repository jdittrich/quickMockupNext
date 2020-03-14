import qmDocElement from './components/qmDocElement.js'
import documentElements from './testData.js'

console.log(documentElements);

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
            documentElements:documentElements,
            selectedDocumentElements:[]
        }   
    },
    methods:{
        "childselected":function(id){
            this.selectedDocumentElements[0]=id;
        }
    },
    template:`
    <div style="
        width:95%;
        height:95%;
        background-color:#ABC;
        position:absolute;
    "

    >
        <qm-doc-element 
            v-on:child-selected="childselected"
            v-for="documentElement in documentElements" :key="documentElement.id"
            v-bind:pos_x  ="documentElement.pos_x"
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