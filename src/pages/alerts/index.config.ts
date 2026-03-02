export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '价格预警' })
  : { navigationBarTitleText: '价格预警' }
