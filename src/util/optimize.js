const methods = {
  debounce(idle, action, options) {
    options = Object.assign(
      {
        firstRun: false,
        lastRun: true,
      },
      options
    );
    let isRuned = false;
    let last = Date.now();
    let timeout;
    let newIdle;
    let runedTimeout;
    const resultAction = function () {
      setNewIdle();
      const ctx = this;
      const args = arguments;
      clearTimeout(timeout);
      if (!isRuned && options.firstRun) {
        runAction();
      } else {
        last = Date.now();
        isRuned = true;
        timeout = setTimeout(
          () => {
            runAction();
          },
          options.lastRun ? idle : newIdle
        );
      }
      function runAction() {
        isRuned = true;
        action.apply(ctx, args);
        last = Date.now();
        setRunedTimeout();
      }
    };
    function setRunedTimeout() {
      setNewIdle();
      clearTimeout(runedTimeout);
      runedTimeout = setTimeout(() => {
        isRuned = false;
      }, newIdle);
    }
    function setNewIdle() {
      newIdle = idle;
      const now = Date.now();
      if (now - last < idle) {
        newIdle = idle - (now - last);
      } else {
        newIdle = 0;
      }
    }
    resultAction.optimized = true;
    return resultAction;
  },
  dtrDebounce(idle = 10, action, options = {}) {
    return (target, key, descriptor) => {
      const method = descriptor.value;
      descriptor.value = methods.debounce(
        idle,
        function () {
          const ret = method.apply(this, arguments);
          return ret;
        },
        options
      );
      return descriptor;
    };
  },
  throttle(delay, action) {
    let last = 0;
    const resultAction = function () {
      const curr = new Date();

      if (curr - last > delay) {
        action.apply(this, arguments);
        last = curr;
      }
    };
    resultAction.optimized = true;
    return resultAction;
  },
  dtrThrottle(idle = 10, action, options = {}) {
    return (target, key, descriptor) => {
      const method = descriptor.value;
      descriptor.value = methods.throttle(
        idle,
        function () {
          const ret = method.apply(this, arguments);
          return ret;
        },
        options
      );
      return descriptor;
    };
  },
};

module.exports = methods;
