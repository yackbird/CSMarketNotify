export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '下载源码' })
  : { navigationBarTitleText: '下载源码' }
