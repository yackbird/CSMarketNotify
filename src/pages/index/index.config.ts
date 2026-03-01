export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: 'CS 价格监控' })
  : { navigationBarTitleText: 'CS 价格监控' }
