
export class GameState {
    constructor() {
        this._state = {
            money: 100,
            plantedCrops: 0,
            gameTime: 0
        };
        this._listeners = new Set();
    }

    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    update(changes) {
        try {
            this._state = { ...this._state, ...changes };
            this._listeners.forEach(listener => listener(this._state));
        } catch (error) {
            console.error('Erro ao atualizar estado:', error);
        }
    }

    getState() {
        return { ...this._state };
    }
}

export const gameState = new GameState();
