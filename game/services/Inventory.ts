
export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    type: 'seed' | 'tool' | 'crop';
}

export class Inventory {
    private items: Map<string, InventoryItem>;
    
    constructor() {
        this.items = new Map();
    }

    addItem(item: InventoryItem): boolean {
        try {
            const existing = this.items.get(item.id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                this.items.set(item.id, {...item});
            }
            return true;
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            return false;
        }
    }

    removeItem(itemId: string, quantity: number = 1): boolean {
        const item = this.items.get(itemId);
        if (item && item.quantity >= quantity) {
            item.quantity -= quantity;
            if (item.quantity === 0) {
                this.items.delete(itemId);
            }
            return true;
        }
        return false;
    }

    getItems(): InventoryItem[] {
        return Array.from(this.items.values());
    }
}
