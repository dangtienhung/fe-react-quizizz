export interface IRegister {
	name: string;
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	role: 'STUDENT' | 'TEACHER';
	status: 'ACTIVE' | 'INACTIVE';
	quizizz: any[];
	quizzExam: any[];
	isDeleted: boolean;
	avatar: string;
	createdAt: string;
	updatedAt: string;
}
