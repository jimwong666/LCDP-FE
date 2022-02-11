const { __POWERED_BY_QIANKUN__, __INJECTED_PUBLIC_PATH_BY_QIANKUN__, PUBLIC_PATH } = window;

if (__POWERED_BY_QIANKUN__) {
	// eslint-disable-next-line
	__webpack_public_path__ = __INJECTED_PUBLIC_PATH_BY_QIANKUN__ + PUBLIC_PATH;
}
