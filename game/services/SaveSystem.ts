
export class SaveSystem {
    private static readonly SAVE_KEY = 'farm_game_save';

    static save(data: any): void {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    }

    static load(): any {
        try {
            const data = localStorage.getItem(this.SAVE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao carregar save:', error);
            return null;
        }
    }
}
