export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '实时汇率' })
  : { navigationBarTitleText: '实时汇率' }
