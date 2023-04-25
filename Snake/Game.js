
class Game{
    constructor(){
        console.log("cunstructor called")
        this.running = false;
    }
    
    start(){
        this.running = true;
        console.log("start called" + this.running);
    }

}


export {
    Game
};
