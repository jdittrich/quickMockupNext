import { mapMutations } from '../vuex.esm.browser.js'

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
        console.log("mousedown on qm.element", " ID:", this.id)
        this.$store.commit('SELECTELEMENT',this.id)
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