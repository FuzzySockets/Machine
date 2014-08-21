(function (global) {

  var machine = {},
      modules = {};

  var Module = function (name, dependencies) {
    this.name = name;
    this.dependencies = dependencies;
    this.controllers = {};
    return this;
  };

  Module.prototype.controller = function (name, fn) {
    if (this.controllers[name]) {
      throw Error('You may not define the same controller twice');
    }
    this.controllers[name] = fn;
    return this;
  };

  Module.prototype.add = function () {
    modules[this.name] = this;
    return this;
  };

  machine.module = function (name, dependencies) {

    var existingModule = modules[name];

    if (existingModule && dependencies) {
      throw Error('You may not redefine a module');
    } else if (existingModule) {
      return existingModule;
    }

    var module = new Module(name, dependencies).add();
    return module;
  };

  global.machine = machine;

}(window || {}));