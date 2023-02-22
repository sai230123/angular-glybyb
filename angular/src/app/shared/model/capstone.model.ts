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

export interface MovieResponse {
    success: boolean;
    message: string;
    data: Movie[];
}


export interface ReviewResponse {
    success: boolean;
    message: string;
    data: Review[];
}

export interface Actor {
    first_name: string;
    last_name: string;
    dob: string;
    age?: number;
    gender: string;
    id?: number;
}


export interface Review {
    description: string;
    review_date: string;
    rating: string;
    movie: string;
    id?: number;
}

export interface Movie {
    title: string;
    cost: string;
    year: string;
    actor: string;
    fileName?: string;
    photo: any;
    id?: number;
}