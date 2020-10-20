import { default as assets } from '../assets.json';



class ResourceLoader {
    constructor(){
        if (!!ResourceLoader.instance) {
            return ResourceLoader.instance;
        }
        ResourceLoader.instance = this;

        this.resources = [];
        this.loading = true;
        this.loadschedule = 0;
        this.schedule = [];

        return this;
    }

    //@TODO: refactor to use promises
    initialize(callback){
        Object.keys(assets).forEach(key => {
            this.loadschedule += 1;
            var img = new Image();
            img.src = assets[key];
            img.onload = () => {
                this.loadschedule -= 1;
                if(this.loadschedule === 0){
                    callback(this.resources);
                }
            }
            this.resources[key] = img;
        });
    }

    isLoading(){
        return !this.loadschedule;
    }

    get(key){
        return this.resources[key];
    }
}

// singleton
export default new ResourceLoader();