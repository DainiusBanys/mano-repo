function View({visible, active, element}) {


        if (visible !== active) {
            return null;
        }
    
        return element;
    
    
    }
    
    export default View