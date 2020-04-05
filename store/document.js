import documentElements from './testData.js'

const state = {

    // {
    // "id": "1",
    // "pos_x": 100,
    // "pos_y": 100,
    // "width": 100,
    // "height": 100,
    // "text": "test1"
    // } Type Object
    documentElements: documentElements,//the things on the canvas
    //selectedElementId, Array with elements like "2" – Type string
    selectedElementId:"", //we need selected elements in the store since only the elements themselves "know" if they have been selected/clicked.
}    

const mutations ={
    SELECTELEMENT(state,id){
        state.selectedElementId=id;
    },
    UNSELECTALL(state){ 
        state.selectedElementId = "";
    },
    //should probably be moveElementTo and have …by only as proxy.
    MOVEELEMENTBY(state,moveElementBy){
        let element = state.documentElements.find(element => 
            element.id === moveElementBy.id
        );
        element.pos_x += moveElementBy.pos_x_diff;
        element.pos_y += moveElementBy.pos_y_diff;
    }   
};


export default {
    state,
    mutations
};
