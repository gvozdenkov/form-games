export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'custom-property-pattern': '_?.+',
    'selector-class-pattern': '^([a-z][a-z0-9]*)((__|_|-|--)[a-z0-9]+)*$',
  },
};
