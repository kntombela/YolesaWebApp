import { AUTH_CONFIG } from "src/app/auth/auth.config";

export class User {
    general: any;
    roles: any;
    user_metadata: any; 

    constructor(profile: any) {
        this.setUserProfile(profile);
    }

    private setUserProfile(profile): void {
        this.user_metadata = profile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
        this.roles = profile[AUTH_CONFIG.ROLE_NAMESPACE] || {};
        this.general = profile || {};
    }

    public checkAdmin() {
        return this.roles.indexOf('admin') > -1;
    }
}