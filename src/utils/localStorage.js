function setStorage(name, object) {
  try {
    localStorage.setItem(name, JSON.stringify(object));
  } catch (e) {
    console.log(e);
  }
}

export default setStorage;
