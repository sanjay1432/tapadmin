export abstract class SessionData {

    public static get AuthToken(): string {
        return localStorage.getItem('token');
    }
    public static set AuthToken(item: string) {
        localStorage.setItem('token', item);
    }

    public static get hasLoggedIn(): boolean {
        if (this.AuthToken) {
            return true;
        }
        else {
            return false;
        }
    }

    public static get userType(): string {
        return localStorage.getItem('userType');
    }
    public static set userType(item: string) {
        localStorage.setItem('userType', item);
    }

    private static _redirectURL: string;
    public static get redirectURL(): string {
        return this._redirectURL;
    }
    public static set redirectURL(item: string) {
        this._redirectURL = item;
    }


    public static clear(): void {
        localStorage.clear();
    }
}