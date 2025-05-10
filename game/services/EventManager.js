
export class EventManager {
    constructor() {
        this.events = new Map();
    }

    on(eventName, callback) {
        try {
            if (!this.events.has(eventName)) {
                this.events.set(eventName, new Set());
            }
            this.events.get(eventName).add(callback);
            return () => this.off(eventName, callback);
        } catch (error) {
            console.error(`Erro ao registrar evento ${eventName}:`, error);
        }
    }

    emit(eventName, data) {
        try {
            const callbacks = this.events.get(eventName);
            if (callbacks) {
                callbacks.forEach(callback => callback(data));
            }
        } catch (error) {
            console.error(`Erro ao emitir evento ${eventName}:`, error);
        }
    }

    off(eventName, callback) {
        try {
            const callbacks = this.events.get(eventName);
            if (callbacks) {
                callbacks.delete(callback);
            }
        } catch (error) {
            console.error(`Erro ao remover evento ${eventName}:`, error);
        }
    }
}

export const eventManager = new EventManager();
