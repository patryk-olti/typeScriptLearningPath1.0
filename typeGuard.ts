type User = {
    name: string;
};

type Admin = {
    name: string;
    permissions: string[];
};

type Person = User | Admin;

function isAdmin(person: Person): person is Admin{

    if("permissions" in person){
        return true;
    }

    return false;
}