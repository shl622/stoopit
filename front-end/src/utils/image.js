import { Base64 } from 'js-base64'

export function blobToBase64(blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.readAsDataURL(blob)
	})
}

export function urlEncodeBase64(base64Str) {
	return Base64.btoa(base64Str)
}

export function urlDecodeBase64(urlBase64Str) {
	try {
		return Base64.atob(urlBase64Str)
	} catch {
		return urlBase64Str
	}
}
