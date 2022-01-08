let a: number;
let b: boolean;
let c: string;

let d: string[];

type Permission = 'admin' | 'user' | 'manager';

type PermissionWithoutAdmin = Exclude<Permission, 'admin'>;

interface DepartmentsForPermission {
  depName: string;
  lvl: number;
}

const DepsForPerms: Record<Permission, DepartmentsForPermission> = {
  admin: {
    depName: 'security',
    lvl: 10,
  },
  user: {
    depName: 'sales',
    lvl: 5,
  },
  manager: {
    depName: 'sales',
    lvl: 10,
  },
};

type TuplePermissions = [Permission, Permission];

type BasicUser<A = boolean, P = TuplePermissions> = {
  readonly name: string;
  surname: string;
  age: number;
  isAdmiin: A;
  permissions?: P;
};

type BasicUserWithoutPermissions = Omit<BasicUser, 'permissions'>;

type AdvancedUser = {
  account: number;
};

type FullUser<A = boolean, P = TuplePermissions> = BasicUser<A, P> &
  AdvancedUser;

type BasicUserReadonly = Readonly<BasicUser>;
type BasicUserRequired = Required<BasicUser>;
type BasicUserPartial = Partial<BasicUser>;

type BasicUserReadonlyRequired = Readonly<Required<BasicUser>>;

const user: FullUser = {
  name: 'Huy',
  surname: 'hsu',
  age: 20,
  isAdmiin: true,
  account: 100,
  permissions: ['admin', 'user'],
};

const usersArray: FullUser[] = [user, user, user];

function getFirst<T>(arr: T[]): T {
  return arr[0];
}

type BasicFunction = () => FullUser[];

type getFirstReturnType = ReturnType<BasicFunction>;

function firstUser(usersArray: BasicUser[]): BasicUser {
  return usersArray[0];
}

getFirst<FullUser>(usersArray);

type MathFunc = (a: number, b: number) => number;

const mul: MathFunc = (a, b): number => a * b;

const add = (a: number, b: number): number => a + b;
