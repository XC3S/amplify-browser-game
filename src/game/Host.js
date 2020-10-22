import React from 'react';
import Game from './Game';

import ResourceLoader from './engine/ResourceLoader';
import InputManager from './input/InputManager';

class Host extends React.Component {

    constructor(props) {
        super(props);
        this.game = new Game();
        this.lastDraw = performance.now();
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        InputManager.initialize(canvas);

        // load resources
        ResourceLoader.initialize((resources) => {
            console.log('[ENGINE] Resources loaded:', resources);

            // start game loop
            this.draw(ctx);
        });
    }

    draw(ctx) {
        const now = performance.now();
        const deltaTime = now - this.lastDraw;
        const camera = InputManager.getCamera();
        this.lastDraw = now;

        ctx.clearRect(0, 0, camera.width, camera.height);
        this.game.draw(ctx, deltaTime);

        window.requestAnimationFrame(() => {
            this.draw(ctx);
        })
    }

    onMouseMove = (event) => {
        InputManager.mouseMove(event);
    }

    onMouseDown = (event) => {
        InputManager.mouseDown(event);
    }

    onMouseUp = (event) => {
        InputManager.mouseUp(event);
    }

    render(){
        return (
            <div className='host' style={{ overflow: 'hidden', maxHeight: '100vh', maxWidth: '100vw'}}>
                <canvas 
                    ref="canvas" 
                    width={640} 
                    height={425} 
                    style={{ border: '1px solid black', margin: 'calc((100vh - 427px) / 2) calc((100vw - 642px) / 2)'}}
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                />
            </div>
        )
    }
}

export default Host