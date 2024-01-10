const person = {
  name: "yuntaek",
  age: 18,
  job: "engineer",
};

const proxyServer = new Proxy(person, {
  get: (obj, key) => {
    console.log(Reflect.get(obj, key));
    return Reflect.get(obj, key);
  },
  set: (obj, key, value) => {
    console.log("previous", obj[key], "next", value);
    return Reflect.set(obj, key, value);
  },
});

proxyServer.name;
proxyServer.age = 30;
