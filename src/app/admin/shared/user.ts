const PROFILE_NAMESPACE = 'http://myapp.com/profile';
const ROLES_NAMESPACE = 'http://myapp.com/roles';

export class User {
    general: any;
    roles: any;
    user_metadata: any; 

    constructor(profile: any) {
        this.setUserProfile(profile);
    }

    private setUserProfile(profile): void {
        this.user_metadata = profile[PROFILE_NAMESPACE] || {};
        this.roles = profile[ROLES_NAMESPACE] || {};
        this.general = profile || {};
    }

    public checkAdmin() {
        return this.roles.indexOf('admin') > -1;
    }
}