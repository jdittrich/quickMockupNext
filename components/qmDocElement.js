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
      wasSelected:function(){
        this.$emit("child-selected",this.id);
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
          "background-color":"rgba(100,160,220,0.5)"
        }
      }
    },
    data:function(){
      return{}
    },
    template:`
    <div 
      class="qmDocElement"
      :style="styleObject"
      @mousedown="wasSelected"
      >
      {{text}},{{id}},{{pos_x}},{{pos_y}}
    </div>
    `
}