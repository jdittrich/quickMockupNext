import documentElements from './testData.js'

const state = {
    documentElements: documentElements,//the things on the canvas

    //selectedElementId, Array with elements like "2" – Type string
    selectedElementIds:[], //we need selected elements in the store since only the elements themselves "know" if they have been selected/clicked.
    lastMousedownOn:{
        type:"", //a type of element: documentElement, resizeHandle, …
        id:"" //id (if element has it)
    }, //where was the last mousedown on?
    inDragDrop: false,
    proxyElement: null
}

const getSelectedElement = () => {
    return state.documentElements.find(element =>
        element.id === state.selectedElementIds[0]
    );
}

const mutations ={
    PROXY_ELEMENT(proxyElement) {
        state.proxyElement = proxyElement;
    },

    /**
    * mutation to move an element with an ID
    * @param {Object} state - Vuex State
    * @param {String} id - Document Element ID
    */

    SELECTELEMENT(state,id){
        state.selectedElementIds=[id];
    },

    /**
    * mutation to move an element with an ID
    * @param {Object} state - Vuex State
    * @param {Object} moveElementBy
    * @param {Object} moveElementBy.id - ID of the object to be moved
    * @param {Number} moveElementBy.pos_x_diff - horizontal movement
    * @param {Number} moveElementBy.pos_y_diff - vertical movement
    */
    MOVEELEMENTBY(state,moveElementBy){
        let element;
        if (state.inDragDrop) {
            element = state.proxyElement;
        } else {
            element = getSelectedElement();
        }
        element.pos_x += moveElementBy.pos_x_diff;
        element.pos_y += moveElementBy.pos_y_diff;
    },

    /**
    * mutation to move an element with an ID
    * @param {Object} state - Vuex State
    * @param {Object} scaleElementBy
    * // @param {Object} scaleElementBy.id - ID of the object to be moved
    * @param {Number} scaleElementBy.width_diff - horizontal scale
    * @param {Number} scaleElementBy.height_diff - vertical scale
    * @param {String} [scaleElementBy.directions="se"] - direction of scaling (should be "se", southeast for now)
    */

    SCALESELECTEDELEMENTSBY(state,scaleElementBy){
        let element;
        if (state.inDragDrop) {
            element = state.proxyElement;
        } else {
            element = getSelectedElement();
        }

        element.width += scaleElementBy.width_diff;
        element.height += moveElementBy.height_diff;
    },

    DRAG_START() {
        state.inDragDrop = true;
    },

    DRAG_END() {
        state.inDragDrop = false;
    }
};

const actions = {


}


export default {
    state,
    mutations,
    actions
};
