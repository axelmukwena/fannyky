import Cookies from "js-cookie";

function setUserCookie(name, data, exp) {
	Cookies.remove(name);
	Cookies.set(name, data, { expires: exp });
}

function getUserCookie(name) {
    return Cookies.get(name)
}

export { setUserCookie, getUserCookie };
