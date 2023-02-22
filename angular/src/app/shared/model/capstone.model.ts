export interface LoginRequest {
    loginId: string;
    pwd: string;
}

export interface CapstoneResponse {
    success: boolean;
    message: string;
    data: any;
}

export interface ActorResponse {
    success: boolean;
    message: string;
    data: Actor[];
}
export interface Actor {
    first_name: string;
    last_name: string;
    dob: string;
    age?: number;
    gender: string;
    id?: number;
}