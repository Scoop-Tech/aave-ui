export const skipState = (initialValue = false) => {
  let _value = initialValue;
  return {
    set: (value: any) => {
      _value = value;
    },
    get: () => {
      return _value;
    },
  };
};

type SkipType = {
  set: (val: boolean) => void;
  get: () => boolean;
};

export const skipSetup = ({
  skip,
  updateSkipStatus,
}: {
  skip: SkipType;
  updateSkipStatus: boolean;
}) => {
  before(function () {
    if (skip.get()) {
      this.skip();
    }
  });

  afterEach(function onAfterEach() {
    if ((this.currentTest as Mocha.Test).state === 'failed' && updateSkipStatus) {
      skip.set(true);
    }
  });
};
