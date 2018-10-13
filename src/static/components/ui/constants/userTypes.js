const UserTypes = {
    CLIENT: "Client",
    VOLUNTEER: "Volunteer"
};

Object.defineProperty(UserTypes, "values", {
    get: () => Object.values(UserTypes)
});

Object.freeze(UserTypes);

export default UserTypes;